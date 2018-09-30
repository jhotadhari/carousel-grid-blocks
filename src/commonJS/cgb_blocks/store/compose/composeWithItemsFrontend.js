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

const composeWithItemsFrontend = ( component, requested ) => compose( [
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
			updateItem,
			ensureOneItem,
			ensureOneSelected,
			setSelected,
		} = dispatch( 'cgb-store' );


		if ( ! requested ) return props;

		[...requested].map( ( prop ) => {

			switch( prop ){

				case 'updateItem':
					props[prop] = updateItem
					break;

				case 'setSelected':
					props[prop] = setSelected;
					break;

			};
		});

		return props;

	} ),
] )( component );

export default composeWithItemsFrontend;