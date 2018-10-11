/*
 * External dependencies
 */
import PropTypes from 'prop-types';
import {
	filter,
} from 'lodash';

/**
 * Internal dependencies
 */

class Item extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {
			index,				// from 	GridGallery -> GridItem
			item,				// from		GridItem
			items,				// from 	items
			fetchItem,			// from 	items
			className,			// from 	GridItem
			controls,			// from 	GridItem
			setSelected,		// from 	items
			itemStyle,			// from 	GridItem
			imageStyle,			// from 	GridItem
			imgStyle,			// from 	GridItem
			photo,				// from 	items -> Grid -> GridGallery -> GridItem
			imageHoverEffect,	// from 	attributes -> Grid -> GridGallery -> GridItem
			ItemControlsComponent,
		} = this.props;

		const {
			src,
			alt,
			srcSet,
			sizes,
			title,
			orientation,
		} = item;

		const height = photo ? photo.height : null;
		const width = photo ? photo.width : null;

		if ( undefined !== item.id && ! item.fetched )
			fetchItem( index, item );

		return ([
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
						title={ title }
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
				<div
					className={ className + '-info cgb-flex-row' }
				>
					{ title &&
						<span>
							{ title }
						</span>
					}
				</div>

				{/*
					controls
				*/}
				<ItemControlsComponent
					className={ className + '-controls cgb-flex-row' }
					index={ index }
					item={ item }
					controls={ controls }
				/>

			</div>

		]);

	}
}

Item.propTypes = {
	style: PropTypes.object,
}

Item.defaultProps = {
	style: {},
}

export default Item;
