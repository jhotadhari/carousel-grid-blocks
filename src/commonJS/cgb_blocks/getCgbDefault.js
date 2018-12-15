/**
 * WordPress dependencies
 */
const { applyFilters } = wp.hooks;

const getCgbDefault = ( key, args ) => {

	switch( key ){

		case 'gridSettings':
			return applyFilters( 'cgb.default.gridSettings', {
				columns: 'auto',
				margin: '5',
				itemSizes: 'maintainRatios',
			}, args );

		case 'carouselSettings':
			let carouselSettings = {

				// dimensions
				imageFit: 'contain',				// 'cover' | 'contain'
				// 'cover' === imageFit
					width: {
						value: 100,
						unit: 'percent',			// px || percent
					},
					height: {
						value: 80,
						unit: 'percent',			// px || percent
					},
				// 'contain' === imageFit
					maxWidth: {
						value: 100,
						unit: 'percent',			// px || percent
					},
					maxHeight: {
						setMaxHeight: false,
						value: 400,
						unit: 'px',					// px
					},
					resizeToScreenHeight: {
						resize: true,
						value: 10,
						unit: 'percent',			// px || percent
					},

				// react-responsive-carousel options
				showArrows: true,
				showStatus: true,
				showIndicators: true,
				infiniteLoop: true,
				autoPlay: false,
				interval: 5000,
				stopOnHover: true,
				useKeyboardArrows: false,

				// more options
				arrowsPosition: 'insideImage',
				indicatorsPosition: 'bottom',
				animation: 'slide',

			};
			switch( args.blockName ) {
				case 'cgb/fullscreen':
					carouselSettings = {
						...carouselSettings,
						useKeyboardArrows: true,
					};
			}
			return applyFilters( 'cgb.default.carouselSettings', carouselSettings, args );
		case 'imageHoverEffect':
			return applyFilters( 'cgb.default.imageHoverEffect', 'none', args );

		case 'imageHoverEffectSettings':
			return applyFilters( 'cgb.default.imageHighlightEffectSettings', {}, args );

		case 'imageHighlightEffect':
			return applyFilters( 'cgb.default.imageHighlightEffect', 'boxShadow', args );

		case 'imageHighlightEffectSettings':
			return applyFilters( 'cgb.default.imageHighlightEffectSettings', {
				boxShadowColor: {
					r: '150',
					g: '150',
					b: '150',
					a: '0.8',
				},
				boxShadowWidth: '5',
			}, args );

		case 'imageCaptionSettings':
			let imageCaptionSettings = {
				show: 'show',			// hide showOnhover showIfSelected
				position: 'bottom',
				margin: '10%',
				padding: '0.5em',
				cutomBackgroundColor: true,
				backgroundColor: {
					r: '220',
					g: '220',
					b: '220',
					a: '0.8',
				},
				customColor: true,
				color: '#111',
				parts: [
					'title',
					'caption',
				],
			};
			switch( args.blockName ) {
				case 'cgb/grid':
					imageCaptionSettings = {
						...imageCaptionSettings,
						show: 'hide',
					};
			}
			return applyFilters( 'cgb.default.imageCaptionSettings', imageCaptionSettings, args );

		case 'imageControlsSettings':
			let imageControlsSettings = {
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
					// 'link',
					'fullscreen',
				],
				linkControlSettings: {
					newTab: false,
					linkTo: 'post',	// 'attachment'
				}
			};
			switch( args.blockName ) {
				case 'cgb/grid':
				case 'cgb/fullscreen':
					imageControlsSettings = {
						...imageControlsSettings,
						show: 'hide',
					};
			}
			return applyFilters( 'cgb.default.imageControlsSettings', imageControlsSettings, args );
	}
};

export default getCgbDefault;
