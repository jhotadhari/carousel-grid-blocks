
/**
 * WordPress dependencies
 */
const {
	combineReducers,
} = wp.data;

import itemsReducer			from './itemsReducerEditor';
import settingsReducer 		from './settingsReducerEditor';

const reducerEditor = combineReducers( {
	itemsReducer,
	settingsReducer,
} );

export default reducerEditor;