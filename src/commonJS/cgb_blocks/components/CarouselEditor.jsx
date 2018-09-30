/**
 * Internal dependencies
 */
import composeWithItemsEditor 		from '../store/compose/composeWithItemsEditor.js';
import composeWithContainerEditor 		from '../store/compose/composeWithContainerEditor.js';
import composeWithSettingsEditor 	from '../store/compose/composeWithSettingsEditor.js';
import Carousel	 					from './Carousel.jsx';

let CarouselEditor = Carousel;

CarouselEditor = composeWithItemsEditor( CarouselEditor, [
	'items',
	'selectedIndex',
	'setSelected',
] )

CarouselEditor = composeWithContainerEditor( CarouselEditor );

CarouselEditor = composeWithSettingsEditor( CarouselEditor, [
	'transitionTime',
] );

cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};
cgbBlocks.components.Carousel = CarouselEditor;

export default CarouselEditor;
