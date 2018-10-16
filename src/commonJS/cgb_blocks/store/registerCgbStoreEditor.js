/**
 * Internal dependencies
 */
import registerCgbStore 	from './registerCgbStore';
import reducerEditor 		from './reducer/reducerEditor';
import * as actionsEditor 	from './actions/actionsEditor';
import * as selectors 		from './selectors';
import * as resolvers 		from './resolvers';

const registerCgbStoreEditor = () => {
	registerCgbStore({
		reducer: reducerEditor,
		actions: actionsEditor,
		selectors,
		resolvers,
	});
};

export default registerCgbStoreEditor;
