/**
 * External dependencies
 */
import {
	set,
	get,
} from 'lodash';

/**
 * Internal dependencies
 */
import composeWithItems 		from '../../cgb_blocks/store/compose/composeWithItemsEditor';
import composeWithSettings 		from '../../cgb_blocks/store/compose/composeWithSettingsEditor';
import composeWithContainer		from '../../cgb_blocks/store/compose/composeWithContainerEditor';
import composeWithProps			from '../../cgb_blocks/store/compose/composeWithProps';
import Grid			 			from '../../cgb_blocks/components/Grid.jsx';

const setupGrid = blockGroupId => {

	let _Grid = Grid;

	_Grid = composeWithProps( { blockGroupId: blockGroupId } )( _Grid );

	_Grid = composeWithItems( _Grid, [
		'items',
		'photoSet',
		'moveItem',
	], blockGroupId )

	_Grid = composeWithContainer( _Grid, blockGroupId );

	_Grid = composeWithSettings( _Grid, [
		'transitionTime',
	], blockGroupId );

	_Grid = composeWithProps( { ItemComponent: get( cgbBlocks, ['components',blockGroupId,'Item'] ) } )( _Grid );

	set( cgbBlocks, ['components',blockGroupId,'Grid'], _Grid );

}

export default setupGrid;
