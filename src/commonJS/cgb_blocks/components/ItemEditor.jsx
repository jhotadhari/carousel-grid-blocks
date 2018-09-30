/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import composeWithItemsEditor 			from '../store/compose/composeWithItemsEditor.js';
import Item 							from './Item.jsx';

let ItemEditor = Item;

ItemEditor.propTypes = {
	style: PropTypes.object,
}

ItemEditor.defaultProps = {
	style: {},
}

ItemEditor = composeWithItemsEditor( ItemEditor, [
	'fetchItem',
	'selectedIndex',
	'setSelected',
	'removeItem',
] );

cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};
cgbBlocks.components.Item		= ItemEditor;


export default ItemEditor;
