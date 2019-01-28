

export function fetchFromAPI( path ) {
	return {
		type: 'FETCH_FROM_API',
		path,
	};
}

/*
	items
*/
export function pullItemsFromAttributes( blockGroupId ) {
	return {
		type: 'PULL_ITEMS_FROM_ATTRIBUTES',
		blockGroupId,
	};
}

export function overwriteItems( newItems ) {
	return {
		type: 'OVERWRITE_ITEMS',
		newItems,
	};
}

export function updateItem( index, newItem ) {
	return {
		type: 'UPDATE_ITEM',
		index,
		newItem
	};
}

export function removeItem( index ) {
	return {
		type: 'REMOVE_ITEM',
		index,
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

// export function pullSettingsFromAttributes( blocks ) {
export function pullSettingsFromAttributes( blockGroupId ) {
	return {
		type: 'PULL_SETTINGS_FROM_ATTRIBUTES',
		// blocks,
		blockGroupId,
	};
}

/*
	ui
*/
export function toggleFullscreen( isFull ) {
	return {
		type: 'TOGGLE_FULLSCREEN',
		isFull,
	};
}

export function addFullscreenId( newId ) {
	return {
		type: 'ADD_FULLSCREEN_ID',
		newId,
	};
}

export function removeFullscreenId( removeId ) {
	return {
		type: 'REMOVE_FULLSCREEN_ID',
		removeId,
	};
}
