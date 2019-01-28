/**
 * External dependencies
 */
import {
	find,
	get,
	isEmpty,
} from 'lodash';

const shortid = require('shortid');

/**
 * Internal dependencies
 */
import { DEFAULT_ITEM, DEFAULT_STATE } 	from '../constants';
import {
	updateItem,
	removeItem,
	setSelected,
	overwriteItems,
}						 				from './itemsReducer';
import parseSerialized					from '../../utils/parseSerialized';

export function pullItemsFromAttributes( state = { items: [ ...DEFAULT_STATE.items ] }, action ) {
	const { items } = state;
	const { blockGroupId } = action;
	const blockWrappers = document.getElementsByClassName( 'cgb-block-wrapper' );
	const imagesIds = [...blockWrappers].reduce( ( acc, blockWrapper ) => {
		if ( acc.length ) return acc;
		const data = parseSerialized( blockWrapper.getAttribute('data-cgb') );
		return data.blockGroupId === blockGroupId ? get( data, [ 'imageIds' ], acc ) : acc;
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

const itemsReducerFrontend = ( state = { items: [ ...DEFAULT_STATE.items ] }, action ) => {
	switch ( action.type ) {

		case 'PULL_ITEMS_FROM_ATTRIBUTES':
			return pullItemsFromAttributes( state, action );

		case 'OVERWRITE_ITEMS':
			return overwriteItems( state, action );

		case 'UPDATE_ITEM':
			return updateItem( state, action );

		case 'REMOVE_ITEM':
			return removeItem( state, action );

		case 'SET_SELECTED':
			return setSelected( state, action );

	}

	return state;
}

export default itemsReducerFrontend;