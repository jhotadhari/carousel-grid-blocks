
/*
	items
*/
export function pullItemsFromAttributes() {
	return {
		type: 'PULL_ITEMS_FROM_ATTRIBUTES',
	};
}

export function overwriteItems( newItems ) {
	return {
		type: 'OVERWRITE_ITEMS',
		newItems,
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


export function updateItem( index, newItem ) {
	return {
		type: 'UPDATE_ITEM',
		index,
		newItem
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
