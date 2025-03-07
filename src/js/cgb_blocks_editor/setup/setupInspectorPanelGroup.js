/**
 * External dependencies
 */
import {
	set,
} from 'lodash';

/**
 * Internal dependencies
 */
import InspectorPanelGroup			from '../components/InspectorPanelGroup.jsx';

const cgbBlocks = window?.cgb_blocks_editor_loader_data || window?.cgb_blocks_frontend_loader_data;

const setupInspectorPanelGroup = blockGroupId => {
	set( cgbBlocks, ['components',blockGroupId,'InspectorPanelGroup'], InspectorPanelGroup )
};

export default setupInspectorPanelGroup;