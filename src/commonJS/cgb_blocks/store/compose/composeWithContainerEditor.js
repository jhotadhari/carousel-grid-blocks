/**
 * External dependencies
 */
import concatenateReducers from 'redux-concatenate-reducers';
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
const composeWithContainerEditor = ( component ) => compose( [
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
			pushItemsToAttribues,
			pushSettingsToAttribues,
		} = dispatch( 'cgb-store' );

		return {
			pullItemsFromAttributes: concatenateReducers([	// items
				pullItemsFromAttributes,
				ensureOneItem,
				ensureOneSelected,
				pushItemsToAttribues,
			]),
			pullSettingsFromAttributes: concatenateReducers([	// settings
				pullSettingsFromAttributes,
				pushSettingsToAttribues,
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
			}

			render() {
				return (
					<WrappedComponent
						{ ...this.props }
						pullItemsFromAttributes={ this.pullItemsFromAttributes }
						pullSettingsFromAttributes={ this.pullSettingsFromAttributes }
					/>
				);
			}

		};
	}, 'withPull' )

] )( component );

export default composeWithContainerEditor;
