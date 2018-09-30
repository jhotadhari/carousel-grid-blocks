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
import Placeholder 		from '../cgb_blocks_loader/components/Placeholder.jsx';


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
				loadJS( [cgbBlocks.pluginDirUrl + '/js/cgb_blocks_editor.min.js'] ).then( () => setAttributes( { scriptsloaded: true } ) );
				// until loaded, display a placeholder
				return ([
					<Placeholder/>
				]);
			} else {

				const {
					CarouselToolbar,
					CarouselInspector,
					Carousel,
				} = cgbBlocks.components;

				return ([

					<BlockControls>
						<div className={ 'components-toolbar' }>
							<CarouselToolbar/>
						</div>
					</BlockControls>,

					<InspectorControls>
						<CarouselInspector/>
					</InspectorControls>,

					<Carousel/>
				]);
			}

		},

		save( { attributes, className } ) {
			return null;
		},

	} );

}

export default registerBlockCarousel;