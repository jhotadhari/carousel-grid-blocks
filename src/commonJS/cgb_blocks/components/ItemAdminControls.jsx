/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
    IconButton,
} = wp.components;

const {
	MediaUpload,
} = wp.editor;

/**
 * Internal dependencies
 */
import composeWithItemsEditor 				from '../store/compose/composeWithItemsEditor.js';
// import composeWithSettingsEditor 			from '../store/compose/composeWithSettingsEditor.js';
import ItemAdminControlsMoveToIndex 				from './ItemAdminControlsMoveToIndex.jsx';
import ItemAdminControlsDragHandle 				from './ItemAdminControlsDragHandle.jsx';

let ItemAdminControls = ( {
	className,
	index,
	item: {
		id,
		fetched,
		title,
		orientation
	},
	items,
	updateItemFromMedia,
	removeItem,
	moveItem,
	controls,
} ) => <div className={ className }>

	<div className="cgb-block-item-controls-inner">

		{ controls.includes( 'dragHandle' ) &&
			<ItemAdminControlsDragHandle
				disabled={ items.length === 1 }
				label={ __( 'Move Image', 'cgb' ) }
			/>
		}

		{ controls.includes( 'moveLeft' ) &&
			<IconButton
				icon="arrow-left-alt2"
				label={ __( 'Move Image Left', 'cgb' ) }
				onClick={ () => moveItem( index, index - 1 ) }
				disabled={ items.length === 1 || index === 0 }
			/>
		}

		{ controls.includes( 'moveImage' ) &&
			<ItemAdminControlsMoveToIndex
				index={ index }
			/>
		}

		{ controls.includes( 'moveRight' ) &&
			<IconButton
				icon="arrow-right-alt2"
				label={ __( 'Move Image Right', 'cgb' ) }
				onClick={ () => moveItem( index, index + 1 ) }
				disabled={ items.length === 1 || index + 1 === items.length }
			/>
		}

		{ controls.includes( 'selectImage' ) &&
			<MediaUpload
				type="image"
				value={ id }
				onSelect={ ( media ) => updateItemFromMedia( index, media ) }
				render={ ({ open }) =>
					<IconButton
						icon="format-image"
						label={ __( 'Select Image', 'cgb' ) }
						onClick={ open }
					/>
				}
			/>
		}

		{ controls.includes( 'remove' ) &&
			<IconButton
				icon="minus"
				className={ 'remove' }
				label={ __( 'Remove Image From Block', 'cgb' ) }
				onClick={ () => removeItem( index ) }
			/>
		}

	</div>

</div>;

ItemAdminControls = composeWithItemsEditor( ItemAdminControls, [
	'updateItemFromMedia',
	'removeItem',
	'moveItem',
	'items',
] );

export default ItemAdminControls;