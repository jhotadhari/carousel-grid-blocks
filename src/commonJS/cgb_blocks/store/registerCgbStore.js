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
	resolvers,
}) => {

	if ( undefined !== cgbBlocks.store )
		return cgbBlocks.store;

	const store = registerStore( 'cgb-store', {
		reducer,
		actions,
		selectors,
		resolvers,
	} );

	let currentItemsSource = select( 'cgb-store' ).getItemsSource();
	let unsubscribe = null;
	const initItems = ( unsubscribe ) => {
		let previousItemsSource = currentItemsSource;
		currentItemsSource = select( 'cgb-store' ).getItemsSource();

		if ( ! isEqual( previousItemsSource, currentItemsSource ) ) {
			const { pullItemsFromArchive } = select( 'cgb-store' );
			const {
				pullItemsFromAttributes,
				ensureOneItem,
				ensureOneSelected,
			} = dispatch( 'cgb-store' );
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
					pullItemsFromArchive( currentItemsSource.key, currentItemsSource.options, Math.random() );
					break;
			};
		}

		if ( null !== unsubscribe && 'function' === typeof unsubscribe )
			unsubscribe();
	};

	unsubscribe = store.subscribe( initItems )

	return store;
};

export default registerCgbStore;
