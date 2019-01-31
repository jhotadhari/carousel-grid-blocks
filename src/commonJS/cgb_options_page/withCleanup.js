/**
 * WordPress dependencies
 */
const {
	compose,
} = wp.compose;

const {
	withSelect,
	withDispatch,
} = wp.data;

const withCleanup = ( component ) => compose( [
	withSelect( ( select ) => {
		const {
			getPostTypes,
			getEntityRecord,
			getEntityRecords,
			getEntity,
		} = select( 'core' );

		const {
			isResolving,
		} = select( 'core/data' );

		return {
			getPostTypes: getPostTypes,
			getEntityRecord: getEntityRecord,
			getEntityRecords: getEntityRecords,
			isResolving: isResolving,
			getEntity: getEntity,
		};
	} ),
	withDispatch( ( dispatch, ownProps ) => {
		const {
			saveEntityRecord,
		} = dispatch( 'core' );

		return {
			saveEntityRecord: saveEntityRecord,
		};

	} ),
] )( component );

export default withCleanup;