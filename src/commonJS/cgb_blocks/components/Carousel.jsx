/**
 * External dependencies
 */
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Internal dependencies
 */

const Carousel = ( {
	items,
	selectedIndex,
	setSelected,
	itemsSource,
	transitionTime,
	imageCaptionSettings,
	imageControlsSettings,
	imageHoverEffect,
	ItemComponent,
} ) => {

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

					<ResponsiveCarousel
						showThumbs={ false }
						showStatus={ items.length > 1 }
						showIndicators={ items.length > 1 }
						infiniteLoop={ true }
						dynamicHeight={ true }
						selectedItem={ selectedIndex }
						onChange={ ( event ) => setSelected( event ) }			// on beging
						onClickItem={ ( event ) => console.log( 'onClickItem', event ) }
						transitionTime={ transitionTime }
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
					</ResponsiveCarousel>

				</div>
			}

		</div>
	);

};

export default Carousel;
