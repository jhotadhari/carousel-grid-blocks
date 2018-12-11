/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import registerCgbStoreEditor 	from './cgb_blocks/store/registerCgbStoreEditor';
import composeWithItems 		from './cgb_blocks/store/compose/composeWithItemsEditor';
import composeWithSettings 		from './cgb_blocks/store/compose/composeWithSettingsEditor';
import composeWithContainer		from './cgb_blocks/store/compose/composeWithContainerEditor';
import composeWithUi			from './cgb_blocks/store/compose/composeWithUiEditor';
import composeWithProps			from './cgb_blocks/store/compose/composeWithProps';

registerCgbStoreEditor();

cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};

/**
 *	ItemAdminControls
 *
 */
import ItemAdminControls		from './cgb_blocks_editor/components/ItemAdminControls.jsx';

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
	'removeItem',
] );

_Item = composeWithSettings( _Item, [
	'transitionTime',
] );

_Item = composeWithUi( _Item );

_Item = composeWithProps( { ItemAdminControlsComponent: ItemAdminControls } )( _Item );

/**
 *	Grid
 *
 */
import Grid			 			from './cgb_blocks/components/Grid.jsx';
let _Grid = Grid;
_Grid = composeWithItems( _Grid, [
	'items',
	'photoSet',
	'moveItem',
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

/**
 *	Inspector
 *
 */
import GridInspector 			from './cgb_blocks_editor/components/GridInspector.jsx';
import CarouselInspector 		from './cgb_blocks_editor/components/CarouselInspector.jsx';
cgbBlocks.components.CarouselInspector = CarouselInspector;
cgbBlocks.components.GridInspector = GridInspector;

/**
 *	Toolbar
 *
 */
import Toolbar 					from './cgb_blocks_editor/components/Toolbar.jsx';
let _Toolbar = Toolbar;
_Toolbar = composeWithItems( Toolbar, [
	'addItems',
] );

_Toolbar = composeWithSettings( _Toolbar, [
	'itemsSource',
] );
cgbBlocks.components.Toolbar = _Toolbar;
