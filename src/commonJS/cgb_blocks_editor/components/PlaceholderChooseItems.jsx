/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	get,
	keys,
} from 'lodash';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
    Placeholder,
	Button,
	FormFileUpload,
	DropZone,
} = wp.components;
const {
	MediaUpload,
	mediaUpload,
} = wp.editor;

/**
 * Internal dependencies
 */
import PlaceholderSpinner 	from '../../cgb_blocks/components/PlaceholderSpinner.jsx';

const ALLOWED_MEDIA_TYPES = ['image'];

class PlaceholderChooseItems extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isUploading: false,
		};

		this.onUpload = this.onUpload.bind( this );
		this.onFilesUpload = this.onFilesUpload.bind( this );
	}

	onUpload( event ) {
		this.onFilesUpload( event.target.files );
	}

	onFilesUpload( files ) {
		const {
			addItems,
		} = this.props;
		mediaUpload( {
			allowedTypes: ALLOWED_MEDIA_TYPES,
			filesList: files,
			onFileChange: addItems,
		} );
		this.setState( { isUploading: true } );
	}

	render() {

		const {
			itemsSource,
			blockGroupId,
			addItems,
		} = this.props;

		const {
			isUploading,
		} = this.state;

		if ( isUploading ){
			return <PlaceholderSpinner/>;

		} else {
			const ChooseSource = get( cgbBlocks, ['components',blockGroupId,'ChooseSource'] );

				return <>

					<Placeholder
						label={  __( 'Choose Items', 'cgb' ) }
						instructions={ __( 'Drag images, upload new ones, select images from your library or adjust the the \'Items Source\'.' ) }
						className={ classnames( 'editor-media-placeholder', 'cgb-choose-items','cgb-placeholder' ) }
					>

						{ 'custom' === itemsSource.key && <>

							<DropZone
								onFilesDrop={ this.onFilesUpload }
							/>

							<div style={ { display: 'flex', justifyContent: 'center', flexWrap: 'wrap'  } }>

								<FormFileUpload
									isLarge
									className="editor-media-placeholder__button"
									onChange={ this.onUpload }
									accept={ 'image/*' }
									multiple={ true }
								>
									{ __( 'Upload' ) }
								</FormFileUpload>


								<MediaUpload
									multiple={ true }
									onSelect={ addItems }
									allowedTypes={ ALLOWED_MEDIA_TYPES }
									render={ ( { open } ) => (
										<Button
											isLarge
											className="editor-media-placeholder__button"
											onClick={ open }
										>
											{ __( 'Media Library' ) }
										</Button>
									) }
								/>

							</div>

						</> }

						<ChooseSource/>

						{ 'archivePostType' === itemsSource.key &&
							<div style={ { marginTop: '1em'  } }>
								{ __( 'No items were found. Try to adjust the query parameter or change \'Items Source\' to \'Custom\'', 'cgb' ) }
							</div>
						}

					</Placeholder>

				</>;

			}
		}


}

export default PlaceholderChooseItems;
