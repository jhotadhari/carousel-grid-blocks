/**
 * Internal dependencies
 */
import registerCgbStore 	from './registerCgbStore';
import reducer 		from './reducer/reducerFrontend';
import * as actions from './actions/actionsFrontend';
import * as selectors 		from './selectors';
import * as resolvers 		from './resolvers';
import controls 			from './controls';

const registerCgbStoreFrontend = blockGroupId => {
	const store = registerCgbStore( blockGroupId, {
		reducer,
		actions,
		selectors,
		controls,
		resolvers,
	});
};

export default registerCgbStoreFrontend;
