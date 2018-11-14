/**
 * Internal dependencies
 */
import registerCgbStore 	from './registerCgbStore';
import reducerFrontend 		from './reducer/reducerFrontend';
import * as actionsFrontend from './actions/actionsFrontend';
import * as selectors 		from './selectors';
import * as resolvers 		from './resolvers';
import controls 			from './controls';

const registerCgbStoreFrontend = () => {
	registerCgbStore({
		reducer: reducerFrontend,
		actions: actionsFrontend,
		selectors,
		controls,
		resolvers,
	});
};

export default registerCgbStoreFrontend;
