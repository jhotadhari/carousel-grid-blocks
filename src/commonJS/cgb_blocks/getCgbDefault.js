/**
 * WordPress dependencies
 */
const { applyFilters } = wp.hooks;

const getCgbDefault = key => {
	switch( key ){
		case 'gridSettings':
			return applyFilters( 'cgb.default.gridSettings', {
				columns: 'auto',
				margin: '5',
			} );
		case 'imageHoverEffect':
			return applyFilters( 'cgb.default.imageHighlightEffect', 'scale' );
		case 'imageHoverEffectSettings':
			return applyFilters( 'cgb.default.imageHighlightEffectSettings', {} );
		case 'imageHighlightEffect':
			return applyFilters( 'cgb.default.imageHighlightEffect', 'boxShadow' );
		case 'imageHighlightEffectSettings':
			return applyFilters( 'cgb.default.imageHighlightEffectSettings', {
				boxShadowColor: '#999',
				boxShadowWidth: '5',
			} );
	}
};

export default getCgbDefault;
