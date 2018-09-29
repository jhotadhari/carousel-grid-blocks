
/**
 * WordPress dependencies
 */
const {
	apiFetch,
} = wp;

import {
	updateItem,
	getBlocksFromEditor,
	updateStateBlocks,
} from './actions';

import { DEFAULT_ITEM } 	from './constants';
import getCgbBlocks 		from './helper/getCgbBlocks';


export function* fetchItem( state, index ) {
	const { items } = state.itemsReducer;
	const id = items[index]['id'];

	yield null === id || undefined === id ? items[index] : apiFetch( { path: '/wp/v2/media/' + id } ).then( ( response ) => {
		const newItem = {
			...DEFAULT_ITEM,
			...[items][index],
			id: response.id,
			url: response.source_url,
			title: response.title.rendered,
			alt: response.alt_text,
			caption: response.caption.rendered,
			sizes: response.media_details.sizes,
			orientation: response.media_details.width > response.media_details.height ? 'landscape' : 'portrait',
			fetched: true,
			selected: items[index]['selected'],
		};
		return updateItem( index, newItem );
	} );

};