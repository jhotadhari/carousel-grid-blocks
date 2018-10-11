/**
 * External dependencies
 */
import {
	// pick,
	// pluck,
	findWhere,
} from 'underscore';

import {
	get,
	isEmpty,
} from 'lodash';

const shortid = require('shortid');

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { DEFAULT_ITEM, DEFAULT_STATE } 	from '../constants';
import {
	ensureOneItem,
	ensureOneSelected,
	updateItem,
	setSelected,
	overwriteItems,
}						 				from './itemsReducer';

export function pullItemsFromAttributes( state = { items: [ ...DEFAULT_STATE.items ] }, action ) {
	const { items } = state;
	const blockWrappers = document.getElementsByClassName( 'cgb-block-wrapper' );
	const imagesIds = [...blockWrappers].reduce( ( acc, blockWrapper ) => {
		if ( acc.length ) return acc;
			const serializedData = blockWrapper.getAttribute('data-cgb');
			let data = {};
			try {
				data = JSON.parse( serializedData );
			} catch(e) {
				data = {};
			}
			const blockImageIds = get( data, [ 'imageIds' ] );
			return undefined !== blockImageIds ? blockImageIds : acc;
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

const itemsReducerFrontend = ( state = { items: [ ...DEFAULT_STATE.items ] }, action ) => {
	switch ( action.type ) {

		case 'PULL_ITEMS_FROM_ATTRIBUTES':
			return pullItemsFromAttributes( state, action );

		case 'OVERWRITE_ITEMS':
			return overwriteItems( state, action );

		case 'ENSURE_ONE_ITEM':
			return ensureOneItem( state, action );

		case 'ENSURE_ONE_SELECTED':
			return ensureOneSelected( state, action );

		case 'UPDATE_ITEM':
			return updateItem( state, action );

		case 'SET_SELECTED':
			return setSelected( state, action );

	}

	return state;
}

export default itemsReducerFrontend;