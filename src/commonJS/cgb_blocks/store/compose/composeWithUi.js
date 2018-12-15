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

const composeWithUi = ( component, blockGroupId ) => compose( [
	withSelect( ( select ) => {
		const {
			isFullscreen,
			getActiveFullscreenId,
		} = select( blockGroupId );

		return {
			isFullscreen: isFullscreen(),
			activeFullscreenId: getActiveFullscreenId(),
		};
	} ),
	withDispatch( ( dispatch, ownProps ) => {

		const {
			toggleFullscreen,
			addFullscreenId,
			removeFullscreenId,
		} = dispatch( blockGroupId );

		return {
			toggleFullscreen,
			addFullscreenId,
			removeFullscreenId,
		};

	} ),
] )( component );

export default composeWithUi;
