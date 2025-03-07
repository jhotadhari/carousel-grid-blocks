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
const composeWithContainer = ( component, blockGroupId ) => compose( [
	withSelect( ( select ) => {
		const {
			getItems,
			getSetting,
			pullItemsFromArchive,
		} = select( blockGroupId );

		return {
			items: getItems(),
			itemsSource: getSetting( 'itemsSource' ),
			pullItemsFromArchive: pullItemsFromArchive,
			blockGroupId: blockGroupId,
		};
	} ),
	withDispatch( ( dispatch, ownProps ) => {
		const {
			pullSettingsFromAttributes,
		} = dispatch( blockGroupId );
		return {
			pullSettingsFromAttributes: pullSettingsFromAttributes,	// settings
		};
	} ),

	createHigherOrderComponent( ( WrappedComponent ) => {
		return class extends Component {

			componentDidMount() {
				const {
					pullSettingsFromAttributes,
				} = this.props;
				pullSettingsFromAttributes( blockGroupId );
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

export default composeWithContainer;
