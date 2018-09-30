
/**
 * WordPress dependencies
 */
const {
	registerStore,
} = wp.data;

/**
 * Internal dependencies
 */
import reducerFrontend 		from './reducer/reducerFrontend';
import * as actionsFrontend from './actions/actionsFrontend';
import * as selectors 		from './selectors';
import * as resolvers 		from './resolvers';

const registerCgbStoreFrontend = () => {

	if ( undefined !== cgbBlocks.store )
		return cgbBlocks.store;

	const store = registerStore( 'cgb-store', {
		reducer: reducerFrontend,
		actions: actionsFrontend,
		selectors,
		resolvers,
	} );

	cgbBlocks.store = store;

	return store;
};

export default registerCgbStoreFrontend;
