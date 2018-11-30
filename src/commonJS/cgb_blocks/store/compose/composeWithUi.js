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

const composeWithUi = ( component ) => compose( [
	withSelect( ( select ) => {
		const {
			isFullscreen,
			getActiveFullscreenId,
		} = select( 'cgb-store' );

		return {
			isFullscreen: isFullscreen(),
			activeFullscreenId: getActiveFullscreenId(),
		};
	} ),
	withDispatch( ( dispatch, ownProps ) => {

		const {
			toggleFullscreen,
			addFullscreenId,
		} = dispatch( 'cgb-store' );

		return {
			toggleFullscreen: toggleFullscreen,
			addFullscreenId: addFullscreenId,
		};

	} ),
] )( component );

export default composeWithUi;
