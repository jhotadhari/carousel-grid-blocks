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

const cgbBlocks = window?.cgb_blocks_editor_loader_data || window?.cgb_blocks_frontend_loader_data;

const setupItemAdminControlsMoveToIndex = blockGroupId => {

	let _ItemAdminControlsMoveToIndex = composeWithItems( ItemAdminControlsMoveToIndex, [
		'moveItem',
		'items',
	], blockGroupId );

	set( cgbBlocks, ['components',blockGroupId,'ItemAdminControlsMoveToIndex'], _ItemAdminControlsMoveToIndex );

}

export default setupItemAdminControlsMoveToIndex;
