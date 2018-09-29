/**
 * External dependencies
 */
// import _ from 'underscore';
import loadJS from 'load-js';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	InspectorControls,
	BlockControls,
} = wp.editor;

/**
 * Internal dependencies
 */
import Placeholder 		from '../cgb_blocks/components/Placeholder.jsx';


const registerBlockCarousel = () => {

	registerBlockType( 'cgb/carousel', {
		title: __( 'Cgb Image Carousel' ),
		icon: 'format-gallery',
		category: 'common',


		supports: {
			html: false,
			align: true,
			align: [ 'left', 'right', 'full' ],
		},

		attributes: {
			imageIds: {
				type: 'array',
				default: [],
			},
			settings: {
				type: 'string',
				default: '',
			},
		},

		edit( {  attributes, className, setAttributes } ) {
			const {
				imageIds,
			} = attributes;

			if ( ! attributes.scriptsloaded) {
				// load the main editor component, rerender the block
				loadJS( [cgbBlocks.themeDirUrl + '/js/cgb_blocks.min.js'] ).then( () => setAttributes( { scriptsloaded: true } ) );
				// until loaded, display a placeholder
				return ([
					<Placeholder/>
				]);
			} else {

				return ([

					<BlockControls>
						<div className={ 'components-toolbar' }>
							<cgbBlocks.components.CarouselToolbar/>
						</div>
					</BlockControls>,

					<InspectorControls>
						<cgbBlocks.components.CarouselInspector/>
					</InspectorControls>,

					<cgbBlocks.components.Carousel/>
				]);
			}

		},

		save( { attributes, className } ) {
			// console.log( 'save attributes', attributes );		// ??? debug
			return null;
		},

	} );

}

export default registerBlockCarousel;