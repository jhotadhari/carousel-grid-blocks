/**
 * External dependencies
 */
import {
	isEmpty,
	get,
} from 'lodash';

/**
 * Internal dependencies
 */
import { DEFAULT_STATE } 	from '../constants';

export function pullSettingsFromAttributes( state = { settings: { ...DEFAULT_STATE.settings } }, action ) {
	const { settings } = state;
	const blockWrappers = document.getElementsByClassName( 'cgb-block-wrapper' );
	const newSettings = blockWrappers.length === 0 ? { ...settings } : {
		...DEFAULT_STATE.settings,
		...[...blockWrappers].reduce( ( acc, blockWrapper ) => {
			if ( ! isEmpty( acc ) ) return acc;
			const serializedData = blockWrapper.getAttribute('data-cgb');

			let data = {};
			try {
				data = JSON.parse( serializedData );
			} catch(e) {
				data = {};
			}

			const blockSettings = get( data, [ 'settings' ] );
			return undefined !== blockSettings ? blockSettings : acc;

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