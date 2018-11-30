/**
 * External dependencies
 */
import ResizeObserver from 'resize-observer-polyfill';

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
			carouselSettings,
			items,
			selectedIndex,
		} = this.props;

		console.log( 'debug carouselSettings', carouselSettings );		// ??? debug

		const {
			maxWidth,
			maxHeight,
			resizeToScreenHeight,
			resizeToContainerWidth,
		} = carouselSettings;

		const currentItem = items[selectedIndex];
		const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

		// maxHeightCalc
		let maxHeightCalc = false;
		if ( maxHeight.setMaxHeight ) {
			switch( maxHeight.unit ) {
				case 'px':
					maxHeightCalc = maxHeight.value;
					break;
				case 'percent':
					maxHeightCalc = ( maxHeight.value / 100 ) * screenHeight;
					break;
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
			console.log( 'debug screenHeightCalc', screenHeightCalc );		// ??? debug

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
		maxWidthCalc = resizeToContainerWidth ? Math.min( maxWidthCalc, containerWidth ) : maxWidthCalc;


		const width = ( maxWidthByMaxHeight
			? maxWidthCalc > maxWidthByMaxHeight ? maxWidthByMaxHeight : maxWidthCalc
			: maxWidthCalc ) + 'px';

		console.log( 'debug width', width );		// ??? debug

		return width;



	}


	render() {

		const {
			containerWidth,
		} = this.state;

		// no containerWidth until after first render with refs, skip calculations and render nothing
		if ( ! containerWidth )
			return <div ref={ c => (this._carousel = c ) } />;

		const {
			carouselSettings,
			items,
			selectedIndex,
			setSelected,
			itemsSource,
			transitionTime,
			imageCaptionSettings,
			imageControlsSettings,
			imageHoverEffect,
			ItemComponent,
		} = this.props;

		const {
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
		} = carouselSettings;

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

		return (
			<div className="cgb-block">

				{ items.length > 0 &&
					<div className="cgb-block-carousel">

						<CarouselCustom
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

			</div>
		);

	}

}



export default Carousel;
