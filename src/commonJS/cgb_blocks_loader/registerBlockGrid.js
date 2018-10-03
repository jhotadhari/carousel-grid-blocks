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
import defaults 		from './defaults';
import Placeholder 		from '../cgb_blocks_loader/components/Placeholder.jsx';

const registerBlockGrid = () => {

	registerBlockType( 'cgb/grid', {
		title: __( 'Cgb Image Grid' ),
		icon: 'grid-view',
		category: 'common',

		supports: {
			html: false,
			align: true,
			align: [ 'left', 'right', 'full' ],
			// multiple: false,
		},

		attributes: {
			imageIds: {			// common
				type: 'array',
				default: [],
			},
			settings: {			// common
				type: 'string',
				default: '',
			},

			columns: {
				type: 'string',
				default: defaults.columns,
			},
			margin: {
				type: 'string',
				default: defaults.margin,
			},


			imageHoverEffect: {
				type: 'string',
				default: defaults.imageHoverEffect,
			},
			imageHighlightEffect: {
				type: 'string',
				default:  defaults.imageHighlightEffect,
			},
			imageHighlightBoxShadowColor: {
				type: 'string',
				default:  defaults.imageHighlightBoxShadowColor,
			},
			imageHighlightBoxShadowWidth: {
				type: 'string',
				default:  defaults.imageHighlightBoxShadowWidth,
			},
		},

		edit( {  attributes, className, setAttributes } ) {
			const {
				columns,
				margin,
				imageHoverEffect,
				imageHighlightEffect,
				imageHighlightBoxShadowColor,
				imageHighlightBoxShadowWidth,
			} = attributes;


			if ( ! attributes.scriptsloaded) {
				// load the main editor component, rerender the block
				loadJS( [cgbBlocks.pluginDirUrl + '/js/cgb_blocks_editor.min.js'] ).then( () => setAttributes( { scriptsloaded: true } ) );
				// until loaded, display placeholder
				return ([ <Placeholder/> ]);
			} else {

				const {
					GridToolbar,
					GridInspector,
					Grid,
				} = cgbBlocks.components;

				return ([

					<BlockControls>
						<div className={ 'components-toolbar' }>
							<GridToolbar/>
						</div>
					</BlockControls>,

					<InspectorControls>
						<GridInspector
							setAttributes={ setAttributes }
							columns={ columns }
							margin={ parseInt( margin ) }
							imageHoverEffect={ imageHoverEffect }
							imageHighlightEffect={ imageHighlightEffect }
							imageHighlightBoxShadowColor={ imageHighlightBoxShadowColor }
							imageHighlightBoxShadowWidth={ imageHighlightBoxShadowWidth }
						/>
					</InspectorControls>,

					<Grid
						columns={ columns }
						margin={ parseInt( margin ) }
						imageHoverEffect={ imageHoverEffect }
						imageHighlightEffect={ imageHighlightEffect }
						imageHighlightBoxShadowColor={ imageHighlightBoxShadowColor }
						imageHighlightBoxShadowWidth={ imageHighlightBoxShadowWidth }
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


