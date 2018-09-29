/**
 * External dependencies
 */
import {
	pick,
	pluck,
	findWhere,
} from 'underscore';

import {
	get,
} from 'lodash';

/**
 * WordPress dependencies
 */
const {
	select,
	dispatch,
} = wp.data;

const {
	getBlock,
} = select( 'core/editor' );

const {
	updateBlockAttributes,
} = dispatch( 'core/editor' );

/**
 * Internal dependencies
 */
import { DEFAULT_ITEM, DEFAULT_STATE } 	from '../constants';
import getCgbBlocks 					from '../helper/getCgbBlocks';
import findSelectedIndex 				from '../helper/findSelectedIndex';

export function pullItemsFromAttributes( state = DEFAULT_STATE, action ) {
	const { items } = state;
	const blocks = getCgbBlocks();

	const imagesIds = [...blocks].reduce( ( acc, block ) => {
		if ( acc.length ) return acc;
		const blockImageIds = get( block, [ 'attributes', 'imageIds' ] );
		return blockImageIds ? blockImageIds : acc;
	}, [] );

	const newItems = [...imagesIds].map( ( id ) => {
		const item = findWhere( items, { id: id } );
		return item ? item : {
			...DEFAULT_ITEM,
			id: id,
		};
	});

	return {
		...state,
		items: newItems,
	};
}

export function pushItemsToAttribues( state = DEFAULT_STATE, action ) {
	const { items } = state;
	const blocks = getCgbBlocks();
	[...blocks].map( block => updateBlockAttributes( block.clientId, { imageIds: pluck( [...items], 'id' ) } ) );
	return {
		...state,
	};
}

export function ensureOneItem( state = DEFAULT_STATE, action ) {
	const { items } = state;
	const newItems = items.length ? [...items] : [ {
		...DEFAULT_ITEM,
	} ];
	return {
		...state,
		items: newItems,
	};
}

export function ensureOneSelected( state = DEFAULT_STATE, action ) {
	const { items } = state;
	const newItems = [...items];
	if ( -1 === findSelectedIndex( newItems ) )
		newItems[0]['selected'] = true;
	return {
		...state,
		items: newItems,
	};
}

export function addItem( state = DEFAULT_STATE, action ) {
	const { items } = state;
	return {
		...state,
		items: [
			...items,
			{ ...DEFAULT_ITEM }
		],
	};
}

export function removeItem( state = DEFAULT_STATE, action ) {
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

export function updateItem( state = DEFAULT_STATE, action ) {
	const { items } = state;
	const { index, newItem } = action;
	const newItems = [...items];
	newItems[index] = newItem;
	return {
		...state,
		items: newItems,
	};
}

export function updateItemFromMedia( state = DEFAULT_STATE, action ) {
	const { items } = state;
	const { index, media } = action;
	const newItems = [...items];
	const newItem = ! media || ! media.url ? { ...DEFAULT_ITEM } : {
		...newItems[index],
		...pick( media, [
			'id',
			'url',
			'title',
			'alt',
			'caption',
			'sizes',
			'orientation'
		] ),
		fetched: true,
	};
	newItems[index] = newItem;
	return {
		...state,
		items: newItems,
	};
}

export function setSelected( state = DEFAULT_STATE, action ) {
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

const itemsReducer = ( state = DEFAULT_STATE, action ) => {

	switch ( action.type ) {

		case 'PULL_ITEMS_FROM_ATTRIBUTES':
			return pullItemsFromAttributes( state, action );

		case 'PUSH_ITEMS_TO_ATTRIBUES':
			return pushItemsToAttribues( state, action );

		case 'ENSURE_ONE_ITEM':
			return ensureOneItem( state, action );

		case 'ENSURE_ONE_SELECTED':
			return ensureOneSelected( state, action );

		case 'ADD_ITEM':
			return addItem( state, action );

		case 'REMOVE_ITEM':
			return removeItem( state, action );

		case 'UPDATE_ITEM':
			return updateItem( state, action );

		case 'UPDATE_ITEM_FROM_MEDIA':
			return updateItemFromMedia( state, action );

		case 'SET_SELECTED':
			return setSelected( state, action );

	}

	return state;
}

export default itemsReducer;