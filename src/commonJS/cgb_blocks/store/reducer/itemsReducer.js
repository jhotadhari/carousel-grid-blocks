
const shortid = require('shortid');


/**
 * Internal dependencies
 */
import { DEFAULT_ITEM, DEFAULT_STATE } 	from '../constants';
import findSelectedIndex 				from '../../utils/findSelectedIndex';

export function ensureOneItem( state = { items: [ ...DEFAULT_STATE.items ] }, action ) {
	const { items } = state;
	const newItems = items.length ? [...items] : [ {
		...DEFAULT_ITEM,
		key: shortid.generate(),
	} ];
	return {
		...state,
		items: newItems,
	};
}

export function ensureOneSelected( state = { items: [ ...DEFAULT_STATE.items ] }, action ) {
	const { items } = state;
	const newItems = [...items];
	if ( -1 === findSelectedIndex( newItems ) )
		newItems[0]['selected'] = true;
	return {
		...state,
		items: newItems,
	};
}

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

// export function overwriteItems( state = { items: [ ...DEFAULT_STATE.items ] }, action ) {
export function overwriteItems( state = { items: [ ...DEFAULT_STATE.items ] }, action ) {
	const { items } = state;
	const { newItems } = action;
	return {
		...state,
		items: newItems,
	};
}