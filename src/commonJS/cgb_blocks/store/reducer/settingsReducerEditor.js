/**
 * External dependencies
 */
import {
	isEmpty,
	get,
} from 'lodash';

/**
 * WordPress dependencies
 */
const {
	select,
	dispatch,
} = wp.data;

/**
 * Internal dependencies
 */
import { DEFAULT_STATE } 	from '../constants';
import getCgbBlocks 		from '../../utils/getCgbBlocks';

export function pullSettingsFromAttributes( state = { settings: { ...DEFAULT_STATE.settings } }, action ) {
	const { settings } = state;
	const blocks = getCgbBlocks();
	const newSettings = {
		...settings,
		...[...blocks].reduce( ( acc, block ) => {
			if ( ! isEmpty( acc ) ) return acc;
			const blockSettings = get( block, [ 'attributes', 'settings' ] );
			try {
				return blockSettings ? JSON.parse( blockSettings ) : acc;
			} catch(e) {
				return {};
			}
		}, {} )
	};
	return {
		...state,
		settings: newSettings,
	};
}

export function updateSetting( state = { settings: { ...DEFAULT_STATE.settings } }, action ) {
	const { settings } = state;
	const { key, newValue } = action;
	const newSettings = {...settings};
	newSettings[key] = newValue;
	return {
		...state,
		settings: newSettings,
	};
}

const settingsReducerEditor = ( state = { settings: { ...DEFAULT_STATE.settings } }, action ) => {

	switch ( action.type ) {

		case 'PULL_SETTINGS_FROM_ATTRIBUTES':
			return pullSettingsFromAttributes( state, action );

		case 'UPDATE_SETTING':
			return updateSetting( state, action );

	}

	return state;
}

export default settingsReducerEditor;