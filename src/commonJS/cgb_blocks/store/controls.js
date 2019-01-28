
/**
 * WordPress dependencies
 */
const {
	apiFetch,
} = wp;

const controls = {
	FETCH_FROM_API( action ) {
		return apiFetch( { path: action.path } ).catch( error => error );
		// return apiFetch( { path: action.path } ).catch( error => {
		// 	error.postId = action.path.split( '/' ).slice(-1)[0];
		// 	return error;
		// } );
	},
};

export default controls;
