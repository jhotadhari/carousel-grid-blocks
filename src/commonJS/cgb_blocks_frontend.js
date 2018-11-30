/**
 * External dependencies
 */

import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import registerCgbStoreFrontend 	from './cgb_blocks/store/registerCgbStoreFrontend';
import composeWithItems 			from './cgb_blocks/store/compose/composeWithItemsFrontend';
import composeWithSettings 			from './cgb_blocks/store/compose/composeWithSettingsFrontend';
import composeWithContainer			from './cgb_blocks/store/compose/composeWithContainerFrontend';
import composeWithUi				from './cgb_blocks/store/compose/composeWithUiFrontend';
import composeWithProps				from './cgb_blocks/store/compose/composeWithProps';

registerCgbStoreFrontend();

cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};


/**
 *	Item
 *
 */
import Item						from './cgb_blocks/components/Item.jsx';
let _Item = Item;
_Item.propTypes = {
	style: PropTypes.object,
}
_Item.defaultProps = {
	style: {},
}
_Item = composeWithItems( _Item, [
	'items',
	'fetchItem',
	'selectedIndex',
	'setSelected',
] );
_Item = composeWithSettings( _Item, [
	'transitionTime',
	'itemsSource',
] );

_Item = composeWithUi( _Item );

/**
 *	Grid
 *
 */
import Grid			 			from './cgb_blocks/components/Grid.jsx';
let _Grid = Grid;
_Grid = composeWithItems( _Grid, [
	'items',
	'photoSet',
] )

_Grid = composeWithContainer( _Grid );

_Grid = composeWithSettings( _Grid, [
	'transitionTime',
] );
_Grid = composeWithProps( { ItemComponent: _Item } )( _Grid );
cgbBlocks.components.Grid = _Grid;

/**
 *	Carousel
 *
 */
import Carousel			 			from './cgb_blocks/components/Carousel.jsx';
let _Carousel = Carousel;
_Carousel = composeWithItems( _Carousel, [
	'items',
	'selectedIndex',
	'setSelected',
] )

_Carousel = composeWithContainer( _Carousel );

_Carousel = composeWithSettings( _Carousel, [
	'itemsSource',
	'transitionTime',
] );
_Carousel = composeWithProps( { ItemComponent: _Item } )( _Carousel );
cgbBlocks.components.Carousel = _Carousel;

/**
 *	Fullscreen
 *
 */
import Fullscreen			 			from './cgb_blocks/components/Fullscreen.jsx';
let _Fullscreen = Fullscreen;
_Fullscreen = composeWithUi( _Fullscreen );
cgbBlocks.components.Fullscreen = _Fullscreen;
