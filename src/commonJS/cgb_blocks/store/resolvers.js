

const shortid = require('shortid');
/**
 * WordPress dependencies
 */
const {
	apiFetch,
} = wp;

import {
	updateItem,
} from './actions/actions';

import { DEFAULT_ITEM } 	from './constants';

export function* fetchItem( state, index ) {
	const { items } = state.itemsReducer;
	const id = items[index]['id'];

	yield null === id || undefined === id ? items[index] : apiFetch( { path: '/wp/v2/media/' + id } ).then( ( response ) => {
		const newItem = {
			...DEFAULT_ITEM,
			...[items][index],
			key: items[index]['key'] ? items[index]['key'] : shortid.generate(),
			selected: items[index]['selected'],
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
		return updateItem( index, newItem );
	} );

};