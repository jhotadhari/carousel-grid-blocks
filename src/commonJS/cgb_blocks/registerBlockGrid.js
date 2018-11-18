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
			gridSettings: {
				type: 'string',
				default:  JSON.stringify( getCgbDefault( 'gridSettings' ) ),
			},
			imageControlsSettings: {
				type: 'string',
				default: JSON.stringify( getCgbDefault( 'imageControlsSettings' ) ),
			},
			imageCaptionSettings: {
				type: 'string',
				default: JSON.stringify( getCgbDefault( 'imageCaptionSettings' ) ),
			},
			imageHoverEffect: {
				type: 'string',
				default: getCgbDefault( 'imageHoverEffect' ),
			},
			imageHoverEffectSettings: {
				type: 'string',
				default:  JSON.stringify( getCgbDefault( 'imageHoverEffectSettings' ) ),
			},

			imageHighlightEffect: {
				type: 'string',
				default:  getCgbDefault( 'imageHighlightEffect' ),
			},
			imageHighlightEffectSettings: {
				type: 'string',
				default:  JSON.stringify( getCgbDefault( 'imageHighlightEffectSettings' ) ),
			},
		},
		edit( {  attributes, className, setAttributes } ) {
			const {
				columns,
				margin,
				imageHoverEffect,
				imageHighlightEffect,
			} = attributes;

			// ??? use className

			const gridSettings = extender.merge( getCgbDefault( 'gridSettings' ), parseSerialized( attributes.gridSettings ) );
			const imageControlsSettings = extender.merge( getCgbDefault( 'imageControlsSettings' ), parseSerialized( attributes.imageControlsSettings ) );
			const imageCaptionSettings = extender.merge( getCgbDefault( 'imageCaptionSettings' ), parseSerialized( attributes.imageCaptionSettings ) );
			const imageHighlightEffectSettings = extender.merge( getCgbDefault( 'imageHighlightEffectSettings' ), parseSerialized( attributes.imageHighlightEffectSettings ) );
			const imageHoverEffectSettings = extender.merge( getCgbDefault( 'imageHoverEffectSettings' ), parseSerialized( attributes.imageHoverEffectSettings ) );

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
