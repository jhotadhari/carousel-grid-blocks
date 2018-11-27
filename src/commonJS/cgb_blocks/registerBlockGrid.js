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
	createBlock
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

const registerBlockGrid = () => {

	registerBlockType( 'cgb/grid', {
		title: __( 'Cgb Image Grid' ),
		icon: 'grid-view',
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
					blocks: [ 'cgb/carousel' ],
					transform: ( {
						imageSource,
						imageIds,
						settings,
						imageControlsSettings,
						imageCaptionSettings,
						imageHoverEffect,
						imageHoverEffectSettings,
					} ) => createBlock( 'cgb/carousel', {
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
			const {
				// columns,
				// margin,
			} = attributes;

			// ??? use className

			const imageHoverEffect = attributes.imageHoverEffect || getCgbDefault( 'imageHoverEffect', { blockName: 'cgb/grid' } );
			const imageHighlightEffect = attributes.imageHighlightEffect || getCgbDefault( 'imageHighlightEffect', { blockName: 'cgb/grid' } );
			const gridSettings = extender.merge( getCgbDefault( 'gridSettings', { blockName: 'cgb/grid' } ), parseSerialized( attributes.gridSettings ) );
			const imageControlsSettings = extender.merge( getCgbDefault( 'imageControlsSettings', { blockName: 'cgb/grid' } ), parseSerialized( attributes.imageControlsSettings ) );
			const imageCaptionSettings = extender.merge( getCgbDefault( 'imageCaptionSettings', { blockName: 'cgb/grid' } ), parseSerialized( attributes.imageCaptionSettings ) );
			const imageHighlightEffectSettings = extender.merge( getCgbDefault( 'imageHighlightEffectSettings', { blockName: 'cgb/grid' } ), parseSerialized( attributes.imageHighlightEffectSettings ) );
			const imageHoverEffectSettings = extender.merge( getCgbDefault( 'imageHoverEffectSettings', { blockName: 'cgb/grid' } ), parseSerialized( attributes.imageHoverEffectSettings ) );

			if ( ! attributes.scriptsloaded) {
				// load the main editor component, rerender the block
				loadJS( [cgbBlocks.pluginDirUrl + '/js/cgb_blocks_editor.min.js'] ).then( () => setAttributes( { scriptsloaded: true } ) );
				// until loaded, display placeholder
				return <Placeholder/>;
			} else {

				const {
					Toolbar,
					GridInspector,
					Grid,
				} = cgbBlocks.components;

				return ([

					<BlockControls>
						<div className={ 'components-toolbar' }>
							<Toolbar/>
						</div>
					</BlockControls>,

					<InspectorControls>
						<GridInspector
							setAttributes={ setAttributes }
							gridSettings={ gridSettings }
							imageControlsSettings={ imageControlsSettings }
							imageCaptionSettings={ imageCaptionSettings }
							imageHoverEffect={ imageHoverEffect }
							imageHoverEffectSettings={ imageHoverEffectSettings }
							imageHighlightEffect={ imageHighlightEffect }
							imageHighlightEffectSettings={ imageHighlightEffectSettings }
						/>
					</InspectorControls>,

					<Grid
						gridSettings={ gridSettings }
						imageControlsSettings={ imageControlsSettings }
						imageCaptionSettings={ imageCaptionSettings }
						imageHoverEffect={ imageHoverEffect }
						imageHoverEffectSettings={ imageHoverEffectSettings }
						imageHighlightEffect={ imageHighlightEffect }
						imageHighlightEffectSettings={ imageHighlightEffectSettings }
					/>

				]);
			}
		},
		save( { attributes, className } ) {
			return null;
		},
	} );
}


export default registerBlockGrid;
