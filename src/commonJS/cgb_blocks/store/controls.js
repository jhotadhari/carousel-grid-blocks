
/**
 * WordPress dependencies
 */
const {
	apiFetch,
} = wp;

const controls = {
	FETCH_FROM_API( action ) {
		return apiFetch( { path: action.path } );
	},
};

export default controls;
