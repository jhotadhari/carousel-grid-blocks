
/**
 * Internal dependencies
 */
import { DEFAULT_STATE } 	from '../constants';
import {
	toggleFullscreen,
	addFullscreenId,
	removeFullscreenId,
}						 	from './uiReducer';

const uiReducerFrontend = ( state = { ui: { ...DEFAULT_STATE.ui } }, action ) => {
	switch ( action.type ) {

		case 'TOGGLE_FULLSCREEN':
			return toggleFullscreen( state, action );

		case 'ADD_FULLSCREEN_ID':
			return addFullscreenId( state, action );

		case 'REMOVE_FULLSCREEN_ID':
			return removeFullscreenId( state, action );

	}

	return state;
}

export default uiReducerFrontend;