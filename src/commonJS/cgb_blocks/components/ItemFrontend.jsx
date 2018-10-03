
/*
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import composeWithItemsFrontend 		from '../store/compose/composeWithItemsFrontend.js';
import Item 							from './Item.jsx';

let ItemFrontend = Item;

ItemFrontend.propTypes = {
	style: PropTypes.object,
}

ItemFrontend.defaultProps = {
	style: {},
}

ItemFrontend = composeWithItemsFrontend( ItemFrontend, [
	'items',
	'fetchItem',
	'selectedIndex',
	'setSelected',
] );

cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};
cgbBlocks.components.Item		= ItemFrontend;

export default ItemFrontend;
