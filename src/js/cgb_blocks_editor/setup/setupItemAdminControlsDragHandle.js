/**
 * External dependencies
 */
import {
	set,
} from 'lodash';

/**
 * Internal dependencies
 */
import ItemAdminControlsDragHandle		from '../components/ItemAdminControlsDragHandle.jsx';

const cgbBlocks = window?.cgb_blocks_editor_loader_data || window?.cgb_blocks_frontend_loader_data;

const setupItemAdminControlsDragHandle = blockGroupId => {
	set( cgbBlocks, ['components',blockGroupId,'ItemAdminControlsDragHandle'], ItemAdminControlsDragHandle );
}

export default setupItemAdminControlsDragHandle;
