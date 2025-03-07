
/**
 * WordPress dependencies
 */
const {
	combineReducers,
} = wp.data;

import itemsReducer			from './itemsReducerEditor';
import settingsReducer 		from './settingsReducerEditor';
import uiReducer 			from './uiReducerEditor';

const reducerEditor = combineReducers( {
	itemsReducer,
	settingsReducer,
	uiReducer,
} );

export default reducerEditor;