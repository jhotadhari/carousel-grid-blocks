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
const { Item } = cgbBlocks.components;

const Carousel = ( {
	items,
	selectedIndex,
	setSelected,
	transitionTime,
} ) => <div className="cgb-block">

	{ items.length > 0 &&
		<div className="cgb-block-carousel">

			<ResponsiveCarousel
				showThumbs={ false }
				infiniteLoop={ true }
				dynamicHeight={ true }
				selectedItem={ selectedIndex }
				onChange={ ( event ) => setSelected( event ) }			// on beging
				onClickItem={ ( event ) => console.log( 'onClickItem', event ) }
				transitionTime={ transitionTime }
			>
				{ [...items].map( ( item, index ) => (
					<Item
						key={ index }
						index={ index }
						item={ item }
						className={ 'cgb-block-carousel-item' }
						transitionTime={ transitionTime }
					/>
				) ) }
			</ResponsiveCarousel>

		</div>
	}

</div>;


export default Carousel;
