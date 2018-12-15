/**
 * External dependencies
 */
import {
	// isEmpty,
	get,
} from 'lodash';

/**
 * Internal dependencies
 */
import { DEFAULT_STATE } 	from '../constants';
import parseSerialized		from '../../utils/parseSerialized';

export function pullSettingsFromAttributes( state = { settings: { ...DEFAULT_STATE.settings } }, action ) {
	const { settings } = state;
	const { blockGroupId } = action;
	const blockWrappers = document.getElementsByClassName( 'cgb-block-wrapper' );
	const newSettings = blockWrappers.length === 0 ? { ...settings } : {
		...DEFAULT_STATE.settings,
		...[...blockWrappers].reduce( ( acc, blockWrapper ) => {
			if ( acc.length ) return acc;
			const data = parseSerialized( blockWrapper.getAttribute('data-cgb') );
			return data.blockGroupId === blockGroupId ? get( data, [ 'settings' ], acc ) : acc;
		}, {} )
	};
	return {
		...state,
		settings: newSettings,
	};
}

const settingsReducerFrontend = ( state = { settings: { ...DEFAULT_STATE.settings } }, action ) => {
	switch ( action.type ) {
		case 'PULL_SETTINGS_FROM_ATTRIBUTES':
			return pullSettingsFromAttributes( state, action );
	}
	return state;
}

export default settingsReducerFrontend;