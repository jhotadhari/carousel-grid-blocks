/**
 * External dependencies
 */
import {
	set,
} from 'lodash';

/**
 * Internal dependencies
 */
import GridInspector		from '../components/GridInspector.jsx';

const cgbBlocks = window?.cgb_blocks_editor_loader_data || window?.cgb_blocks_frontend_loader_data;

const setupGridInspector = blockGroupId => {
	set( cgbBlocks, ['components',blockGroupId,'GridInspector'], GridInspector );
}

export default setupGridInspector;
