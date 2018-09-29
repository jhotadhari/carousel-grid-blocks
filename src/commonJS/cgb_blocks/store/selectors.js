/**
 * Internal dependencies
 */

import findSelectedIndex from './helper/findSelectedIndex';

// items
export function getItems( state ) {
	return state.itemsReducer.items;
};

export function fetchItem( state, index ) {
	return [...state.itemsReducer.items][index];
};

export function getSelectedIndex( state ) {
	const { items } = state.itemsReducer;
	const selectedIndex = findSelectedIndex( items );
	return -1 === selectedIndex ? 0 : selectedIndex;
};

// settings
export function getSetting( state, key ) {
	return state.settingsReducer.settings[key];
};


