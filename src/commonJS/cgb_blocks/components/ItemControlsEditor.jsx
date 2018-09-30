/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { get } from 'lodash';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
    Button,
    IconButton,
} = wp.components;

const {
	MediaUpload,
} = wp.editor;

/**
 * Internal dependencies
 */
import composeWithItemsEditor 			from '../store/compose/composeWithItemsEditor.js';

let ItemControlsEditor = ( {
	index,
	item: {
		id,
		fetched,
		title,
		orientation
	},
	updateItemFromMedia,
	removeItem,
} ) => <div className="cgb-block-item-controls">
	<div className="cgb-block-item-controls-inner">

		<MediaUpload
			type="image"
			value={ id }
			onSelect={ ( media ) => updateItemFromMedia( index, media ) }
			render={ ({ open }) =>
				<Button
					onClick={ open }
					className="button button-large"
				>
				{ '??? Pick Image' }
				</Button>

			}
		/>

		<IconButton
			className="cgb-remove-item cgb-button"
			icon="minus"
			onClick={ () => removeItem( index ) }
		/>

	</div>
</div>;

ItemControlsEditor = composeWithItemsEditor( ItemControlsEditor, [
	'updateItemFromMedia',
	'removeItem',
] );

cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};
cgbBlocks.components.ItemControls		= ItemControlsEditor;

export default ItemControlsEditor;
