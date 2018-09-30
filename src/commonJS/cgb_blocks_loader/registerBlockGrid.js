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
			imageIds: {
				type: 'array',
				default: [],
			},
			settings: {
				type: 'string',
				default: '',
			},
			itemWidth: {
				type: 'string',
				default: defaults.itemWidth,
			},
		},

		edit( {  attributes, className, setAttributes } ) {
			const {
				itemWidth,
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
							itemWidth={ itemWidth }
							setAttributes={ setAttributes }
						/>
					</InspectorControls>,

					<Grid
						itemWidth={ itemWidth }
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


