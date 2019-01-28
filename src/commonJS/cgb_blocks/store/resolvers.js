
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
	select,
} = wp.data;

import {
	updateItem,
	removeItem,
	overwriteItems,
	fetchFromAPI,
} from './actions/actions';

import { DEFAULT_ITEM } 	from './constants';

export function* fetchItem( index, item ) {
	const { id } = item;

	const fetched = yield fetchFromAPI( '/wp/v2/media/' + id );

	if ( 'rest_post_invalid_id' === get( fetched, ['code'] ) ) {
		yield removeItem( index );
	} else {
		const newItem = {
			...DEFAULT_ITEM,
			...item,
			key: item.key ? item.key : shortid.generate(),
			selected: item.key.selected,
			fetched: true,

			// img atts
			src: fetched.source_url,
			srcSet: fetched.cgb_srcset,
			sizes: fetched.cgb_sizes,
			width: fetched.media_details.width,
			height: fetched.media_details.height,
			alt: fetched.alt_text,
			// media fetched
			id: fetched.id,
			orientation: fetched.media_details.width > fetched.media_details.height ? 'landscape' : 'portrait',
			title: fetched.title.rendered,
			caption: fetched.caption.rendered,
			mediaSizes: fetched.media_details.sizes,
		};

		yield updateItem( index, newItem );
		return newItem;
	}
};

export function* pullItemsFromArchive( state, key, options, random ) {
	const { items } = state.itemsReducer;

	switch( key ) {
		case 'archivePostType':
			const { url } = options;

            const fetched = yield fetchFromAPI( url );

			const fetchedItems = [...fetched].map( fetchedItem => { return {
				featured_media: fetchedItem.featured_media,
				title: fetchedItem.title.rendered,
				link: fetchedItem.link,
				excerpt: get( fetchedItem ['excerpt','rendered'], '' ),
			} } ).filter( ( { featured_media } ) => 0 !== featured_media );

			const newItems =  [...fetchedItems].map( ( {
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

			break;
	};

};
