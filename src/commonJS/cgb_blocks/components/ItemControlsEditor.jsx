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
    Dropdown,
} = wp.components;

const {
	MediaUpload,
} = wp.editor;

/**
 * Internal dependencies
 */
import composeWithItemsEditor 		from '../store/compose/composeWithItemsEditor.js';
import MoveItemToIndex 				from './MoveItemToIndex.jsx';

let ItemControlsEditor = ( {
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
} ) => <div className="cgb-block-item-controls cgb-flex-row">

	<div className="cgb-block-item-controls-inner">

		<MediaUpload
			type="image"
			value={ id }
			onSelect={ ( media ) => updateItemFromMedia( index, media ) }
			render={ ({ open }) =>
				<IconButton
					icon="format-image"
					onClick={ open }
				/>
			}
		/>

		<IconButton
			icon="editor-expand"
			label={ __( 'Fullscreen', 'cgb' ) }
			onClick={ () => console.log( 'fullscreen' ) }
		/>

		<IconButton
			icon="minus"
			className={ 'remove' }
			label={ __( 'Remove Image From Block', 'cgb' ) }
			onClick={ () => removeItem( index ) }
		/>

	</div>


	<div className="cgb-block-item-controls-inner cgb-flex-row">

		<IconButton
			icon="arrow-left-alt2"
			label={ __( 'Move Image Left', 'cgb' ) }
			onClick={ () => moveItem( index, index - 1 ) }
			disabled={ items.length === 1 || index === 0 }
		/>

		<Dropdown
			position="bottom center"
			contentClassName={ 'cgb-block-item-controls-popover cgb-flex-row' }
			expandOnMobile={false}
			renderToggle={ ( { isOpen, onToggle, onClose } ) => (
				<IconButton
					icon="share-alt2"
					aria-expanded={ isOpen }
					label={ __( 'Move Image To New Position', 'cgb' ) }
					onClick={ onToggle }
				/>
			) }
			renderContent={ ( { isOpen, onToggle, onClose } ) => ([
				<MoveItemToIndex
					index={ index }
					onClose={ onClose }
				/>
			]) }
		/>

		<IconButton
			icon="arrow-right-alt2"
			label={ __( 'Move Image Right', 'cgb' ) }
			onClick={ () => moveItem( index, index + 1 ) }
			disabled={ items.length === 1 || index + 1 === items.length }
		/>

	</div>


</div>;

ItemControlsEditor = composeWithItemsEditor( ItemControlsEditor, [
	'updateItemFromMedia',
	'removeItem',
	'moveItem',
	'items',
] );

cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};
cgbBlocks.components.ItemControls		= ItemControlsEditor;

export default ItemControlsEditor;
