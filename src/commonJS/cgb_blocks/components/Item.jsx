/*
 * External dependencies
 */
import PropTypes from 'prop-types';
import {
	filter,
	get,
} from 'lodash';

/**
 * WordPress dependencies
 */
const {
	__,
} = wp.i18n;
const {
	decodeEntities,
} = wp.htmlEntities;

/**
 * Internal dependencies
 */
import rgbaToCssProp					from '../utils/rgbaToCssProp';
import ItemCaption				 		from './ItemCaption.jsx';
import ItemControls				 		from './ItemControls.jsx';

class Item extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount( ) {
		this.maybeFetchItem();
	}

	componentDidUpdate( prevProps, prevState ) {
		this.maybeFetchItem();
	}

	maybeFetchItem() {
		const {
			fetchItem,
			item,
			index,
		} = this.props;
		if ( undefined !== item.id && ! item.fetched )
			fetchItem( index, item );
	}

	render() {
		const {
			index,				// from 	GridGallery -> GridItem
			item,				// from		GridItem
			items,				// from 	items
			className,			// from 	GridItem
			controls,			// from 	GridItem
			setSelected,		// from 	items
			itemStyle,			// from 	GridItem
			imageStyle,			// from 	GridItem
			imgStyle,			// from 	GridItem
			photo,				// from 	items -> Grid -> GridGallery -> GridItem

			transitionTime,
			imageControlsSettings,
			imageCaptionSettings,
			imageHoverEffect,
			imageHoverEffectSettings,

			ItemAdminControlsComponent,

			isFullscreen,
			toggleFullscreen,
		} = this.props;

		const {
			src,
			alt,
			srcSet,
			sizes,
			title,
			// caption,
			orientation,
			// postLink,
			postTitle,
			// postExcerpt,
			// postContent,
		} = item;

		const height = photo ? photo.height : null;
		const width = photo ? photo.width : null;

		return (
			<div
				onClick={ ( event ) => 'BUTTON' !== event.target.tagName ? setSelected( undefined === index ? 0 : index ) : null }
				className={ [
					className,
					item.selected ? 'selected' : null,
				].filter( a => a !== null ).join(' ') }
				style={ {...itemStyle} }
			>

				{/*
					image
				*/}
				<div
					className={ [
						className + '-image',
						'cgb-flex-row',
						imageHoverEffect !== 'none' ? 'cgb-on-hover-' + imageHoverEffect : null,
					].filter( a => a !== null ).join(' ') }
					style={ imageStyle }
				>
					<img
						src={ src }
						alt={ alt }
						srcSet={ srcSet }
						sizes={ sizes }
						title={ postTitle.length > 0 ? postTitle : title }
						style={ imgStyle }
						className={ [
							orientation,
							imageHoverEffect !== 'none' ? 'cgb-on-hover-' + imageHoverEffect : null,
						].filter( a => a !== null ).join(' ') }
						width={ width }
						height={ height }
					/>
				</div>

				{/*
					caption info
				*/}
				{ 'hide' !== imageCaptionSettings.show && 'below' !== imageCaptionSettings.position &&
					<ItemCaption
						imageCaptionSettings={ imageCaptionSettings }
						className={ className + '-info' }
						item={ item }
					/>
				}

				{/*
					image controls (the controls for the user)
				*/}
				{ 'hide' !== imageControlsSettings.show &&
					<ItemControls
						imageControlsSettings={ imageControlsSettings }
						className={ className + '-image-controls' }
						item={ item }
						isFullscreen={ isFullscreen }
						toggleFullscreen={ toggleFullscreen }
					/>
				}

				{/*
					item admin controls
				*/}
				{ ItemAdminControlsComponent &&

					<ItemAdminControlsComponent
						className={ className + '-controls cgb-flex-row' }
						index={ index }
						item={ item }
						controls={ controls }
					/>
				}

			</div>

		);

	}
}

export default Item;
