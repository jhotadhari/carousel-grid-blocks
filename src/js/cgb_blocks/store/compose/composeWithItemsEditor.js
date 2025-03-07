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

const composeWithItemsEditor = ( component, requested, blockGroupId ) => compose( [
	withSelect( ( select ) => {
		const props = {};

		if ( ! requested ) return props;

		const {
			getItems,
			getSelectedIndex,
			getIndexByKey,
			fetchItem,
		} = select( blockGroupId );

		[...requested].map( ( prop ) => {
			switch( prop ){
				case 'items':
					props[prop] = getItems();
					break;

				case 'selectedIndex':
					props[prop] = getSelectedIndex();
					break;

				case 'getIndexByKey':
					props[prop] = getIndexByKey;
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
			setSelected,
			updateItemFromMedia,
			moveItem,
		} = dispatch( blockGroupId );

		if ( ! requested ) return props;

		[...requested].map( ( prop ) => {

			switch( prop ){

				case 'addItems':
					props[prop] = addItems;
					break;

				case 'removeItem':
					props[prop] = removeItem;
					break;

				case 'updateItem':
					props[prop] = updateItem;
					break;

				case 'updateItemFromMedia':
					props[prop] = updateItemFromMedia;
					break;

				case 'setSelected':
					props[prop] = setSelected;
					break;

				case 'moveItem':
					props[prop] = moveItem;
					break;

			};
		});

		return props;

	} ),
] )( component );

export default composeWithItemsEditor;