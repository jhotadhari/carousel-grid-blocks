/**
 * External dependencies
 */
import concatenateReducers from 'redux-concatenate-reducers'
import {
	isEqual,
} from 'lodash';

/**
 * WordPress dependencies
 */
const {
	registerStore,
	select,
	dispatch,
} = wp.data;

const registerCgbStore = ( {
	reducer,
	actions,
	selectors,
	controls,
	resolvers,
}) => {

	if ( undefined !== cgbBlocks.store )
		return cgbBlocks.store;

	const store = registerStore( 'cgb-store', {
		reducer,
		actions,
		selectors,
		controls,
		resolvers,
	} );

	cgbBlocks.store = store;

	const {
		pullItemsFromArchive,
		getItemsSource,
		getItems,
		getSettings,
	} = select( 'cgb-store' );

	const {
		pullItemsFromAttributes,
		ensureOneItem,
		ensureOneSelected,
	} = dispatch( 'cgb-store' );

	let currentItemsSource = getItemsSource();

	let initialPulled = false;
	const pullItems = () => {
		let previousItemsSource = currentItemsSource;
		currentItemsSource = getItemsSource();
		if ( ! initialPulled || ! isEqual( previousItemsSource, currentItemsSource ) ) {
			initialPulled = true;
			switch( currentItemsSource.key ) {
				case 'custom':
					const _pullItemsFromAttributes =  concatenateReducers([
						pullItemsFromAttributes,
						ensureOneItem,
						ensureOneSelected,
					]);
					_pullItemsFromAttributes();
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
