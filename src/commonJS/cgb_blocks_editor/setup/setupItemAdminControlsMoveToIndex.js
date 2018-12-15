/**
 * External dependencies
 */
import {
	set,
} from 'lodash';

/**
 * Internal dependencies
 */
import composeWithItems 				from '../../cgb_blocks/store/compose/composeWithItemsEditor';
import ItemAdminControlsMoveToIndex		from '../components/ItemAdminControlsMoveToIndex.jsx';

const setupItemAdminControlsMoveToIndex = blockGroupId => {

	let _ItemAdminControlsMoveToIndex = composeWithItems( ItemAdminControlsMoveToIndex, [
		'moveItem',
		'items',
	], blockGroupId );

	set( cgbBlocks, ['components',blockGroupId,'ItemAdminControlsMoveToIndex'], _ItemAdminControlsMoveToIndex );

}

export default setupItemAdminControlsMoveToIndex;
