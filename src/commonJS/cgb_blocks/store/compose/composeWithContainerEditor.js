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
		const {
			getItems,
			getSetting,
			pullItemsFromArchive,
		} = select( 'cgb-store' );
		return {
			items: getItems(),
			itemsSource: getSetting( 'itemsSource' ),
			pullItemsFromArchive: pullItemsFromArchive,
		};
	} ),
	withDispatch( ( dispatch, ownProps ) => {
		const {
			pullSettingsFromAttributes,
		} = dispatch( 'cgb-store' );
		return {
			pullSettingsFromAttributes,
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
					/>
				);
			}

		};
	}, 'withPullSettings' )

] )( component );

export default composeWithContainerEditor;
