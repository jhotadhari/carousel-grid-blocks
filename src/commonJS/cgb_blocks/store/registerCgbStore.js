
/**
 * WordPress dependencies
 */
const {
	registerStore,
} = wp.data;

/**
 * Internal dependencies
 */
import reducer 				from './reducer/reducer';
import * as actions 		from './actions';
import * as selectors 		from './selectors';
import * as resolvers 		from './resolvers';

const registerCgbStore = () => {

	if ( undefined !== cgbBlocks.store )
		return cgbBlocks.store;

	const store = registerStore( 'cgb-store', {
		reducer,
		actions,
		selectors,
		resolvers,
	} );

	cgbBlocks.store = store;

	return store;
};

export default registerCgbStore;
