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
	createBlock
} = wp.blocks;
const {
	InspectorControls,
	BlockControls,
} = wp.editor;
const {
	select,
} = wp.data;

/**
 * Internal dependencies
 */
import parseSerialized 				from '../cgb_blocks/utils/parseSerialized';
import getCgbDefault				from '../cgb_blocks/getCgbDefault';
import PlaceholderSpinner 			from '../cgb_blocks/components/PlaceholderSpinner.jsx';
import PlaceholderChooseGroup 		from './components/PlaceholderChooseGroup.jsx';

const registerBlockGrid = () => {

	registerBlockType( 'cgb/grid', {
		title: __( 'Cgb Image Grid' ),
		icon: 'grid-view',
		category: 'common',
		description:__( 'Display multiple images in a rich grid.', 'cgb' ),
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
					blocks: [ 'cgb/carousel' ],
					transform: ( {
						blockGroupId,
						imageSource,
						imageIds,
						settings,
						imageControlsSettings,
						imageCaptionSettings,
						imageHoverEffect,
						imageHoverEffectSettings,
					} ) => createBlock( 'cgb/carousel', {
						blockGroupId: blockGroupId,
						imageSource: imageSource,
						imageIds: imageIds || [],
						settings: settings || '',
						imageControlsSettings: imageControlsSettings || JSON.stringify( getCgbDefault( 'imageControlsSettings', { blockName: 'cgb/grid' } ) ),
						imageCaptionSettings: imageCaptionSettings || JSON.stringify( getCgbDefault( 'imageCaptionSettings', { blockName: 'cgb/grid' } ) ),
						imageHoverEffect: imageHoverEffect || getCgbDefault( 'imageHoverEffect', { blockName: 'cgb/grid' } ),
						imageHoverEffectSettings: imageHoverEffectSettings || JSON.stringify( getCgbDefault( 'imageHoverEffectSettings', { blockName: 'cgb/grid' } ) ),
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
			gridSettings: {
				type: 'string',
				default:  JSON.stringify( getCgbDefault( 'gridSettings', { blockName: 'cgb/grid' } ) ),
			},
			imageControlsSettings: {
				type: 'string',
				default: JSON.stringify( getCgbDefault( 'imageControlsSettings', { blockName: 'cgb/grid' } ) ),
			},
			imageCaptionSettings: {
				type: 'string',
				default: JSON.stringify( getCgbDefault( 'imageCaptionSettings', { blockName: 'cgb/grid' } ) ),
			},
			imageHoverEffect: {
				type: 'string',
				default: getCgbDefault( 'imageHoverEffect', { blockName: 'cgb/grid' } ),
			},
			imageHoverEffectSettings: {
				type: 'string',
				default:  JSON.stringify( getCgbDefault( 'imageHoverEffectSettings', { blockName: 'cgb/grid' } ) ),
			},

			imageHighlightEffect: {
				type: 'string',
				default:  getCgbDefault( 'imageHighlightEffect', { blockName: 'cgb/grid' } ),
			},
			imageHighlightEffectSettings: {
				type: 'string',
				default:  JSON.stringify( getCgbDefault( 'imageHighlightEffectSettings', { blockName: 'cgb/grid' } ) ),
			},
		},
		edit( {  attributes, className, setAttributes } ) {

			const { blockGroupId } = attributes;

			const imageHoverEffect = attributes.imageHoverEffect || getCgbDefault( 'imageHoverEffect', { blockName: 'cgb/grid' } );
			const imageHighlightEffect = attributes.imageHighlightEffect || getCgbDefault( 'imageHighlightEffect', { blockName: 'cgb/grid' } );
			const gridSettings = extender.merge( getCgbDefault( 'gridSettings', { blockName: 'cgb/grid' } ), parseSerialized( attributes.gridSettings ) );
			const imageControlsSettings = extender.merge( getCgbDefault( 'imageControlsSettings', { blockName: 'cgb/grid' } ), parseSerialized( attributes.imageControlsSettings ) );
			const imageCaptionSettings = extender.merge( getCgbDefault( 'imageCaptionSettings', { blockName: 'cgb/grid' } ), parseSerialized( attributes.imageCaptionSettings ) );
			const imageHighlightEffectSettings = extender.merge( getCgbDefault( 'imageHighlightEffectSettings', { blockName: 'cgb/grid' } ), parseSerialized( attributes.imageHighlightEffectSettings ) );
			const imageHoverEffectSettings = extender.merge( getCgbDefault( 'imageHoverEffectSettings', { blockName: 'cgb/grid' } ), parseSerialized( attributes.imageHoverEffectSettings ) );

			const classNameSorted = className.split( ' ' ).sort( ( a, b ) => {
				if ( 'wp-block-cgb-grid-block' === a ) return 1;
				if ( 'wp-block-cgb-grid-block' === b ) return -1;
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
					GridInspector,
					Grid,
					Carousel,
					Fullscreen,
					PlaceholderChooseItems,
				} = get( cgbBlocks, ['components',blockGroupId] );

				return (<>

					<BlockControls>
						<div className={ 'components-toolbar' }>
							<Toolbar/>
						</div>
					</BlockControls>

					<InspectorControls>
						<GridInspector
							blockGroupId={ blockGroupId }
							setAttributes={ setAttributes }
							gridSettings={ gridSettings }
							imageControlsSettings={ imageControlsSettings }
							imageCaptionSettings={ imageCaptionSettings }
							imageHoverEffect={ imageHoverEffect }
							imageHoverEffectSettings={ imageHoverEffectSettings }
							imageHighlightEffect={ imageHighlightEffect }
							imageHighlightEffectSettings={ imageHighlightEffectSettings }
						/>
					</InspectorControls>

					<Grid
						className={ classNameSorted }
						gridSettings={ gridSettings }
						imageControlsSettings={ imageControlsSettings }
						imageCaptionSettings={ imageCaptionSettings }
						imageHoverEffect={ imageHoverEffect }
						imageHoverEffectSettings={ imageHoverEffectSettings }
						imageHighlightEffect={ imageHighlightEffect }
						imageHighlightEffectSettings={ imageHighlightEffectSettings }
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


export default registerBlockGrid;
