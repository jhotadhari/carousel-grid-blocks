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
import rgbaToCssProp					from '../utils/rgbaToCssProp';

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

			transitionTime,
			imageCaptionSettings,
			imageHoverEffect,
			imageHoverEffectSettings,

			ItemControlsComponent,
		} = this.props;

		const {
			src,
			alt,
			srcSet,
			sizes,
			title,
			caption,
			orientation,
		} = item;

		const height = photo ? photo.height : null;
		const width = photo ? photo.width : null;

		if ( undefined !== item.id && ! item.fetched )
			fetchItem( index, item );

		const {
			show,
			position,
			margin,
			padding,
			backgroundColor,
			color,
			parts,
		} = imageCaptionSettings;

		const marginParts = {
			val: margin.match(/\d+/g),
			unit: margin.match(/\D+/g),
		};

		let captionIsVisible = false;
		switch( show ){
			case 'show':
				captionIsVisible = true;
				break
			case 'hide':
				captionIsVisible = false;
				break
			case 'showOnhover':
				captionIsVisible = 'showOnhover';
				break
			case 'showIfSelected':
				captionIsVisible = item.selected;
				break
		}

		const captionStyle = {
			width: 'calc( 100% - ' + ( marginParts.val * 2 ) + marginParts.unit + ' )',
			margin: 'auto ' + margin,
			padding: padding,
			background: rgbaToCssProp( backgroundColor ),
			color: color,
			transition: 'opacity ' + ( transitionTime / 1000 ) + 's',
			...( 'bottom' === position && { bottom: margin } ),
			...( 'top' === position && { top: margin } ),
			...( 'top' === position && { display: 'table' } ),
			...( 'center' === position && {
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				margin: 'auto',
				display: 'table',
			} ),
			...( 'full' === position && {
				top: '0',
				left: '0',
				margin: '0',
				width: '100%',
				height: '100%',
			} ),
		};

		const CaptionPart = ( { partKey } ) => {
			switch( partKey ){
				case 'title':
					return [
						<div
							className={ className + '-info-title' }
						>
							{ title }
						</div>
					];
				case 'caption':
					return [
						<div
							dangerouslySetInnerHTML={ { __html: caption } }
							className={ className + '-info-caption' }
						>
						</div>
					];
			}

			return [ <span>{ '' }</span> ];
		};

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
				{ 'hide' !== imageCaptionSettings.show &&
					<div
						className={ [
							className + '-info',
							captionIsVisible === true ? 'is-visible' : 'is-hidden',
							captionIsVisible === 'showOnhover' ? 'is-visible-on-hover' : null,
						].filter( a => a !== null ).join(' ') }
						style={ captionStyle }
					>
						{ [...parts].map( part =>
							<CaptionPart
								key={ part }
								partKey={ part }
							/>
						) }
					</div>
				}

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
