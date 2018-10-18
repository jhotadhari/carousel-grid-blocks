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
		case 'imageCaptionShow':
			options = [
				{ label: __( 'Show', 'cgb' ), value: 'show' },
				{ label: __( 'Hide', 'cgb' ), value: 'hide' },
				{ label: __( 'Show on hover', 'cgb' ), value: 'showOnhover' },
				{ label: __( 'Show if selected', 'cgb' ), value: 'showIfSelected' },
			];
			break;
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
				{ label: __( 'Title', 'cgb' ), value: 'title' },
				{ label: __( 'Caption', 'cgb' ), value: 'caption' },	// ??? translate de Beschriftung
			];
			break;


	}
	return applyFilters( 'cgb/GridInspector/options/' + key, options );
}

export default getInspectorOptions;