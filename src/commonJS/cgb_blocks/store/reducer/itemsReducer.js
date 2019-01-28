/**
 * Internal dependencies
 */
import { DEFAULT_ITEM, DEFAULT_STATE } 	from '../constants';

export function updateItem( state = { items: [ ...DEFAULT_STATE.items ] }, action ) {
	const { items } = state;
	const { index, newItem } = action;
	const newItems = [...items];
	newItems[index] = newItem;
	return {
		...state,
		items: newItems,
	};
}

export function removeItem( state = { items: [ ...DEFAULT_STATE.items ] }, action ) {
	const { items } = state;
	const { index } = action;
	const newItems = [...items];
	if ( newItems.length > 0 )
		newItems.splice( index, 1 );
	return {
		...state,
		items: newItems,
	};
}

export function setSelected( state = { items: [ ...DEFAULT_STATE.items ] }, action ) {
	const { items } = state;
	const { newIndex } = action;
	const newItems = [...items].map( ( item, i ) => { return {
		...item,
		selected: i === newIndex,
	} } );
	return {
		...state,
		items: newItems,
	};
}

export function overwriteItems( state = { items: [ ...DEFAULT_STATE.items ] }, action ) {
	const { items } = state;
	const { newItems } = action;
	return {
		...state,
		items: newItems,
	};
}