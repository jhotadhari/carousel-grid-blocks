
/**
 * WordPress dependencies
 */
const {
	combineReducers,
} = wp.data;

import itemsReducer 		from './itemsReducerFrontend';
import settingsReducer	 	from './settingsReducerFrontend';
import uiReducer	 		from './uiReducerFrontend';

const reducerFronend = combineReducers( {
	itemsReducer,
	settingsReducer,
	uiReducer,
} );

export default reducerFronend;