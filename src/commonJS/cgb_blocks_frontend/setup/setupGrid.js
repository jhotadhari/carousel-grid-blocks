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
import composeWithItems 		from '../../cgb_blocks/store/compose/composeWithItemsFrontend';
import composeWithSettings 		from '../../cgb_blocks/store/compose/composeWithSettingsFrontend';
import composeWithContainer		from '../../cgb_blocks/store/compose/composeWithContainerFrontend';
import composeWithProps			from '../../cgb_blocks/store/compose/composeWithProps';
import Grid			 			from '../../cgb_blocks/components/Grid.jsx';

const setupGrid = blockGroupId => {

	let _Grid = Grid;

	_Grid = composeWithProps( { blockGroupId: blockGroupId } )( _Grid );

	_Grid = composeWithItems( _Grid, [
		'items',
		'photoSet',
	], blockGroupId )

	_Grid = composeWithContainer( _Grid, blockGroupId );

	_Grid = composeWithSettings( _Grid, [
		'transitionTime',
	], blockGroupId );

	_Grid = composeWithProps( { ItemComponent: get( cgbBlocks, ['components',blockGroupId,'Item'] ) } )( _Grid );

	set( cgbBlocks, ['components',blockGroupId,'Grid'], _Grid );

}

export default setupGrid;
