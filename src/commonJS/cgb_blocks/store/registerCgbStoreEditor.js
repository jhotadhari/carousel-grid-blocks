/**
 * External dependencies
 */
import {
	isEqual,
} from 'lodash';

/**
 * WordPress dependencies
 */
const {
	select,
	dispatch,
} = wp.data;

const {
	updateBlockAttributes,
} = dispatch( 'core/editor' );

/**
 * Internal dependencies
 */
import getCgbBlocks 		from '../utils/getCgbBlocks';
import registerCgbStore 	from './registerCgbStore';
import reducerEditor 		from './reducer/reducerEditor';
import * as actionsEditor 	from './actions/actionsEditor';
import * as selectors 		from './selectors';
import * as resolvers 		from './resolvers';

const registerCgbStoreEditor = () => {
	const store = registerCgbStore({
		reducer: reducerEditor,
		actions: actionsEditor,
		selectors,
		resolvers,
	});

	const {
		getItems,
		getSettings,
		getItemsSource,
	} = select( 'cgb-store' );

	let currentItemIds = [...getItems()].map( item => item.id );
	let currentSettings = getSettings();

	const pushToAttributes = () => {
		let currentItemsSource = getItemsSource();

		if ( 'custom' === currentItemsSource.key ) {
			let previousItemIds = currentItemIds;
			currentItemIds = [...getItems()].map( item => item.id );
			if ( ! isEqual( previousItemIds, currentItemIds ) ) {
				[...getCgbBlocks()].map( block => updateBlockAttributes( block.clientId, {
					imageIds: currentItemIds,
				} ) );
			}
		}

		let previousSettings = currentSettings;
		currentSettings = getSettings();
		if ( ! isEqual( previousSettings, currentSettings ) ) {
			[...getCgbBlocks()].map( block => updateBlockAttributes( block.clientId, {
				settings: JSON.stringify( currentSettings ),
			} ) );
		}

	};

	store.subscribe( pushToAttributes )

};

export default registerCgbStoreEditor;
