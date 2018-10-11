/**
 * External dependencies
 */
import PropTypes from 'prop-types';
/**
 * Internal dependencies
 */
import registerCgbStoreFrontend 	from './cgb_blocks/store/registerCgbStoreFrontend';
registerCgbStoreFrontend();
// compose
import composeWithItems 		from './cgb_blocks/store/compose/composeWithItemsFrontend';
import composeWithSettings 		from './cgb_blocks/store/compose/composeWithSettingsFrontend';
import composeWithContainer		from './cgb_blocks/store/compose/composeWithContainerFrontend';
const composeWithProps = injectedProps => WrappedComponent => {
	const WithProps = props => <WrappedComponent{...injectedProps} {...props} />
	return WithProps
};

cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};

/**
 *	ItemControls
 *
 */
import ItemControls				from './cgb_blocks/components/ItemControlsFrontend.jsx';

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
_Item = composeWithProps( { ItemControlsComponent: ItemControls } )( _Item );

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
	'transitionTime',
] );
_Carousel = composeWithProps( { ItemComponent: _Item } )( _Carousel );
cgbBlocks.components.Carousel = _Carousel;
