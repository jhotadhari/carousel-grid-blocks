/**
 * External dependencies
 */
import loadJS from 'load-js';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
	registerBlockType,
	createBlock,
} = wp.blocks;
const {
	InspectorControls,
	BlockControls,
} = wp.editor;

/**
 * Internal dependencies
 */
import parseSerialized 		from './utils/parseSerialized';
import getCgbDefault		from './getCgbDefault';
import Placeholder 			from './components/Placeholder.jsx';

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
		transforms: {
			to: [
				{
					type: 'block',
					blocks: [ 'cgb/grid' ],
					transform: ( {
						imageIds,
						settings,
						imageHoverEffect,
					} ) => createBlock( 'cgb/grid', {
						imageIds: imageIds || [],
						settings: settings || '',
						imageHoverEffect: imageHoverEffect || getCgbDefault( 'imageHoverEffect' ),
					} ),
				},
			],
		},
		attributes: {

			imageSource: {		// common
				type: 'string',
				default: 'custom',		// custom || posts
			},

			imageIds: {			// common
				type: 'array',
				default: [],
			},
			settings: {			// common
				type: 'string',
				default: '',
			},
			imageHoverEffect: {
				type: 'string',
				default: getCgbDefault( 'imageHoverEffect' ),
			},
			imageHoverEffectSettings: {
				type: 'string',
				default:  JSON.stringify( getCgbDefault( 'imageHoverEffectSettings' ) ),
			},
		},
		edit( {  attributes, className, setAttributes } ) {
			const {
				imageHoverEffect,
			} = attributes;

			const imageHoverEffectSettings = parseSerialized( attributes.imageHoverEffectSettings );

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
						<CarouselInspector
							setAttributes={ setAttributes }
							imageHoverEffect={ imageHoverEffect }
							imageHoverEffectSettings={ imageHoverEffectSettings }
						/>
					</InspectorControls>,

					<Carousel
						imageHoverEffect={ imageHoverEffect }
						imageHoverEffectSettings={ imageHoverEffectSettings }
					/>
				]);
			}

		},
		save( { attributes, className } ) {
			return null;
		},
	} );
}

export default registerBlockCarousel;