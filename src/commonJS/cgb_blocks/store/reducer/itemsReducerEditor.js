/**
 * External dependencies
 */
import {
	get,
	find,
	pick,
	startsWith,
	filter,
} from 'lodash';

const shortid = require('shortid');

import arrayMove from 'array-move';

/**
 * WordPress dependencies
 */
const {
	dispatch,
} = wp.data;

/**
 * Internal dependencies
 */
import getCgbBlocks						from '../../utils/getCgbBlocks';
import { DEFAULT_ITEM, DEFAULT_STATE }	from '../constants';
import {
	updateItem,
	setSelected,
	overwriteItems,
}						 				from './itemsReducer';

export function removeItem( state = { items: [ ...DEFAULT_STATE.items ] }, action ) {
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

export function pullItemsFromAttributes( state = { items: [ ...DEFAULT_STATE.items ] }, action ) {
	const { items } = state;
	const { blockGroupId } = action;
	const blocks = getCgbBlocks( blockGroupId );

	const imagesIds = [...blocks].reduce( ( acc, block ) => {
		if ( acc.length ) return acc;
		const blockImageIds = get( block, [ 'attributes', 'imageIds' ] );
		return blockImageIds ? blockImageIds : acc;
	}, [] );

	const newItems = [...imagesIds].map( ( id ) => {
		const item = find( items, { id: id } );
		return item ? item : {
			...DEFAULT_ITEM,
			id: id,
			key: shortid.generate(),
		};
	});

	return {
		...state,
		items: newItems,
	};
}

export function updateItemFromMedia( state = { items: [ ...DEFAULT_STATE.items ] }, action ) {
	const { items } = state;
	const { index, media } = action;
	const newItems = [...items];
	const newItem = ! media || ! media.url ? { ...DEFAULT_ITEM } : {
		...newItems[index],
		...pick( media, [
			'id',
			'title',
			'alt',
			'caption',
			'orientation'
		] ),
		src: media.url,
		postLink: media.url,
		postTitle: media.title,
		mediaSizes: media.sizes,
		fetched: false,	// need sizes, srcSet...
	};
	newItems[index] = newItem;
	return {
		...state,
		items: newItems,
	};
}

export function addItems( state = { items: [ ...DEFAULT_STATE.items ] }, action ) {
	const { items } = state;
	const { medias } = action;

	if ( undefined !== find( medias, media => startsWith( media.url, 'blob' ) ) )
		return state;

	const additionalItems = [...medias].map( media => {
		return {
			...DEFAULT_ITEM,
			...pick( media, [
				'id',
				'title',
				'alt',
				'caption',
				'orientation'
			] ),
			src: media.url,
			postLink: media.url,
			postTitle: media.title,
			mediaSizes: media.sizes,
			key: shortid.generate(),
		}
	});

	return {
		...state,
		items: [
			// ...currentItems,
			...items,
			...additionalItems,
		],
	};
}

export function moveItem( state = { items: [ ...DEFAULT_STATE.items ] }, action ) {
	const { items } = state;
	const { index, newIndex } = action;
	const newItems = arrayMove( [...items], index, newIndex );
	return {
		...state,
		items: [
			...newItems,
		],
	};
}

const itemsReducer = ( state = { items: [ ...DEFAULT_STATE.items ] }, action ) => {

	switch ( action.type ) {

		case 'PULL_ITEMS_FROM_ATTRIBUTES':
			return pullItemsFromAttributes( state, action );

		case 'OVERWRITE_ITEMS':
			return overwriteItems( state, action );

		case 'ADD_ITEMS':
			return addItems( state, action );

		case 'REMOVE_ITEM':
			return removeItem( state, action );

		case 'UPDATE_ITEM':
			return updateItem( state, action );

		case 'UPDATE_ITEM_FROM_MEDIA':
			return updateItemFromMedia( state, action );

		case 'SET_SELECTED':
			return setSelected( state, action );

		case 'MOVE_ITEM':
			return moveItem( state, action );

	}

	return state;
}

export default itemsReducer;