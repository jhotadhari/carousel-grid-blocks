/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { applyFilters } = wp.hooks;

const getInspectorOptions = key => {
	let options = [];
	switch( key ) {
		case 'imageHoverEffect':
			options = [
				{ label: __( 'None', 'cgb' ), value: 'none' },
				{ label: __( 'Scale', 'cgb' ), value: 'scale' },
			];
			break;
		case 'imageHighlightEffect':
			options = [
				{ label: __( 'None', 'cgb' ), value: 'none' },
				{ label: __( 'Box Shadow', 'cgb' ), value: 'boxShadow' },
			];
			break;
		case 'imageControlsShow':
		case 'imageCaptionShow':
			options = [
				{ label: __( 'Show', 'cgb' ), value: 'show' },
				{ label: __( 'Hide', 'cgb' ), value: 'hide' },
				{ label: __( 'Show on hover', 'cgb' ), value: 'showOnhover' },
				{ label: __( 'Show if selected', 'cgb' ), value: 'showIfSelected' },
			];
			break;
		case 'imageControlsPosition':
		case 'imageCaptionPosition':
			options = [
				{ label: __( 'Bottom', 'cgb' ), value: 'bottom' },
				{ label: __( 'Top', 'cgb' ), value: 'top' },
				{ label: __( 'Center', 'cgb' ), value: 'center' },
				{ label: __( 'Full', 'cgb' ), value: 'full' },
			];
			break;
		case 'imageCaptionParts':
			options = [
				{ label: __( 'Image Title', 'cgb' ), value: 'title' },
				{ label: __( 'Image Caption', 'cgb' ), value: 'caption' },	// ??? translate de Beschriftung
				{ label: __( 'Post Title', 'cgb' ), value: 'postTitle' },
				{ label: __( 'Post Excerpt', 'cgb' ), value: 'postExcerpt' },
			];
			break;
		case 'imageControls':
			options = [
				{ label: __( 'Fullscreen', 'cgb' ), value: 'fullscreen' },
				{ label: __( 'Link', 'cgb' ), value: 'link' },
			];
			break;
		case 'imageControlsLinkLinkTo':
			options = [
				{ label: __( 'Post (if source is archive)', 'cgb' ), value: 'post' },
				{ label: __( 'Attachment', 'cgb' ), value: 'attachment' },
			];
			break;
	}
	return applyFilters( 'cgb/GridInspector/options/' + key, options );
}

export default getInspectorOptions;