/**
 * External dependencies
 */
import loadJS from 'load-js';
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * WordPress dependencies
 */
const { setLocaleData } = wp.i18n;

/**
 * Internal dependencies
 */
import getCgbDefault 		from './cgb_blocks/getCgbDefault';
import parseSerialized 		from './cgb_blocks/utils/parseSerialized';
import Placeholder 			from './cgb_blocks/components/Placeholder.jsx';

setLocaleData( cgbBlocks.locale, 'cgb' );

document.addEventListener('DOMContentLoaded', () => {
	wp.api.loadPromise.done( () => {

		const blockWrappers = document.getElementsByClassName( 'cgb-block-wrapper' );
		if ( blockWrappers.length === 0 ) return;

		// display placeholder element
		[...blockWrappers].map( ( blockWrapper ) => {
			[... blockWrapper.getElementsByTagName( 'div' )].map( ( block ) => {
				ReactDOM.render( <Placeholder/>, block );
			});
		});

		// load app and start
		loadJS( [cgbBlocks.pluginDirUrl + '/js/cgb_blocks_frontend.min.js'] ).then( () => {

			const {
				Grid,
				Carousel,
			} = cgbBlocks.components;

			[...blockWrappers].map( ( blockWrapper ) => {

				const data = parseSerialized( blockWrapper.getAttribute('data-cgb') );
				const gridSettings = data.gridSettings || getCgbDefault( 'gridSettings' );
				const imageHoverEffect = data.imageHoverEffect || getCgbDefault( 'imageHoverEffect' );
				const imageHoverEffectSettings = data.imageHoverEffectSettings || getCgbDefault( 'imageHoverEffectSettings' );
				const imageHighlightEffect = data.imageHighlightEffect ||getCgbDefault( 'imageHighlightEffect' );
				const imageHighlightEffectSettings = data.imageHighlightEffectSettings || getCgbDefault( 'imageHighlightEffectSettings' );
				const imageControlsSettings = data.imageControlsSettings || getCgbDefault( 'imageControlsSettings' );
				const imageCaptionSettings = data.imageCaptionSettings || getCgbDefault( 'imageCaptionSettings' );

				[... blockWrapper.getElementsByClassName( 'cgb-grid' )].map( ( grid ) => {
					ReactDOM.render( <Grid
						gridSettings={ gridSettings }
						imageHoverEffect={ imageHoverEffect }
						imageHoverEffectSettings={ imageHoverEffectSettings }
						imageHighlightEffect={ imageHighlightEffect }
						imageHighlightEffectSettings={ imageHighlightEffectSettings }
						imageControlsSettings={ imageControlsSettings }
						imageCaptionSettings={ imageCaptionSettings }
					/>, grid );
				});

				[...blockWrapper.getElementsByClassName( 'cgb-carousel' )].map( ( carousel ) => {
					ReactDOM.render( <Carousel
						imageHoverEffect={ imageHoverEffect }
						imageHoverEffectSettings={ imageHoverEffectSettings }
						imageControlsSettings={ imageControlsSettings }
						imageCaptionSettings={ imageCaptionSettings }
					/>, carousel );
				});

			});

		});

	});
});