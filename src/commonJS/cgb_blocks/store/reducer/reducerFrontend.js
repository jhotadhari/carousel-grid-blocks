
/**
 * WordPress dependencies
 */
const {
	combineReducers,
} = wp.data;

import itemsReducer 		from './itemsReducerFrontend';
import settingsReducer	 	from './settingsReducerFrontend';

const reducerFronend = combineReducers( {
	itemsReducer,
	settingsReducer,
} );

export default reducerFronend;