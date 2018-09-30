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
import defaults 		from './cgb_blocks_loader/defaults';
import Placeholder 		from './cgb_blocks_loader/components/Placeholder.jsx';

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


				const serializedData = blockWrapper.getAttribute('data-cgb');
				let data = {};
				try {
					data = JSON.parse( serializedData );
				} catch(e) {
					data = {};
				}

				[... blockWrapper.getElementsByClassName( 'cgb-grid' )].map( ( grid ) => {
					const itemWidth = data.itemWidth || defaults.itemWidth;

					ReactDOM.render( <Grid
						itemWidth={ itemWidth }
					/>, grid );
				});

				[...blockWrapper.getElementsByClassName( 'cgb-carousel' )].map( ( carousel ) => {
					ReactDOM.render( <Carousel/>, carousel );
				});

			});

		});

	});
});