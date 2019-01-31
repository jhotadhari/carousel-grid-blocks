/**
 * External dependencies
 */
import classnames 		from 'classnames';
import {
	get,
	isArray,
	isEqual,
	union,
} from 'lodash';

/**
 * WordPress dependencies
 */
const { apiFetch } = wp;
const { __ } = wp.i18n;
const { Button } = wp.components;

// regEx pattern
const patts = {
	cgbBlockStrs: /(<!-- wp:cgb\/).*(} \/-->)/g,
	imageStrs: /("imageIds":\[)[\d,]*/g,
	imageIds: /[\d]*/g,
};

class CleanupMediaPostComponent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			cleanupDone: null,
			cgbBlockStrs: null,
			allImageIds: null,
			existingImageIds: null,
			newContent: null,
			postIsUpdating: null,
			updateResponseOk: null,
		};
	}

	componentDidMount() {
		return this.state.cleanupDone ? null : this.runProcessQueue();
	}

	componentDidUpdate( prevProps, prevState, snapshot ) {
		return this.state.cleanupDone ? null : this.runProcessQueue();
	}

	runProcessQueue() {
		const { post } = this.props;

		const {
			cleanupDone,
			cgbBlockStrs,
			allImageIds,
			existingImageIds,
			newContent,
			postIsUpdating,
		} = this.state;

		if ( cleanupDone )
			return;

		if ( cgbBlockStrs === null )
			return this.findCgbBlockStrs();

		if ( allImageIds === null )
			return this.findAllImageIds();

		if ( existingImageIds === null )
			return this.findExistingImageIds();

		if ( newContent === null )
			return this.getNewContent();

		if ( postIsUpdating === null )
			return this.updatePost();
	}

	findCgbBlockStrs() {
		const cgbBlockStrs = this.props.post.content.raw.match( patts.cgbBlockStrs );
		this.setState( {
			cgbBlockStrs: isArray( cgbBlockStrs ) ? cgbBlockStrs : false,
		} );
	}

	findAllImageIds() {
		const {
			cgbBlockStrs,
		} = this.state;

		let allImageIds = [];
		if ( isArray( cgbBlockStrs ) ) {
			[...cgbBlockStrs].map( cgbBlockStr => {
				const imageStrs = cgbBlockStr.match( patts.imageStrs );
				if ( isArray( imageStrs ) ) {
					[...imageStrs].map( imageStr => {
						allImageIds = union(
							allImageIds,
							imageStr.match( patts.imageIds ).filter( id => id > 0 ).map( id => parseInt( id ) )
						);
					} );
				}
			} );
		}

		this.setState( {
			allImageIds: allImageIds,
			...( allImageIds.length === 0 && { cleanupDone: true } ),
		} );
	}

	findExistingImageIds() {

		const {
			getEntityRecords,
		} = this.props;

		const {
			allImageIds,
		} = this.state;

		if ( allImageIds.length === 0 ) {
			this.setState( { existingImageIds: [] } );
		}

		const images = getEntityRecords( 'postType', 'attachment', {
			include: allImageIds,
			per_page:  100,
		} );

		if ( null === images )
			return setTimeout( () => this.findExistingImageIds(), 750 );

		const existingImageIds = [... images].map( image => image.id );

		if ( ! isEqual( existingImageIds, this.state.existingImageIds ) )
			this.setState( {
				existingImageIds: existingImageIds,
				...( allImageIds.length === existingImageIds.length && { cleanupDone: true } ),
			} );
	}

	getNewContent() {
		const {
			cgbBlockStrs,
			existingImageIds,
		} = this.state;

		if ( ! isArray( cgbBlockStrs ) )
			this.setState( { cleanupDone: true } );

		let newContent =  ( ' ' + this.props.post.content.raw ).slice( 1 );	// clone, no reference
		[...cgbBlockStrs].map( cgbBlockStr => {

			const imageStrs = cgbBlockStr.match( patts.imageStrs );
			if ( isArray( imageStrs ) ) {

				let newCgbBlockStr = ( ' ' + cgbBlockStr ).slice( 1 );			// clone, no reference
				[...imageStrs].map( imageStr => {
					const imageIds = imageStr.match( patts.imageIds );
					newCgbBlockStr = isArray( imageIds ) ? newCgbBlockStr.replace(
						imageStr,
						'"imageIds":[' + imageIds
							.filter( id => id.length > 0 )
							.map( id => parseInt( id ) )
							.filter( imageId => existingImageIds.includes( imageId ) )
							.join(',')
					) : newCgbBlockStr;
				} );
				newContent = newContent.replace( cgbBlockStr, newCgbBlockStr );
			}

		} );

		const isEqualContents = isEqual( this.props.post.content.raw, newContent );

		this.setState( {
			...( isEqualContents ? { cleanupDone: true } : { newContent: newContent } ),
		} );
	}

	updatePost() {

		const {
			post,
			postType,
		} = this.props;

		const {
			newContent,
		} = this.state;

		this.savePost( {
			id: post.id,
			content: newContent,
		} );

		this.setState( {
			postIsUpdating: true,
		} );
	}

	savePost( post ) {
		const {
			getEntity,
			postType,
			saveEntityRecord,
		} = this.props;

		const kind = 'postType';

		const entity = getEntity( kind, postType )
		if ( ! entity )
			return setTimeout( () => this.savePost( post ), 750 );

		// this will save the post, and redux will know it, but we don't get a response
		saveEntityRecord( kind, postType, post );
		// this will save the post again, we don't need it two times actually, but follwing will give a response
		const updatedRecord = apiFetch( {
			path: entity.baseURL + '/' + post.id,
			method: 'PUT',
			data: post,
		} ).then( responsePost => this.isUpdateResponseOk( responsePost ) ).catch( err => {
			console.log( err );
			this.setState( {
				cleanupDone: true,
				updateResponseOk: false,
			} );
		});
	}

	isUpdateResponseOk( responsePost ) {
		const {
			existingImageIds,
		} = this.state;

		// find all image ids in updatedPost
		const cgbBlockStrs = responsePost.content.raw.match( patts.cgbBlockStrs );
		let allImageIds = [];
		if ( isArray( cgbBlockStrs ) ) {
			[...cgbBlockStrs].map( cgbBlockStr => {
				const imageStrs = cgbBlockStr.match( patts.imageStrs );
				if ( isArray( imageStrs ) ) {
					[...imageStrs].map( imageStr => {
						allImageIds = union(
							allImageIds,
							imageStr.match( patts.imageIds ).filter( id => id > 0 ).map( id => parseInt( id ) )
						);
					} );
				}
			} );
		}

		const updateResponseOk = isEqual(
			allImageIds,
			allImageIds.filter( imageId => existingImageIds.includes( imageId ) )
		);

		this.setState( {
			cleanupDone: true,
			updateResponseOk: updateResponseOk,
		} );
	}

	render() {
		const {
			post,
			className,
		} = this.props;

		const {
			cleanupDone,
			cgbBlockStrs,
			allImageIds,
			existingImageIds,
			postIsUpdating,
			updateResponseOk,
		} = this.state;

		const classNames = classnames( [
			...( ! isArray( cgbBlockStrs ) || cgbBlockStrs.length === 0 ? ['no-cgb'] : [] ),
			...( cleanupDone ? ['done'] : postIsUpdating === true ? ['updating'] : [] ),
			...( updateResponseOk === true ? ['updated'] : [] ),
			...( updateResponseOk === false ? ['notice'] : [] ),
			className,
		] );

		return <>

			<div className={ classnames( [
				...( ! isArray( cgbBlockStrs ) || cgbBlockStrs.length === 0 ? ['no-cgb'] : [] ),
				...( cleanupDone ? ['done'] : postIsUpdating === true ? ['updating'] : [] ),
				...( updateResponseOk === true ? ['updated'] : [] ),
				...( updateResponseOk === false ? ['notice'] : [] ),
				className,
			] ) }>

				<span className={ className + '-state' }>
					{ ! cleanupDone && <span className="cgb-spinner"></span> }
				</span>

				<span className={ classnames( [className + '-detail', 'post-id'] ) }>
					<span className={ 'label' }>{ __( 'Post Id', 'cgb' ) }:</span>
					<span className={ 'value' }>{ post.id }</span>
				</span>

				{ isArray( cgbBlockStrs ) && cgbBlockStrs.length > 0 && <>
					<span className={ classnames( [className + '-detail', 'cgb-block-length'] ) }>
						<span className={ 'label' }>{ __( 'CGB Blocks', 'cgb') }:</span>
						<span className={ 'value' }>{ cgbBlockStrs.length }</span>
					</span>

					{ isArray( allImageIds ) &&
						<span className={ classnames( [className + '-detail', 'image-ids'] ) }>

							<span className={ 'label' } >{ __( 'All Image Ids:', 'cgb' ) }</span>

							<span className={ 'value' }>
								{ allImageIds.length > 0 && [...allImageIds].map( imageId =>
									<span key={ imageId } className={ classnames( [
										...( isArray( existingImageIds ) ? existingImageIds.includes( imageId ) ? ['existing'] : ['non-existing'] : [] ),
										...( updateResponseOk ? ['removed'] : [''] ),
									] ) }>{ imageId + ' ' }</span>
								) }

								{ allImageIds.length === 0 &&
									<span className={ 'no-images' }>{ __( 'No Images Found', 'cgb' ) }</span>
								}

								{ updateResponseOk === true &&
									<span>{ __( 'Missing Images removed from block attributes', 'cgb' ) }</span>
								}

							</span>
						</span>
					}

				</> }

			</div>

		</>;
	}
}

export default CleanupMediaPostComponent;
