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
			// align: true,
			// align: [ 'left', 'right', 'full' ],
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
						imageControlsSettings: imageControlsSettings || JSON.stringify( getCgbDefault( 'imageControlsSettings', { blockName: 'cgb/carousel' } ) ),
						imageCaptionSettings: imageCaptionSettings || JSON.stringify( getCgbDefault( 'imageCaptionSettings', { blockName: 'cgb/carousel' } ) ),
						imageHoverEffect: imageHoverEffect || getCgbDefault( 'imageHoverEffect', { blockName: 'cgb/carousel' } ),
						imageHoverEffectSettings: imageHoverEffectSettings || JSON.stringify( getCgbDefault( 'imageHoverEffectSettings', { blockName: 'cgb/carousel' } ) ),
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
			carouselSettings: {
				type: 'string',
				default:  JSON.stringify( getCgbDefault( 'carouselSettings', { blockName: 'cgb/carousel' } ) ),
			},
			imageControlsSettings: {
				type: 'string',
				default: JSON.stringify( getCgbDefault( 'imageControlsSettings', { blockName: 'cgb/carousel' } ) ),
			},
			imageCaptionSettings: {
				type: 'string',
				default:  JSON.stringify( getCgbDefault( 'imageCaptionSettings', { blockName: 'cgb/carousel' } ) ),
			},
			imageHoverEffect: {
				type: 'string',
				default: getCgbDefault( 'imageHoverEffect', { blockName: 'cgb/carousel' } ),
			},
			imageHoverEffectSettings: {
				type: 'string',
				default:  JSON.stringify( getCgbDefault( 'imageHoverEffectSettings', { blockName: 'cgb/carousel' } ) ),
			},
		},
		edit( {  attributes, className, setAttributes } ) {

			const imageHoverEffect = attributes.imageHoverEffect || getCgbDefault( 'imageHoverEffect', { blockName: 'cgb/carousel' } );
			const carouselSettings = extender.merge( getCgbDefault( 'carouselSettings', { blockName: 'cgb/carousel' } ), parseSerialized( attributes.carouselSettings ) );
			const imageControlsSettings = extender.merge( getCgbDefault( 'imageControlsSettings', { blockName: 'cgb/carousel' } ), parseSerialized( attributes.imageControlsSettings ) );
			const imageCaptionSettings = extender.merge( getCgbDefault( 'imageCaptionSettings', { blockName: 'cgb/carousel' } ), parseSerialized( attributes.imageCaptionSettings ) );
			const imageHoverEffectSettings = extender.merge( getCgbDefault( 'imageHoverEffectSettings', { blockName: 'cgb/carousel' } ), parseSerialized( attributes.imageHoverEffectSettings ) );

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
							carouselSettings={ carouselSettings }
							imageControlsSettings={ imageControlsSettings }
							imageCaptionSettings={ imageCaptionSettings }
							imageHoverEffect={ imageHoverEffect }
							imageHoverEffectSettings={ imageHoverEffectSettings }
						/>
					</InspectorControls>,

					<Carousel
						carouselSettings={ carouselSettings }
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