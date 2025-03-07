/**
 * External dependencies
 */
import {
	get,
	findIndex,
} from 'lodash';

/**
 * Internal dependencies
 */

import findSelectedIndex from '../utils/findSelectedIndex';

// items fetch
export function pullItemsFromArchive( state, key, options, random ) {
	return state.itemsReducer.items;
}
export function fetchItem( items, index, item ) {
	return item;
};

// items
export function getItems( state ) {
	return state.itemsReducer.items;
};

export function getSelectedIndex( state ) {
	const { items } = state.itemsReducer;
	const selectedIndex = findSelectedIndex( items );
	return -1 === selectedIndex ? 0 : selectedIndex;
};

export function getIndexByKey( state, key ) {
	const { items } = state.itemsReducer;
	return findIndex( items , ( item ) => key === item.key );
};

// settings
export function getSettings( state ) {
	return state.settingsReducer.settings;
};

export function getSetting( state, key ) {
	return state.settingsReducer.settings[key];
};

export function getItemsSource( state ) {
	return getSetting( state, 'itemsSource' );
};

// ui
export function isFullscreen( state ) {
	return state.uiReducer.ui.isFullscreen;
};

export function getActiveFullscreenId( state ) {
	const length = state.uiReducer.ui.fullscreenIds.length;
	return length ? state.uiReducer.ui.fullscreenIds[length-1] : false;
};
