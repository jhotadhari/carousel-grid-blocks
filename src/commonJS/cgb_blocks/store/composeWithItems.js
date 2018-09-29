/**
 * External dependencies
 */
import concatenateReducers from 'redux-concatenate-reducers'

/**
 * WordPress dependencies
 */
const {
	compose
} = wp.compose;

const {
	withSelect,
	withDispatch,
} = wp.data;

const composeWithItems = ( component, requested ) => compose( [
	withSelect( ( select ) => {
		const props = {};

		if ( ! requested ) return props;

		const {
			getItems,
			getSelectedIndex,
			fetchItem,
		} = select( 'cgb-store' );

		[...requested].map( ( prop ) => {
			switch( prop ){
				case 'items':
					props[prop] = getItems();
					break;

				case 'selectedIndex':
					props[prop] = getSelectedIndex();
					break;

				case 'fetchItem':
					props[prop] = fetchItem;
					break;

			};
		});

		return props;
	} ),
	withDispatch( ( dispatch, ownProps ) => {

		const props = {};

		const {
			// items
			pushItemsToAttribues,
			addItem,
			removeItem,
			updateItem,
			ensureOneItem,
			ensureOneSelected,
			setSelected,
			updateItemFromMedia,
		} = dispatch( 'cgb-store' );


		if ( ! requested ) return props;

		[...requested].map( ( prop ) => {

			switch( prop ){

				case 'addItem':
					props[prop] = concatenateReducers([
						addItem,
						pushItemsToAttribues,
					]);
					break;

				case 'removeItem':
					props[prop] = concatenateReducers([
						removeItem,
						ensureOneItem,
						ensureOneSelected,
						pushItemsToAttribues,
					]);
					break;

				case 'updateItem':
					props[prop] = concatenateReducers([
						updateItem,
						pushItemsToAttribues,
					]);
					break;

				case 'updateItemFromMedia':
					props[prop] = concatenateReducers([
						updateItemFromMedia,
						ensureOneSelected,
						pushItemsToAttribues,
					]);
					break;

				case 'setSelected':
					props[prop] = setSelected;
					break;

			};
		});

		return props;

	} ),
] )( component );

export default composeWithItems;