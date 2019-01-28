/**
 * External dependencies
 */
import loadJS from 'load-js';
import extender from 'object-extender';
import {
	get,
} from 'lodash';

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
import parseSerialized 		from '../cgb_blocks/utils/parseSerialized';
import getCgbDefault		from '../cgb_blocks/getCgbDefault';
import PlaceholderSpinner 	from '../cgb_blocks/components/PlaceholderSpinner.jsx';
import PlaceholderChooseGroup 			from './components/PlaceholderChooseGroup.jsx';

const registerBlockCarousel = () => {

	registerBlockType( 'cgb/carousel', {
		title: __( 'Cgb Image Carousel' ),
		icon: 'format-gallery',
		category: 'common',
		description:__( 'Display multiple images in a rich carousel.', 'cgb' ),
		keywords: [ __( 'gallery' ), __( 'images' ), __( 'photos' ) ],
		reusable: false,
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
						blockGroupId,
						imageSource,
						imageIds,
						settings,
						imageControlsSettings,
						imageCaptionSettings,
						imageHoverEffect,
						imageHoverEffectSettings,
					} ) => createBlock( 'cgb/grid', {
						blockGroupId: blockGroupId,
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

			blockGroupId: {
				type: 'string',
				default: '',
			},


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

			const { blockGroupId } = attributes;

			const imageHoverEffect = attributes.imageHoverEffect || getCgbDefault( 'imageHoverEffect', { blockName: 'cgb/carousel' } );
			const carouselSettings = extender.merge( getCgbDefault( 'carouselSettings', { blockName: 'cgb/carousel' } ), parseSerialized( attributes.carouselSettings ) );
			const imageControlsSettings = extender.merge( getCgbDefault( 'imageControlsSettings', { blockName: 'cgb/carousel' } ), parseSerialized( attributes.imageControlsSettings ) );
			const imageCaptionSettings = extender.merge( getCgbDefault( 'imageCaptionSettings', { blockName: 'cgb/carousel' } ), parseSerialized( attributes.imageCaptionSettings ) );
			const imageHoverEffectSettings = extender.merge( getCgbDefault( 'imageHoverEffectSettings', { blockName: 'cgb/carousel' } ), parseSerialized( attributes.imageHoverEffectSettings ) );

			const classNameSorted = className.split( ' ' ).sort( ( a, b ) => {
				if ( 'wp-block-cgb-carousel-block' === a ) return 1;
				if ( 'wp-block-cgb-carousel-block' === b ) return -1;
				return 0;
			} ).join( ' ' );

			if ( ! attributes.scriptsloaded ) {
				loadJS( [cgbBlocks.pluginDirUrl + '/js/cgb_blocks_editor.min.js'] ).then( () => setAttributes( { scriptsloaded: true } ) );
				return <PlaceholderSpinner/>;
			} else if ( ! blockGroupId.length ) {
				return <PlaceholderChooseGroup setAttributes={ setAttributes }/>;
			} else if ( ! attributes.setupDone ) {
				const setupDone = cgbBlocks.setupGroup( blockGroupId );
				if ( setupDone )
					setAttributes( { setupDone: true } );
				return <PlaceholderSpinner/>;
			} else {

				const {
					Toolbar,
					CarouselInspector,
					Carousel,
					Fullscreen,
					PlaceholderChooseItems,
				} = get( cgbBlocks, ['components',blockGroupId] );

				return ( <>
					<BlockControls>
						<div className={ 'components-toolbar' }>
							<Toolbar/>
						</div>
					</BlockControls>

					<InspectorControls>
						<CarouselInspector
							blockGroupId={ blockGroupId }
							setAttributes={ setAttributes }
							carouselSettings={ carouselSettings }
							imageControlsSettings={ imageControlsSettings }
							imageCaptionSettings={ imageCaptionSettings }
							imageHoverEffect={ imageHoverEffect }
							imageHoverEffectSettings={ imageHoverEffectSettings }
						/>
					</InspectorControls>

					<Carousel
						className={ classNameSorted }
						carouselSettings={ carouselSettings }
						imageControlsSettings={ imageControlsSettings }
						imageCaptionSettings={ imageCaptionSettings }
						imageHoverEffect={ imageHoverEffect }
						imageHoverEffectSettings={ imageHoverEffectSettings }
						PlaceholderNoItems={ PlaceholderChooseItems }
					/>

					<Fullscreen
						Carousel= { Carousel }
						carouselSettings={ getCgbDefault( 'carouselSettings', { blockName: 'cgb/fullscreen' } ) }
						imageHoverEffect={ getCgbDefault( 'imageHoverEffect', { blockName: 'cgb/fullscreen' } ) }
						imageHoverEffectSettings={ getCgbDefault( 'imageHoverEffectSettings', { blockName: 'cgb/fullscreen' } ) }
						imageControlsSettings={ getCgbDefault( 'imageControlsSettings', { blockName: 'cgb/fullscreen' } ) }
						imageCaptionSettings={ getCgbDefault( 'imageCaptionSettings', { blockName: 'cgb/fullscreen' } ) }
					/>

				</> );
			}

		},
		save( { attributes, className } ) {
			return null;
		},
	} );
}

export default registerBlockCarousel;