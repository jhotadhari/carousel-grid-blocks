/**
 * External dependencies
 */
import {
	set,
	// get,
} from 'lodash';

/**
 * Internal dependencies
 */
import composeWithItems 			from '../../cgb_blocks/store/compose/composeWithItemsEditor';
import composeWithSettings 			from '../../cgb_blocks/store/compose/composeWithSettingsEditor';
import PlaceholderChooseItems		from '../components/PlaceholderChooseItems.jsx';
import composeWithProps				from '../../cgb_blocks/store/compose/composeWithProps';

const setupPlaceholderChooseItems = blockGroupId => {

	let _PlaceholderChooseItems = PlaceholderChooseItems;

	_PlaceholderChooseItems = composeWithItems( _PlaceholderChooseItems, [
		'items',
		'selectedIndex',
		'addItems',
	], blockGroupId )

	_PlaceholderChooseItems = composeWithSettings( _PlaceholderChooseItems, [
		'itemsSource',
	], blockGroupId );

	_PlaceholderChooseItems = composeWithProps( { blockGroupId: blockGroupId } )( _PlaceholderChooseItems );

	set( cgbBlocks, ['components',blockGroupId,'PlaceholderChooseItems'], _PlaceholderChooseItems );

}

export default setupPlaceholderChooseItems;
