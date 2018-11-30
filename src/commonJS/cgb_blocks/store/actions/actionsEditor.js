
import {
	fetchFromAPI,
	pullItemsFromAttributes,
	ensureOneItem,
	ensureOneSelected,
	setSelected,
	pullSettingsFromAttributes,
	updateItem,
	toggleFullscreen,
	addFullscreenId,
}	from './actions';

export{
	fetchFromAPI,
	pullItemsFromAttributes,
	ensureOneItem,
	ensureOneSelected,
	setSelected,
	pullSettingsFromAttributes,
	updateItem,
	toggleFullscreen,
	addFullscreenId,
}

export function addItems( medias ) {
	return {
		type: 'ADD_ITEMS',
		medias
	};
}

export function removeItem( index ) {
	return {
		type: 'REMOVE_ITEM',
		index,
	};
}

export function updateItemFromMedia( index, media ) {
	return {
		type: 'UPDATE_ITEM_FROM_MEDIA',
		index,
		media
	};
}

export function moveItem( index, newIndex ) {
	return {
		type: 'MOVE_ITEM',
		index,
		newIndex,
	};
}


/*
	settings
*/

export function pushSettingsToAttribues() {
	return {
		type: 'PUSH_SETTINGS_TO_ATTRIBUES',
	};
}

export function updateSetting( key, newValue ) {
	return {
		type: 'UPDATE_SETTING',
		key,
		newValue
	};
}
