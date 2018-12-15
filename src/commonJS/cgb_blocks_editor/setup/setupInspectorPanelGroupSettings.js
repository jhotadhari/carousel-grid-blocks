/**
 * External dependencies
 */
import {
	reject,
	set,
} from 'lodash';

/**
 * Internal dependencies
 */
import composeWithSettings 				from '../../cgb_blocks/store/compose/composeWithSettingsEditor';
import InspectorPanelGroupSettings		from '../components/InspectorPanelGroupSettings.jsx';

const setupInspectorPanelGroupSettings = blockGroupId => {

	let _InspectorPanelGroupSettings = InspectorPanelGroupSettings;

	_InspectorPanelGroupSettings = composeWithSettings( _InspectorPanelGroupSettings, [
		'transitionTime',
	], blockGroupId );

	set( cgbBlocks, ['components',blockGroupId,'InspectorPanelGroupSettings'], _InspectorPanelGroupSettings );

}

export default setupInspectorPanelGroupSettings;
