/**
 * External dependencies
 */
import ResizeObserver 	from 'resize-observer-polyfill';
import classNames 		from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Internal dependencies
 */
import CarouselCustom from './CarouselCustom.jsx';

class Carousel extends React.Component {

	constructor(props) {
		super(props);

		// this.props = props;
		this.state = {
			containerWidth: 0,
		};

		this.getWidth = this.getWidth.bind( this );
		this.getHeight = this.getHeight.bind( this );
	}

	componentDidMount() {

		this.observer = new ResizeObserver(entries => {
			// only do something if width changes
			const newWidth = Math.floor(  entries[0].contentRect.width );
			if ( this.state.containerWidth !== newWidth )
				this.setState( { containerWidth: newWidth } );
		});
		this.observer.observe(this._carousel);
	}

	componentWillUnmount() {
		this.observer.disconnect();
	}

	getWidth() {
		const {
			containerWidth,
		} = this.state;

		const {
			carouselSettings: {
				imageFit,
				width,
				// height,
				maxWidth,
				maxHeight,
				resizeToScreenHeight,
			},
			items,
			selectedIndex,
		} = this.props;

		const currentItem = items[selectedIndex];
		const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

		switch( imageFit ) {
			case 'contain':

				// maxHeightCalc
				let maxHeightCalc = false;
				if ( maxHeight.setMaxHeight ) {
					switch( maxHeight.unit ) {
						case 'px':
							maxHeightCalc = maxHeight.value;
							break;
						// case 'percent':
						// 	maxHeightCalc = ( maxHeight.value / 100 ) * screenHeight;
						// 	break;
					}
				}
				if ( resizeToScreenHeight.resize ) {
					let screenHeightCalc;
					switch( resizeToScreenHeight.unit ) {
						case 'px':
							screenHeightCalc = screenHeight - resizeToScreenHeight.value;
							break;
						case 'percent':
							screenHeightCalc = screenHeight * ( 1 - ( resizeToScreenHeight.value / 100 ) );
							break;
					}
					maxHeightCalc = maxHeightCalc ? Math.min( maxHeightCalc, screenHeightCalc ) : screenHeightCalc;
				}

				// maxWidthByMaxHeight
				const maxWidthByMaxHeight = maxHeightCalc ? ( currentItem.width * maxHeightCalc ) /  currentItem.height : false;

				// maxWidthCalc
				let maxWidthCalc;
				switch( maxWidth.unit ) {
					case 'px':
						maxWidthCalc = maxWidth.value;
						break;
					case 'percent':
						maxWidthCalc = ( maxWidth.value / 100 ) * containerWidth;
						break;
				};
				maxWidthCalc = Math.min( maxWidthCalc, containerWidth );

				return ( maxWidthByMaxHeight
					? maxWidthCalc > maxWidthByMaxHeight ? maxWidthByMaxHeight : maxWidthCalc
					: maxWidthCalc ) + 'px';

			case 'cover':

				switch( width.unit ) {
					case 'px':
						return width.value + 'px';
					case 'percent':
						return ( ( width.value / 100 ) * containerWidth ) + 'px';

				}
		}
	}

	getHeight() {

		const {
			carouselSettings: {
				imageFit,
				height,
			},
		} = this.props;

		const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

		switch( imageFit ) {
			case 'contain':
				return false;
			case 'cover':
				switch( height.unit ) {
					case 'px':
						return height.value + 'px';
					case 'percent':
						return ( ( height.value / 100 ) * screenHeight ) + 'px';
				}
		}
	}

	render() {

		const {
			containerWidth,
		} = this.state;

		// no containerWidth until after first render with refs, skip calculations and render nothing
		if ( ! containerWidth )
			return <div ref={ c => (this._carousel = c ) } />;

		const {
			className,
			carouselSettings: {
				imageFit,
				showArrows,
				arrowsPosition,
				showStatus,
				showIndicators,
				indicatorsPosition,
				infiniteLoop,
				autoPlay,
				interval,
				stopOnHover,
				useKeyboardArrows,
				animation,
			},
			items,
			selectedIndex,
			setSelected,
			itemsSource,
			transitionTime,
			imageCaptionSettings,
			imageControlsSettings,
			imageHoverEffect,
			ItemComponent,

			PlaceholderNoItems,
		} = this.props;

		const controls = [
			'fullscreen',
			...( 'custom' === itemsSource.key ? [
				'selectImage',
				'remove',
				'moveLeft',
				'moveImage',
				'moveRight',
			] : [] ),
		];

		return <>
			<div className={ classNames( className, 'cgb-block' ) }>

				{ items.length > 0 &&
					<div className="cgb-block-carousel">

						<CarouselCustom
							className={ 'image-fit-' + imageFit }
							axis={ 'horizontal' }
							showArrows={ showArrows }
							arrowsPosition={ arrowsPosition }
							showStatus={ showStatus ? items.length > 1 : false }
							showIndicators={ showIndicators ? items.length > 1 : false }
							indicatorsPosition={ indicatorsPosition }
							infiniteLoop={ infiniteLoop }
							autoPlay={ autoPlay }
							interval={ interval }
							stopOnHover={ stopOnHover }
							showThumbs={ false }
							dynamicHeight={ true }
							selectedItem={ selectedIndex }
							onChange={ ( event ) => setSelected( event ) }
							transitionTime={ transitionTime }
							width={ this.getWidth() }
							height={ this.getHeight() }
							swipeable={ 'slide' === animation }
							useKeyboardArrows={ useKeyboardArrows }
							imageCaptionSettings={ imageCaptionSettings }
							items={ items }
							animation={ animation }
						>
							{ [...items].map( ( item, index ) => {

								return (
									<ItemComponent
										key={ item.key }
										index={ index }
										item={ item }
										className={ 'cgb-block-carousel-item' }
										transitionTime={ transitionTime }
										imageCaptionSettings={ imageCaptionSettings }
										imageControlsSettings={ imageControlsSettings }
										imageHoverEffect={ imageHoverEffect }

										itemStyle={ {} }
										imageStyle={ {} }
										imgStyle={ {} }

										controls={ controls }
									/>
								);

							} ) }
						</CarouselCustom>

					</div>
				}

				{ items.length === 0 && PlaceholderNoItems &&
					<PlaceholderNoItems/>
				}

				{ items.length === 0 && ! PlaceholderNoItems &&
					<div></div>
				}

			</div>
		</>;

	}

}



export default Carousel;
