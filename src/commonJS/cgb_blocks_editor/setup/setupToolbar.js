/**
 * External dependencies
 */
import {
	set,
} from 'lodash';

/**
 * Internal dependencies
 */
import composeWithItems 		from '../../cgb_blocks/store/compose/composeWithItemsEditor';
import composeWithSettings 		from '../../cgb_blocks/store/compose/composeWithSettingsEditor';
import Toolbar			 		from '../components/Toolbar.jsx';

const setupToolbar = blockGroupId => {

	let _Toolbar = Toolbar;
	_Toolbar = composeWithItems( Toolbar, [
		'addItems',
	], blockGroupId );

	_Toolbar = composeWithSettings( _Toolbar, [
		'itemsSource',
	], blockGroupId );

	set( cgbBlocks, ['components',blockGroupId,'Toolbar'], _Toolbar );


}

export default setupToolbar;
