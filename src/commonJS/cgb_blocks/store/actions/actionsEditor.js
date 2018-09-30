
import {
	pullItemsFromAttributes,
	ensureOneItem,
	ensureOneSelected,
	setSelected,
	pullSettingsFromAttributes,
	updateItem,
}	from './actions';

export{
	pullItemsFromAttributes,
	ensureOneItem,
	ensureOneSelected,
	setSelected,
	pullSettingsFromAttributes,
	updateItem,
}

export function pushItemsToAttribues() {
	return {
		type: 'PUSH_ITEMS_TO_ATTRIBUES',
	};
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
