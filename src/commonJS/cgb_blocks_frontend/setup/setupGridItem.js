/**
 * External dependencies
 */
import {
	set,
} from 'lodash';

/**
 * Internal dependencies
 */
import composeWithItems 		from '../../cgb_blocks/store/compose/composeWithItemsFrontend';
import composeWithSettings 		from '../../cgb_blocks/store/compose/composeWithSettingsFrontend';
import GridItem			 		from '../../cgb_blocks/components/GridItem.jsx';

const setupGridItem = blockGroupId => {

	let _GridItem = GridItem;
	_GridItem = composeWithItems( _GridItem, [
		'items',
		'selectedIndex',
	], blockGroupId );


	_GridItem = composeWithSettings( _GridItem, [
		'transitionTime',
		'itemsSource',
	], blockGroupId );

	set( cgbBlocks, ['components',blockGroupId,'GridItem'], _GridItem );

}

export default setupGridItem;
