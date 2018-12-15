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

const setupInspectorPanelGroup = blockGroupId => {
	set( cgbBlocks, ['components',blockGroupId,'InspectorPanelGroup'], InspectorPanelGroup )
};

export default setupInspectorPanelGroup;