/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import {
	set,
	get,
} from 'lodash';

/**
 * Internal dependencies
 */
import composeWithItems 		from '../../cgb_blocks/store/compose/composeWithItemsEditor';
import composeWithSettings 		from '../../cgb_blocks/store/compose/composeWithSettingsEditor';
import composeWithUi			from '../../cgb_blocks/store/compose/composeWithUiEditor';
import composeWithProps			from '../../cgb_blocks/store/compose/composeWithProps';
import Item			 			from '../../cgb_blocks/components/Item.jsx';

const setupItem = blockGroupId => {

	let _Item = Item;
	_Item.propTypes = {
		style: PropTypes.object,
	}
	_Item.defaultProps = {
		style: {},
	}
	_Item = composeWithItems( _Item, [
		'items',
		'fetchItem',
		'selectedIndex',
		'setSelected',
		'getIndexByKey',
		'removeItem',
	], blockGroupId );

	_Item = composeWithSettings( _Item, [
		'transitionTime',
	], blockGroupId );

	_Item = composeWithUi( _Item, blockGroupId );

	_Item = composeWithProps( { ItemAdminControlsComponent: get( cgbBlocks, ['components',blockGroupId,'ItemAdminControls'] ) } )( _Item );

	set( cgbBlocks, ['components',blockGroupId,'Item'], _Item );

}

export default setupItem;
