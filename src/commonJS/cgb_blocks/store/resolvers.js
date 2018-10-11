
const shortid = require('shortid');

import {
	pluck,
	filter,
	findWhere,
} from 'underscore';
/**
 * WordPress dependencies
 */
const {
	apiFetch,
	data: {
		select,
	}
} = wp;

import {
	updateItem,
	overwriteItems,
	// ensureOneItem,
	// ensureOneSelected,
} from './actions/actions';

import { DEFAULT_ITEM } 	from './constants';

export function* fetchItem( state, index, item ) {
	const { items } = state.itemsReducer;
	const { id } = item;

	let newItem = undefined;
	yield null === id || undefined === id ? items[index] : apiFetch( { path: '/wp/v2/media/' + id } ).then( ( response ) => {
		newItem = {
			...DEFAULT_ITEM,
			...item,
			// key: items[index]['key'] ? items[index]['key'] : shortid.generate(),
			key: item.key ? item.key : shortid.generate(),
			// selected: items[index]['selected'],
			selected: item.key.selected,
			fetched: true,
			// img atts
			src: response.source_url,
			srcSet: response.cgb_srcset,
			sizes: response.cgb_sizes,
			width: response.media_details.width,
			height: response.media_details.height,
			alt: response.alt_text,
			// media response
			id: response.id,
			orientation: response.media_details.width > response.media_details.height ? 'landscape' : 'portrait',
			title: response.title.rendered,
			caption: response.caption.rendered,
			mediaSizes: response.media_details.sizes,
		};
		return newItem;
	} );
	if ( undefined !== newItem ) {
		yield updateItem( index, newItem );
		yield newItem;
	}
};

export function* pullItemsFromArchive( state, key, options, ) {
	const { items } = state.itemsReducer;

	switch( key ) {
		case 'archivePostType':
			let baseURL;
			if ( undefined !== select( 'core' ) ) {
				let posttype = select( 'core' ).getEntity( 'postType', options.posttype );
				baseURL = posttype.baseURL;
			} else {
				baseURL = options.baseURL;
			}

			let newItemIds = undefined;
			const fetched = yield apiFetch( { path: baseURL } ).then( ( response ) => {
				newItemIds = pluck( response, 'featured_media').filter( id => 0 !== id );
				return newItemIds;
			} );

			if ( undefined !== newItemIds ) {
				const newItems =  [...newItemIds].map( ( id ) => {
					const item = findWhere( items, { id: id } );
					return item ? item : {
						...DEFAULT_ITEM,
						id: id,
						key: shortid.generate(),
					};
				});

				yield overwriteItems( newItems );
				yield newItems;
			}

			break;
	};

};