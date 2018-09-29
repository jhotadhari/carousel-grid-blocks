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
import Placeholder 		from '../cgb_blocks/components/Placeholder.jsx';

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
				default: 200,
			},
		},

		edit( {  attributes, className, setAttributes } ) {
			const {
				itemWidth,
			} = attributes;


			if ( ! attributes.scriptsloaded) {
				// load the main editor component, rerender the block
				loadJS( [cgbBlocks.themeDirUrl + '/js/cgb_blocks.min.js'] ).then( () => setAttributes( { scriptsloaded: true } ) );
				// until loaded, display placeholder
				return ([ <Placeholder/> ]);
			} else {
				return ([

					<BlockControls>
						<div className={ 'components-toolbar' }>
							<cgbBlocks.components.GridToolbar/>
						</div>
					</BlockControls>,

					<InspectorControls>
						<cgbBlocks.components.GridInspector
							itemWidth={ itemWidth }
							setAttributes={ setAttributes }
						/>
					</InspectorControls>,

					<cgbBlocks.components.Grid
						itemWidth={ itemWidth }
					/>

				]);
			}

		},

		save( { attributes, className } ) {
			// console.log( 'save attributes', attributes );		// ??? debug
			return null;
		},

	} );

}

export default registerBlockGrid;


