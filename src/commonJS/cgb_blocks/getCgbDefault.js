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
				itemSizes: 'maintainRatios',
			} );

		case 'carouselSettings':
			return applyFilters( 'cgb.default.carouselSettings', {
				// dimensions
				maxWidth: {
					value: 100,
					unit: 'percent',			// px || percent
				},
				resizeToContainerWidth: true,
				maxHeight: {
					setMaxHeight: false,
					value: 400,
					unit: 'px',			// px
				},
				resizeToScreenHeight: {
					resize: true,
					value: 10,
					unit: 'percent',	// px || percent
				},
				// react-responsive-carousel options
				showArrows: true,
				showStatus: true,
				showIndicators: true,
				infiniteLoop: true,
				autoPlay: false,
				interval: 5000,
				stopOnHover: true,
			} );

		case 'imageHoverEffect':
			return applyFilters( 'cgb.default.imageHoverEffect', 'scale' );

		case 'imageHoverEffectSettings':
			return applyFilters( 'cgb.default.imageHighlightEffectSettings', {} );

		case 'imageHighlightEffect':
			return applyFilters( 'cgb.default.imageHighlightEffect', 'boxShadow' );

		case 'imageHighlightEffectSettings':
			return applyFilters( 'cgb.default.imageHighlightEffectSettings', {
				boxShadowColor: {
					r: '150',
					g: '150',
					b: '150',
					a: '0.8',
				},
				boxShadowWidth: '5',
			} );

		case 'imageCaptionSettings':
			return applyFilters( 'cgb.default.imageCaptionSettings', {
				show: 'show',			// hide showOnhover showIfSelected
				position: 'bottom',
				margin: '10%',
				padding: '0.5em',
				backgroundColor: {
					r: '220',
					g: '220',
					b: '220',
					a: '0.8',
				},
				color: '#111',
				parts: [
					'title',
					'caption',
				],
			} );

		case 'imageControlsSettings':
			return applyFilters( 'cgb.default.imageControlsSettings', {
				show: 'showOnhover',			// hide showOnhover showIfSelected
				position: 'center',
				margin: '10%',
				padding: '0.5em',
				backgroundColor: {
					r: '220',
					g: '220',
					b: '220',
					a: '0.8',
				},
				controls: [
					'link',
					'fullscreen',
				],
				linkControlSettings: {
					newTab: false,
					linkTo: 'post',	// 'attachment'
				}
			} );
	}
};

export default getCgbDefault;
