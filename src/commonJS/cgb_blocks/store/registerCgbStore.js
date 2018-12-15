/**
 * External dependencies
 */
import concatenateReducers from 'redux-concatenate-reducers'
import {
	isEqual,
	get,
	set,
} from 'lodash';

/**
 * WordPress dependencies
 */
const {
	registerStore,
	select,
	dispatch,
} = wp.data;

const registerCgbStore = ( blockGroupId, {
	reducer,
	actions,
	selectors,
	controls,
	resolvers,
}) => {

	if ( undefined !== get( cgbBlocks, ['stores',blockGroupId] ) )
		return get( cgbBlocks, ['stores',blockGroupId] );

	const store = registerStore( blockGroupId, {
		reducer,
		actions,
		selectors,
		controls,
		resolvers,
	} );

	set( cgbBlocks, ['stores',blockGroupId], store );

	const {
		pullItemsFromArchive,
		getItemsSource,
		getItems,
		getSettings,
	} = select( blockGroupId );

	const {
		pullItemsFromAttributes,
	} = dispatch( blockGroupId );

	let currentItemsSource = getItemsSource();

	let initialPulled = false;
	const pullItems = () => {
		let previousItemsSource = currentItemsSource;
		currentItemsSource = getItemsSource();
		if ( ! initialPulled || ! isEqual( previousItemsSource, currentItemsSource ) ) {
			initialPulled = true;
			switch( currentItemsSource.key ) {
				case 'custom':
					pullItemsFromAttributes( blockGroupId );
					break;
				case 'archivePostType':
					pullItemsFromArchive( store.getState(), currentItemsSource.key, currentItemsSource.options, Math.random() );
					break;
			};

		}
	};

	store.subscribe( pullItems )

	return store;
};

export default registerCgbStore;
