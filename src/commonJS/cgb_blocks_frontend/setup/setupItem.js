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
import composeWithItems 		from '../../cgb_blocks/store/compose/composeWithItemsFrontend';
import composeWithSettings 		from '../../cgb_blocks/store/compose/composeWithSettingsFrontend';
import composeWithUi			from '../../cgb_blocks/store/compose/composeWithUiFrontend';
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
	], blockGroupId );

	_Item = composeWithSettings( _Item, [
		'transitionTime',
	], blockGroupId );

	_Item = composeWithUi( _Item, blockGroupId );

	set( cgbBlocks, ['components',blockGroupId,'Item'], _Item );

}

export default setupItem;
