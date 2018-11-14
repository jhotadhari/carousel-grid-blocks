
const shortid = require('shortid');

import {
	get,
	find,
	isEqual,
	filter,
} from 'lodash';

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
			key: item.key ? item.key : shortid.generate(),
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
			const { url } = options;

			let responseItems = undefined;
			const fetched = yield apiFetch( { path: url } ).then( ( response ) => {
				responseItems = [...response].map( responseItem => { return {
					featured_media: responseItem.featured_media,
					title: responseItem.title.rendered,
					link: responseItem.link,
					excerpt: get( responseItem ['excerpt','rendered'], '' ),
				} } ).filter( ( { featured_media } ) => 0 !== featured_media );
				return responseItems;
			} );

			if ( undefined !== responseItems ) {
				const newItems =  [...responseItems].map( ( {
					featured_media,
					link,
					title,
					excerpt,
				} ) => {
					const item = find( items, { id: featured_media } );
					return item ? item : {
						...DEFAULT_ITEM,
						id: featured_media,
						postLink: link,
						postTitle: title,
						postExcerpt: excerpt,
						key: shortid.generate(),
					};
				});
				yield overwriteItems( newItems );
				yield newItems;
			}

			break;
	};

};