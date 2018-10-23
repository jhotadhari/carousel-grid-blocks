/**
 * External dependencies
 */
import loadJS from 'load-js';
import extender from 'object-extender';

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
						imageSource,
						imageIds,
						settings,
						imageControlsSettings,
						imageCaptionSettings,
						imageHoverEffect,
						imageHoverEffectSettings,
					} ) => createBlock( 'cgb/grid', {
						imageSource: imageSource,
						imageIds: imageIds || [],
						settings: settings || '',
						imageControlsSettings: imageControlsSettings || JSON.stringify( getCgbDefault( 'imageControlsSettings' ) ),
						imageCaptionSettings: imageCaptionSettings || JSON.stringify( getCgbDefault( 'imageCaptionSettings' ) ),
						imageHoverEffect: imageHoverEffect || getCgbDefault( 'imageHoverEffect' ),
						imageHoverEffectSettings: imageHoverEffectSettings || JSON.stringify( getCgbDefault( 'imageHoverEffectSettings' ) ),
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
			imageControlsSettings: {
				type: 'string',
				default: JSON.stringify( getCgbDefault( 'imageControlsSettings' ) ),
			},
			imageCaptionSettings: {
				type: 'string',
				default:  JSON.stringify( getCgbDefault( 'imageCaptionSettings' ) ),
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

			const imageControlsSettings = extender.merge( getCgbDefault( 'imageControlsSettings' ), parseSerialized( attributes.imageControlsSettings ) );
			const imageCaptionSettings = extender.merge( getCgbDefault( 'imageCaptionSettings' ), parseSerialized( attributes.imageCaptionSettings ) );
			const imageHoverEffectSettings = extender.merge( getCgbDefault( 'imageHoverEffectSettings' ), parseSerialized( attributes.imageHoverEffectSettings ) );

			if ( ! attributes.scriptsloaded) {
				// load the main editor component, rerender the block
				loadJS( [cgbBlocks.pluginDirUrl + '/js/cgb_blocks_editor.min.js'] ).then( () => setAttributes( { scriptsloaded: true } ) );
				// until loaded, display a placeholder
				return <Placeholder/>;
			} else {

				const {
					Toolbar,
					CarouselInspector,
					Carousel,
				} = cgbBlocks.components;

				return ([
					<BlockControls>
						<div className={ 'components-toolbar' }>
							<Toolbar/>
						</div>
					</BlockControls>,

					<InspectorControls>
						<CarouselInspector
							setAttributes={ setAttributes }
							imageControlsSettings={ imageControlsSettings }
							imageCaptionSettings={ imageCaptionSettings }
							imageHoverEffect={ imageHoverEffect }
							imageHoverEffectSettings={ imageHoverEffectSettings }
						/>
					</InspectorControls>,

					<Carousel
						imageControlsSettings={ imageControlsSettings }
						imageCaptionSettings={ imageCaptionSettings }
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