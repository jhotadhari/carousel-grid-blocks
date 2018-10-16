/**
 * External dependencies
 */
import {
	get,
} from 'lodash';


/**
 * Internal dependencies
 */

import findSelectedIndex from './helper/findSelectedIndex';


const itemsToPhotoSet = ( items ) => {
	return items ? [...items].map( item => {
		return {
			src: item.src,
			width: item.width,
			height: item.height,
			key: item.key,
			// srcSet: item.srcSet,
			// sizes: item.sizes,
			// alt: item.alt,
		}
	} ) : [];
};


// items
export function pullItemsFromArchive( state, key, options, random ) {
	return state.itemsReducer.items;
}

export function getItems( state ) {
	return state.itemsReducer.items;
};

export function getPhotoSet( state ) {
	const photoSet = itemsToPhotoSet( [...state.itemsReducer.items] )
	return photoSet;
};

export function fetchItem( state, index, item ) {
	return item;
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

export function getItemsSource( state ) {
	return getSetting( state, 'itemsSource' );
};


