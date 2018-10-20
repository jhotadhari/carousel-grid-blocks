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

const composeWithItemsEditor = ( component, requested ) => compose( [
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
			addItems,
			removeItem,
			updateItem,
			ensureOneItem,
			ensureOneSelected,
			setSelected,
			updateItemFromMedia,
			moveItem,
		} = dispatch( 'cgb-store' );

		if ( ! requested ) return props;

		[...requested].map( ( prop ) => {

			switch( prop ){

				case 'addItems':
					props[prop] = addItems;
					break;

				case 'removeItem':
					props[prop] = concatenateReducers([
						removeItem,
						ensureOneItem,
						ensureOneSelected,
					]);
					break;

				case 'updateItem':
					props[prop] = concatenateReducers([
						updateItem,
					]);
					break;

				case 'updateItemFromMedia':
					props[prop] = concatenateReducers([
						updateItemFromMedia,
						ensureOneSelected,
					]);
					break;

				case 'setSelected':
					props[prop] = setSelected;
					break;

				case 'moveItem':
					props[prop] = concatenateReducers([
						moveItem,
						ensureOneSelected,
					]);
					break;

			};
		});

		return props;

	} ),
] )( component );

export default composeWithItemsEditor;