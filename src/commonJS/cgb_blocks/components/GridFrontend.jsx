/**
 * External dependencies
 */
// import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import composeWithItemsFrontend 		from '../store/compose/composeWithItemsFrontend.js';
import composeWithContainerFrontend 	from '../store/compose/composeWithContainerFrontend.js';
import composeWithSettingsFrontend 		from '../store/compose/composeWithSettingsFrontend.js';
import Grid 							from './Grid.jsx';

let GridFrontend = Grid;

GridFrontend = composeWithItemsFrontend( GridFrontend, [
	'items',
	'selectedIndex',
] )

GridFrontend = composeWithContainerFrontend( GridFrontend );

GridFrontend = composeWithSettingsFrontend( GridFrontend, [
	'transitionTime',
] );

cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};
cgbBlocks.components.Grid = GridFrontend;

export default GridFrontend;
