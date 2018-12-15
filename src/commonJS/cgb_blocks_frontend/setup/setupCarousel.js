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
import Carousel			 		from '../../cgb_blocks/components/Carousel.jsx';

const setupCarousel = blockGroupId => {

	let _Carousel = Carousel;
	_Carousel = composeWithItems( _Carousel, [
		'items',
		'selectedIndex',
		'setSelected',
	], blockGroupId )

	_Carousel = composeWithContainer( _Carousel, blockGroupId );

	_Carousel = composeWithSettings( _Carousel, [
		'itemsSource',
		'transitionTime',
	], blockGroupId );

	_Carousel = composeWithProps( { ItemComponent: get( cgbBlocks, ['components',blockGroupId,'Item'] ) } )( _Carousel );

	set( cgbBlocks, ['components',blockGroupId,'Carousel'], _Carousel );

}

export default setupCarousel;
