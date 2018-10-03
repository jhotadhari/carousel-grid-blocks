import React from 'react';
import PropTypes from 'prop-types';

// const imgWithClick = { cursor: 'pointer' };

import {
  SortableElement,
} from "react-sortable-hoc";

const { Item } = cgbBlocks.components;

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
	imageHoverEffect,				// from 	attributes -> Grid -> GridGallery
	imageHighlightEffect,			// from 	attributes -> Grid -> GridGallery
	imageHighlightBoxShadowColor,	// from 	attributes -> Grid -> GridGallery
	imageHighlightBoxShadowWidth,	// from 	attributes -> Grid -> GridGallery
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
			style = {
				...style,
				transition: 'box-shadow ' + ( transitionTime / 1000 ) + 's',
				boxShadow: sortIndex === selectedIndex ? `${imageHighlightBoxShadowWidth}px ${imageHighlightBoxShadowWidth}px ${imageHighlightBoxShadowColor}, ${imageHighlightBoxShadowWidth}px -${imageHighlightBoxShadowWidth}px ${imageHighlightBoxShadowColor}, -${imageHighlightBoxShadowWidth}px ${imageHighlightBoxShadowWidth}px ${imageHighlightBoxShadowColor}, -${imageHighlightBoxShadowWidth}px -${imageHighlightBoxShadowWidth}px ${imageHighlightBoxShadowColor}` : 'none',
			};
		}
		return style;
	}

	return (
		<Item
			itemStyle={ { margin: margin + 'px' } }
			imageStyle={ { ...getImageStyle( sortIndex ) } }
			imgStyle={ { ...imgStyle } }
			photo={ photo }
			index={ sortIndex }
			key={ items[sortIndex]['key'] }
			item={ items[sortIndex] }
			className={ 'cgb-block-grid-item' }
			imageHoverEffect={ imageHoverEffect }
			controls={ [
				'selectImage',
				'fullscreen',
				'remove',
				'dragHandle',
			] }
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
] );

GridItem = SortableElement( GridItem );

export default GridItem;
