/**
 * Internal dependencies
 */
import Carousel 				from './cgb_blocks/components/Carousel.jsx';
import CarouselInspector 		from './cgb_blocks/components/CarouselInspector.jsx';
import CarouselToolbar 			from './cgb_blocks/components/CarouselToolbar.jsx';
import GridInspector 			from './cgb_blocks/components/GridInspector.jsx';
import GridToolbar 				from './cgb_blocks/components/GridToolbar.jsx';
import Grid 					from './cgb_blocks/components/Grid.jsx';
import registerCgbStore 		from './cgb_blocks/store/registerCgbStore';

registerCgbStore();

const components = undefined === cgbBlocks.components  ? {} : cgbBlocks.components;
components.Grid = Grid;
components.GridInspector = GridInspector;
components.GridToolbar = GridToolbar;
components.Carousel = Carousel;
components.CarouselInspector = CarouselInspector;
components.CarouselToolbar = CarouselToolbar;

cgbBlocks.components = components;