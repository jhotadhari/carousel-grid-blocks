
/**
 * External dependencies
 */
import concatenateReducers from 'redux-concatenate-reducers'

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
} = wp.data;

// pull state from attributes, overwrites store state
const composeWithContainer = ( component ) => compose( [
	withDispatch( ( dispatch, ownProps ) => {

		const props = {};

		const {
			pullItemsFromAttributes,
			pushItemsToAttribues,
			pullSettingsFromAttributes,
			pushSettingsToAttribues,
			ensureOneItem,
			ensureOneSelected,
		} = dispatch( 'cgb-store' );

		return {
			pullItemsFromAttributes: concatenateReducers([	// items
				pullItemsFromAttributes,
				ensureOneItem,
				ensureOneSelected,
			]),
			pullSettingsFromAttributes,						// settings
		};

	} ),

	createHigherOrderComponent( ( WrappedComponent ) => {

		return class extends Component {

			componentDidMount() {
				const {
					pullItemsFromAttributes,
					pullSettingsFromAttributes,
				} = this.props;

				pullItemsFromAttributes();
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

export default composeWithContainer;
