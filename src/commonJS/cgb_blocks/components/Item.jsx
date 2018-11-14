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

class Item extends React.Component {

	constructor(props) {
		super(props);
		this.overlayStyle = this.overlayStyle.bind( this );
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

	overlayStyle( settings, type ) {
		const {
			margin,
			padding,
			backgroundColor,
			color,
			position,
		} = settings;

		return {
			// type imageCaption
			width: 'imageCaption' === type && 'calc( 100% - ' + ( margin.match(/\d+/g) * 2 ) + margin.match(/\D+/g) + ' )',
			margin: 'imageCaption' === type && 'auto ' + margin,

			// type imageControls
			width: 'imageControls' === type && 'auto',
			margin: 'imageControls' === type && 'auto',
			left: 'imageControls' === type && '50%',
			transform: 'imageControls' === type && 'translate(-50%, -50%)',

			// all types
			padding: padding,
			background: rgbaToCssProp( backgroundColor ),
			color: color,
			transition: 'opacity 0.35s',
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

			postLink,
			postTitle,
			postExcerpt,
			postContent,
		} = item;

		const height = photo ? photo.height : null;
		const width = photo ? photo.width : null;

		// caption
		let captionIsVisible = false;
		switch( imageCaptionSettings.show ){
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
		const CaptionPart = ( { partKey } ) => {
			switch( partKey ){
				case 'title':
					return  <div
							className={ className + '-info-title' }
						>{ decodeEntities( title ) }</div>;
				case 'caption':
					return  <div
							dangerouslySetInnerHTML={ { __html: caption } }
							className={ className + '-info-caption' }
						></div>;
				case 'postTitle':
					return  <div
							dangerouslySetInnerHTML={ { __html: postTitle } }
							className={ className + '-info-post-title' }
						></div>;
				case 'postExcerpt':
					return  <div
							dangerouslySetInnerHTML={ { __html: postExcerpt } }
							className={ className + '-info-excerpt' }
						></div>;
			}
			return <span>{ '' }</span>;
		};

		// controls
		let controlsAreVisible = false;
		switch( imageControlsSettings.show ){
			case 'show':
				controlsAreVisible = true;
				break
			case 'hide':
				controlsAreVisible = false;
				break
			case 'showOnhover':
				controlsAreVisible = 'showOnhover';
				break
			case 'showIfSelected':
				controlsAreVisible = item.selected;
				break
		}
		const ImageControl = ( { control, style } ) => {
			switch( control ){
				case 'link':
					let linkUrl, linkTitle;
					switch( get( imageControlsSettings, ['linkControlSettings', 'linkTo'] ) ) {
						case 'post':
							linkUrl = postLink || src;
							linkTitle = decodeEntities( postTitle || title );
							break;
						case 'attachment':
							linkUrl = src;
							linkTitle = title;
							break;
					}
					return  <div style={ style } className={ className + '-image-control' } >
							<a
								href={ linkUrl }
								title={ linkTitle }
								target={ get( imageControlsSettings, ['linkControlSettings', 'newTab'] ) ? '_blank' : '_self' }
							>

								<button
									className={ 'components-icon-button' }
									aria-label={ linkTitle }
									title={ linkTitle }
								>
									<span className={ [ 'dashicons', 'dashicons-redo' ].join( ' ' ) }></span>
								</button>

							</a>
						</div>;
				case 'fullscreen':
					return  <div style={ style } className={ className + '-image-control' } >

							<button
								className={ 'components-icon-button' }
								aria-label={ 	__( 'Fullscreen', 'cgb' ) }
								title={ 		__( 'Fullscreen', 'cgb' ) }
								onClick={ () => console.log( 'fullscreen' ) }
							>
								<span className={ [ 'dashicons', 'dashicons-editor-expand' ].join( ' ' ) }></span>
							</button>

						</div>;
			}
			return <span>{ '' }</span>;
		};

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
				{ 'hide' !== imageCaptionSettings.show &&
					<div
						className={ [
							className + '-info',
							captionIsVisible === true ? 'is-visible' : 'is-hidden',
							captionIsVisible === 'showOnhover' ? 'is-visible-on-hover' : null,
						].filter( a => a !== null ).join(' ') }
						style={ this.overlayStyle( imageCaptionSettings, 'imageCaption' ) }
					>
						{ [...imageCaptionSettings.parts].map( part =>
							<CaptionPart
								key={ part }
								partKey={ part }
							/>
						) }
					</div>
				}


				{/*
					image controls (the controls for the user)
				*/}
				{ 'hide' !== imageControlsSettings.show &&
					<div
						className={ [
							className + '-image-controls',
							controlsAreVisible === true ? 'is-visible' : 'is-hidden',
							controlsAreVisible === 'showOnhover' ? 'is-visible-on-hover' : null,
						].filter( a => a !== null ).join(' ') }
						style={ this.overlayStyle( imageControlsSettings, 'imageControls' ) }
					>
						<div className={ className + '-image-controls-inner' } >
							{ [...imageControlsSettings.controls].map( control =>
								<ImageControl
									style={ {
										display: controlsAreVisible ? 'block' : 'none',
									} }
									key={ control }
									control={ control }
								/>
							) }
						</div>
					</div>
				}

				{/*
					item controls (the controls for administration)
				*/}
				{ ItemControlsComponent &&

					<ItemControlsComponent
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
