/**
 * External dependencies
 */
import concatenateReducers from 'redux-concatenate-reducers'
import {
	isEqual,
} from 'underscore';

/**
 * WordPress dependencies
 */
const {
	Component,
} = wp.element;

const {
	compose,
	createHigherOrderComponent,
} = wp.compose;

const {
	withDispatch,
	withSelect,
} = wp.data;

// pull state from attributes, overwrites store state
const composeWithContainerFrontend = ( component ) => compose( [
	withSelect( ( select ) => {
		const props = {};

		const {
			getItems,
			getSetting,
			pullItemsFromArchive,
		} = select( 'cgb-store' );

		const itemsSource = getSetting( 'itemsSource' );
		props.items = getItems();
		props.itemsSource = itemsSource;
		props.pullItemsFromArchive = pullItemsFromArchive;

		return props;
	} ),
	withDispatch( ( dispatch, ownProps ) => {

		const props = {};

		const {
			pullItemsFromAttributes,
			pullSettingsFromAttributes,
			ensureOneItem,
			ensureOneSelected,
		} = dispatch( 'cgb-store' );

		return {
			pullItemsFromAttributes: concatenateReducers([	// items
				pullItemsFromAttributes,
				ensureOneItem,
				ensureOneSelected,
			]),
			// pullSettingsFromAttributes: pullSettingsFromAttributes,	// settings
			pullSettingsFromAttributes: concatenateReducers([	// items
				pullSettingsFromAttributes,
				// ensureOneItem,
				// ensureOneSelected,
			]),
		};

	} ),

	createHigherOrderComponent( ( WrappedComponent ) => {

		return class extends Component {

			componentDidMount() {
				const {
					pullSettingsFromAttributes,
				} = this.props;

				pullSettingsFromAttributes();
				this.pullItems();
			}

			componentDidUpdate( prevProps ) {
				if ( undefined === this.props.itemsSource || ! isEqual( this.props.itemsSource, prevProps.itemsSource ) ){
					this.pullItems();
				}
			}

			pullItems(){
				const {
					pullItemsFromAttributes,
					pullItemsFromArchive,
					pullSettingsFromAttributes,
					itemsSource,
				} = this.props;

				switch( itemsSource.key ) {
					case 'custom':
						pullItemsFromAttributes();
						break;
					case 'archivePostType':
						pullItemsFromArchive( itemsSource.key, itemsSource.options, Math.random() );
						break;
				};


			}

			render() {
				return (
					<WrappedComponent
						{ ...this.props }
						// pullItemsFromAttributes={ this.pullItemsFromAttributes }
						// pullSettingsFromAttributes={ this.pullSettingsFromAttributes }
					/>
				);
			}

		};
	}, 'withPull' )

] )( component );

export default composeWithContainerFrontend;
