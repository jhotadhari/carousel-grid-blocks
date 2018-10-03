/**
 * External dependencies
 */
// import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import composeWithItemsEditor 			from '../store/compose/composeWithItemsEditor.js';
import composeWithContainerEditor 		from '../store/compose/composeWithContainerEditor.js';
import composeWithSettingsEditor 		from '../store/compose/composeWithSettingsEditor.js';
import Grid 							from './Grid.jsx';

let GridEditor = Grid;

GridEditor = composeWithItemsEditor( GridEditor, [
	'items',
	'photoSet',
	'moveItem',
] )

GridEditor = composeWithContainerEditor( GridEditor );

GridEditor = composeWithSettingsEditor( GridEditor, [
	'transitionTime',
] );

cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};
cgbBlocks.components.Grid = GridEditor;

export default GridEditor;
