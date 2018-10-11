/**
 * External dependencies
 */
import {
	pick,
	pluck,
	findWhere,
} from 'underscore';

const shortid = require('shortid');

import arrayMove from 'array-move';

import {
	get,
} from 'lodash';

/**
 * WordPress dependencies
 */
const {
	dispatch,
} = wp.data;

const {
	updateBlockAttributes,
} = dispatch( 'core/editor' );

/**
 * Internal dependencies
 */
import { DEFAULT_ITEM, DEFAULT_STATE } 	from '../constants';
import getCgbBlocks 					from '../helper/getCgbBlocks';
import {
	ensureOneItem,
	ensureOneSelected,
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
			key: shortid.generate(),
		};
	});

	return {
		...state,
		items: newItems,
	};
}

export function pushItemsToAttribues( state = { items: [ ...DEFAULT_STATE.items ] }, action ) {
	const { items } = state;
	const blocks = getCgbBlocks();
	[...blocks].map( block => updateBlockAttributes( block.clientId, { imageIds: pluck( [...items], 'id' ) } ) );
	return {
		...state,
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
		mediaSizes: media.sizes,
		fetched: false,	// need sizes, srcSet...
	};

	return {
		...state,
		items: newItems,
	};
}

export function addItems( state = { items: [ ...DEFAULT_STATE.items ] }, action ) {
	const { items } = state;
	const { medias } = action;
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
			mediaSizes: media.sizes,
			key: shortid.generate(),
		}
	});
	// empty current items, if it's just the one default image
	const currentItems = 1 === items.length && null === items[0]['id'] ? [] : [...items];
	return {
		...state,
		items: [
			...currentItems,
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

		case 'PUSH_ITEMS_TO_ATTRIBUES':
			return pushItemsToAttribues( state, action );

		case 'ENSURE_ONE_ITEM':
			return ensureOneItem( state, action );

		case 'ENSURE_ONE_SELECTED':
			return ensureOneSelected( state, action );

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