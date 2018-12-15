/**
 * External dependencies
 */
import {
	set,
} from 'lodash';

/**
 * Internal dependencies
 */
import composeWithItems 		from '../../cgb_blocks/store/compose/composeWithItemsEditor';
import composeWithProps 		from '../../cgb_blocks/store/compose/composeWithProps';
import ItemAdminControls		from '../components/ItemAdminControls.jsx';

const setupItemAdminControls = blockGroupId => {


	let _ItemAdminControls = composeWithItems( ItemAdminControls, [
		'updateItemFromMedia',
		'removeItem',
		'moveItem',
		'items',
	], blockGroupId );

	_ItemAdminControls = composeWithProps( { blockGroupId: blockGroupId } )( _ItemAdminControls );

	set( cgbBlocks, ['components',blockGroupId,'ItemAdminControls'], _ItemAdminControls );

}

export default setupItemAdminControls;
