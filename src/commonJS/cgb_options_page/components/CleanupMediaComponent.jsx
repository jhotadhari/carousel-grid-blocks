/**
 * External dependencies
 */
import classnames 		from 'classnames';
import {
	findIndex,
	isEqual,
} from 'lodash';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
    Button,
} = wp.components;

/**
 * Internal dependencies
 */
import CleanupMediaPostComponent	from './CleanupMediaPostComponent.jsx'
import withCleanup	from '../withCleanup'

class CleanupMediaComponent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			started: false,
			postTypes: [],
			resolvers: [],
		};

		this.startCleanup = this.startCleanup.bind( this );
	}

	componentDidMount() {
		this.update();
	}

	componentDidUpdate( prevProps, prevState, snapshot ) {
		this.update();
	}

	_isResovling( REDUCER_KEY, selectorName, args ) {
		const { isResolving } = this.props;
		const { resolvers } = this.state;

		args = args ? args : [];

		const _isResolving = isResolving( REDUCER_KEY, selectorName, args );

		const newResolver = {
			REDUCER_KEY: REDUCER_KEY,
			selectorName: selectorName,
			args: args,
			isResolving: _isResolving,
		};

		const resolverIndex = findIndex( resolvers, resolver => isEqual( {
			REDUCER_KEY: resolver.REDUCER_KEY,
			selectorName: resolver.selectorName,
			args: resolver.args,
		}, {
			REDUCER_KEY: newResolver.REDUCER_KEY,
			selectorName: newResolver.selectorName,
			args: newResolver.args,
		} ) );

		let newResolvers = [...resolvers];
		if ( resolverIndex === -1 ) {
			newResolvers = [...newResolvers, newResolver];
		} else {
			newResolvers[resolverIndex] = newResolver;
		}

		if ( ! isEqual( resolvers, newResolvers ) )
			this.setState( { resolvers: newResolvers } );

		return _isResolving;
	}

	update() {
		const {
			getPostTypes,
			getEntityRecords,
		} = this.props;

		const {
			started,
			postTypes,
			resolvers,
		} = this.state;

		if ( ! started ) return;

		let newPostTypes;

		// fetch postTypes
		if ( postTypes.length === 0 ) {
			if ( this._isResovling( 'core', 'getPostTypes' ) ) {
				setTimeout( () => this.update(), 750 );
			} else {
				newPostTypes = getPostTypes();
				newPostTypes = newPostTypes === null ? [] : [...newPostTypes].map( postType => postType.supports.editor && postType.slug !== 'wp_block' ? {
					...postType,
					posts: [],
					lastFetchedPage: 0,
				} : null ).filter( n => n !== null );
				return this.setState( { postTypes: newPostTypes } );
			}
		}

		// loop postTypes
		[...postTypes].map( postType => {

			// fetch posts
			if ( postType.lastFetchedPage === 0 ) {

				const query = {
					page: postType.lastFetchedPage + 1,
					per_page:  100,
					context:  'edit',
				};

				if ( this._isResovling( 'core', 'getEntityRecords', [ 'postType', postType.slug, query ] ) ) {
					setTimeout( () => this.update(), 750 );
				} else {
					let newPosts = getEntityRecords( 'postType', postType.slug, query );
					newPosts = newPosts === null ? [] : [
						...postType.posts,
						...newPosts,
					];

					newPostTypes = [...postTypes];
					const postTypeIndex = findIndex( postTypes, pt => pt.slug === postType.slug );
				    newPostTypes[postTypeIndex] = {
				    	...newPostTypes[postTypeIndex],
				    	lastFetchedPage: postType.lastFetchedPage + 1,
				    	posts: newPosts,
				    }
					return this.setState( { postTypes: newPostTypes } );
				}
			}

		} );

	}

	startCleanup() {
		this.setState( {
			started: false,
			postTypes: [],
			resolvers: [],
		} );

		setTimeout( () => this.setState( {
			started: true,
		} ), 100 );
	}

	render() {
		const {
			getEntityRecord,
			getEntityRecords,
			getEntity,
			saveEntityRecord,
		} = this.props;

		const {
			started,
			postTypes,
			resolvers,
		} = this.state;

		const title = __( 'Media clean up', 'cgb' )

		return <>
			<div className={ 'cgb-cleanup-media' }>

				<div>
					<Button
						onClick={ () => this.startCleanup() }
						title={ title }
						alt={ title }
					>
						{ title }
					</Button>


					{ -1 !== [...resolvers].findIndex( resolver => resolver.isResolving ) && <>
						<span style={ { marginLeft: '5px'} } className="cgb-spinner"></span>
						<span style={ { marginLeft: '5px'} }>{ __( 'Fetching Posttypes and Posts', 'cgb' ) }</span>
					</> }

					<div className={ 'help' }>{ __( 'Remove missing image ids from all cgb blocks.', 'cgb' ) }</div>
				</div>

				{ started && <pre className={ 'log' }>

					{ postTypes.length > 0 && <ul className={ 'posttype-list' } >

						{ [...postTypes].map( ( postType, postTypeIndex ) => <li key={ postTypeIndex } className={ 'posttype-list-item' } >

							<span>{ postType.labels.name }</span>

							<ul className={ classnames( [ 'post-list', postType.slug ] ) } >

								{ [...postType.posts].map( ( post, index ) => <li key={ index } >

									<CleanupMediaPostComponent
										post={ post }
										postType={ postType.slug }
										className={ 'post-list-item' }
										getEntityRecord={ getEntityRecord }
										getEntityRecords={ getEntityRecords }
										getEntity={ getEntity }
										saveEntityRecord={ saveEntityRecord }
									/>

								</li> ) }

							</ul>

						</li> ) }

					</ul> }

				</pre> }

			</div>
		</>;

	}
}

export default withCleanup( CleanupMediaComponent );
