/**
 * External dependencies
 */
import loadJS from 'load-js';
import extender from 'object-extender';
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
			Fullscreen,
		} = cgbBlocks.components;

		[...blockWrappers].map( ( blockWrapper ) => {

			const data = parseSerialized( blockWrapper.getAttribute('data-cgb') );


			[... blockWrapper.getElementsByClassName( 'cgb-grid' )].map( ( grid ) => {
				ReactDOM.render( <>
					<Grid
						gridSettings={ extender.merge( getCgbDefault( 'gridSettings', { blockName: 'cgb/grid' } ), data.gridSettings ) }
						imageHoverEffect={ data.imageHoverEffect || getCgbDefault( 'imageHoverEffect', { blockName: 'cgb/grid' } ) }
						imageHoverEffectSettings={ extender.merge( getCgbDefault( 'imageHoverEffectSettings', { blockName: 'cgb/grid' } ), data.imageHoverEffectSettings ) }
						imageHighlightEffect={ data.imageHighlightEffect ||getCgbDefault( 'imageHighlightEffect', { blockName: 'cgb/grid' } ) }
						imageHighlightEffectSettings={ extender.merge( getCgbDefault( 'imageHighlightEffectSettings', { blockName: 'cgb/grid' } ), data.imageHighlightEffectSettings ) }
						imageControlsSettings={ extender.merge( getCgbDefault( 'imageControlsSettings', { blockName: 'cgb/grid' } ), data.imageControlsSettings ) }
						imageCaptionSettings={ extender.merge( getCgbDefault( 'imageCaptionSettings', { blockName: 'cgb/grid' } ), data.imageCaptionSettings ) }
					/>
					<Fullscreen
						Carousel= { Carousel }
						carouselSettings={ getCgbDefault( 'carouselSettings', { blockName: 'cgb/fullscreen' } ) }
						imageHoverEffect={ getCgbDefault( 'imageHoverEffect', { blockName: 'cgb/fullscreen' } ) }
						imageHoverEffectSettings={ getCgbDefault( 'imageHoverEffectSettings', { blockName: 'cgb/fullscreen' } ) }
						imageControlsSettings={ getCgbDefault( 'imageControlsSettings', { blockName: 'cgb/fullscreen' } ) }
						imageCaptionSettings={ getCgbDefault( 'imageCaptionSettings', { blockName: 'cgb/fullscreen' } ) }
					/>
				</>, grid );
			});

			[...blockWrapper.getElementsByClassName( 'cgb-carousel' )].map( ( carousel ) => {
				ReactDOM.render( <>
					<Carousel
						carouselSettings={ extender.merge( getCgbDefault( 'carouselSettings', { blockName: 'cgb/carousel' } ), data.carouselSettings ) }
						imageHoverEffect={ data.imageHoverEffect || getCgbDefault( 'imageHoverEffect', { blockName: 'cgb/carousel' } ) }
						imageHoverEffectSettings={ extender.merge( getCgbDefault( 'imageHoverEffectSettings', { blockName: 'cgb/carousel' } ), data.imageHoverEffectSettings ) }
						imageControlsSettings={ extender.merge( getCgbDefault( 'imageControlsSettings', { blockName: 'cgb/carousel' } ), data.imageControlsSettings ) }
						imageCaptionSettings={ extender.merge( getCgbDefault( 'imageCaptionSettings', { blockName: 'cgb/carousel' } ), data.imageCaptionSettings ) }
					/>
					<Fullscreen
						Carousel= { Carousel }
						carouselSettings={ getCgbDefault( 'carouselSettings', { blockName: 'cgb/fullscreen' } ) }
						imageHoverEffect={ getCgbDefault( 'imageHoverEffect', { blockName: 'cgb/fullscreen' } ) }
						imageHoverEffectSettings={ getCgbDefault( 'imageHoverEffectSettings', { blockName: 'cgb/fullscreen' } ) }
						imageControlsSettings={ getCgbDefault( 'imageControlsSettings', { blockName: 'cgb/fullscreen' } ) }
						imageCaptionSettings={ getCgbDefault( 'imageCaptionSettings', { blockName: 'cgb/fullscreen' } ) }
					/>
				</>, carousel );
			});

		});

	});

});