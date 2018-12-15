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

const setupItemAdminControlsDragHandle = blockGroupId => {
	set( cgbBlocks, ['components',blockGroupId,'ItemAdminControlsDragHandle'], ItemAdminControlsDragHandle );
}

export default setupItemAdminControlsDragHandle;
