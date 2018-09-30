
/**
 * WordPress dependencies
 */
const {
	registerStore,
} = wp.data;

/**
 * Internal dependencies
 */
import reducerEditor 		from './reducer/reducerEditor';
import * as actionsEditor 	from './actions/actionsEditor';
import * as selectors 		from './selectors';
import * as resolvers 		from './resolvers';

const registerCgbStoreEditor = () => {

	if ( undefined !== cgbBlocks.store )
		return cgbBlocks.store;

	const store = registerStore( 'cgb-store', {
		reducer: reducerEditor,
		actions: actionsEditor,
		selectors,
		resolvers,
	} );

	cgbBlocks.store = store;

	return store;
};

export default registerCgbStoreEditor;
