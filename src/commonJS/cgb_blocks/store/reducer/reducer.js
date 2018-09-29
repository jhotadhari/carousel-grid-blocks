
/**
 * WordPress dependencies
 */
const {
	combineReducers,
} = wp.data;

import itemsReducer 	from './itemsReducer';
import settingsReducer 	from './settingsReducer';

const reducer = combineReducers( {
	itemsReducer,
	settingsReducer,
} );

export default reducer;