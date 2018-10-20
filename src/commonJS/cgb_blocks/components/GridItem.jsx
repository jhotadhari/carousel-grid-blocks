/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import {
	get,
} from 'lodash';

import {
  SortableElement,
} from "react-sortable-hoc";

/**
 * Internal dependencies
 */
import getCgbDefault					from '../getCgbDefault';
import rgbaToCssProp					from '../utils/rgbaToCssProp';

import composeWithItemsFrontend 		from '../store/compose/composeWithItemsFrontend.js';
import composeWithSettingsFrontend 		from '../store/compose/composeWithSettingsFrontend.js';

// ImageComponent
let GridItem = ({
	margin,							// from 	attributes -> Grid -> GridGallery
	sortIndex,						// from 	GridGallery
	selectedIndex,					// from 	items
	photo,							// from 	items -> Grid -> GridGallery
	direction,						// from 	Grid -> GridGallery
	items,							// from 	items
	transitionTime,					// from 	settings
	itemsSource,					// from 	settings
	imageCaptionSettings,			// from 	attributes -> Grid -> GridGallery
	imageHoverEffect,				// from 	attributes -> Grid -> GridGallery
	imageHoverEffectSettings,				// from 	attributes -> Grid -> GridGallery
	imageHighlightEffect,			// from 	attributes -> Grid -> GridGallery
	imageHighlightEffectSettings,			// from 	attributes -> Grid -> GridGallery
	ItemComponent,
}) => {

	const imgStyle = {};
	if (direction === 'column') {
		imgStyle.position = 'absolute';
		imgStyle.left = photo.left;
		imgStyle.top = photo.top;
	}

	const getImageStyle = ( sortIndex ) => {
		let style = {};
		switch( imageHighlightEffect ) {
			case 'boxShadow':
				const boxShadowWidth = get( imageHighlightEffectSettings, ['boxShadowWidth'] ) || get( getCgbDefault( 'imageHighlightEffectSettings' ), ['boxShadowWidth'] );
				const boxShadowColor = rgbaToCssProp( get( imageHighlightEffectSettings, ['boxShadowColor'] ) || get( getCgbDefault( 'imageHighlightEffectSettings' ), ['boxShadowColor'] ) );
				style = {
					...style,
					transition: 'box-shadow ' + ( transitionTime / 1000 ) + 's',
					boxShadow: sortIndex === selectedIndex ? `${boxShadowWidth}px ${boxShadowWidth}px ${boxShadowColor}, ${boxShadowWidth}px -${boxShadowWidth}px ${boxShadowColor}, -${boxShadowWidth}px ${boxShadowWidth}px ${boxShadowColor}, -${boxShadowWidth}px -${boxShadowWidth}px ${boxShadowColor}` : 'none',
				};
				break;
		}
		return style;
	}

	const controls = [
		'fullscreen',
		...( 'custom' === itemsSource.key ? [
			'selectImage',
			'remove',
			'dragHandle'
		] : [] ),
	];

	return (
		<ItemComponent
			itemStyle={ { margin: margin + 'px' } }
			imageStyle={ { ...getImageStyle( sortIndex ) } }
			imgStyle={ { ...imgStyle } }
			photo={ photo }
			index={ sortIndex }
			key={ items[sortIndex]['key'] }
			item={ items[sortIndex] }
			className={ 'cgb-block-grid-item' }
			imageCaptionSettings={ imageCaptionSettings }
			imageHoverEffect={ imageHoverEffect }
			imageHoverEffectSettings={ imageHoverEffectSettings }
			controls={ controls }
		/>
	);
};

// // ??? muss noch
// export const photoPropType = PropTypes.shape({
// 	src: PropTypes.string.isRequired,
// 	width: PropTypes.number.isRequired,
// 	height: PropTypes.number.isRequired,
// 	alt: PropTypes.string,
// 	title: PropTypes.string,
// 	srcSet: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
// 	sizes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
// });

// GridItem.propTypes = {
// 	index: PropTypes.number.isRequired,
// 	onClick: PropTypes.func,
// 	photo: photoPropType.isRequired,
// 	margin: PropTypes.number,
// 	top: props => {
// 		if (props.direction === 'column' && typeof props.top !== 'number') {
// 			return new Error('top is a required number when direction is set to `column`');
// 		}
// 	},
// 	left: props => {
// 		if (props.direction === 'column' && typeof props.left !== 'number') {
// 			return new Error('left is a required number when direction is set to `column`');
// 		}
// 	},
// 	direction: PropTypes.string,
// };

GridItem = composeWithItemsFrontend( GridItem, [
	'items',
	'selectedIndex',
] );


GridItem = composeWithSettingsFrontend( GridItem, [
	'transitionTime',
	'itemsSource',
] );

GridItem = SortableElement( GridItem );

export default GridItem;
