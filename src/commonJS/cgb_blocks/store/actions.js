
/*
	items
*/
export function pullItemsFromAttributes() {
	return {
		type: 'PULL_ITEMS_FROM_ATTRIBUTES',
	};
}

export function pushItemsToAttribues() {
	return {
		type: 'PUSH_ITEMS_TO_ATTRIBUES',
	};
}

export function ensureOneItem() {
	return {
		type: 'ENSURE_ONE_ITEM',
	};
}

export function ensureOneSelected() {
	return {
		type: 'ENSURE_ONE_SELECTED',
	};
}

export function addItem() {
	return {
		type: 'ADD_ITEM',
	};
}

export function removeItem( index ) {
	return {
		type: 'REMOVE_ITEM',
		index,
	};
}

export function updateItem( index, newItem ) {
	return {
		type: 'UPDATE_ITEM',
		index,
		newItem
	};
}

export function updateItemFromMedia( index, media ) {
	return {
		type: 'UPDATE_ITEM_FROM_MEDIA',
		index,
		media
	};
}

export function setSelected( newIndex ) {
	return {
		type: 'SET_SELECTED',
		newIndex,
	};
}

/*
	settings
*/
export function pullSettingsFromAttributes( blocks ) {
	return {
		type: 'PULL_SETTINGS_FROM_ATTRIBUTES',
		blocks,
	};
}

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
