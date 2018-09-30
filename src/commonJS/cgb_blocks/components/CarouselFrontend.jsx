/**
 * Internal dependencies
 */
import composeWithItemsFrontend 		from '../store/compose/composeWithItemsFrontend.js';
import composeWithContainerFrontend 			from '../store/compose/composeWithContainerFrontend.js';
import composeWithSettingsFrontend 		from '../store/compose/composeWithSettingsFrontend.js';
import Carousel	 						from './Carousel.jsx';

let CarouselFrontend = Carousel;

CarouselFrontend = composeWithItemsFrontend( CarouselFrontend, [
	'items',
	'selectedIndex',
	'setSelected',
] )

CarouselFrontend = composeWithContainerFrontend( CarouselFrontend );

CarouselFrontend = composeWithSettingsFrontend( CarouselFrontend, [
	'transitionTime',
] );

cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};
cgbBlocks.components.Carousel = CarouselFrontend;

export default CarouselFrontend;
