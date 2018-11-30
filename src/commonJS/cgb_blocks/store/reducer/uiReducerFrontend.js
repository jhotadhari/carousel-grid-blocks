
/**
 * Internal dependencies
 */
import { DEFAULT_STATE } 	from '../constants';
import {
	toggleFullscreen,
	addFullscreenId,
}						 	from './uiReducer';

const uiReducerFrontend = ( state = { ui: { ...DEFAULT_STATE.ui } }, action ) => {
	switch ( action.type ) {

		case 'TOGGLE_FULLSCREEN':
			return toggleFullscreen( state, action );

		case 'ADD_FULLSCREEN_ID':
			return addFullscreenId( state, action );

	}

	return state;
}

export default uiReducerFrontend;