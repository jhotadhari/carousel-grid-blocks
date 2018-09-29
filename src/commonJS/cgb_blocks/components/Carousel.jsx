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
import composeWithItems 			from '../store/composeWithItems.js';
import composeWithContainer 			from '../store/composeWithContainer.js';
import composeWithSettings 			from '../store/composeWithSettings.js';
import Item	 						from './Item.jsx';

class Carousel extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		const {
			items,
			selectedIndex,
			setSelected,
			transitionTime,
		} = this.props;

		return (

			<div className="cgb-block">

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
									index={ index }
									item={ item }
									className={ 'cgb-block-carousel-item' }
									transitionTime={ transitionTime }
								/>
							) ) }
						</ResponsiveCarousel>

					</div>
				}

			</div>

		)
	}
}


Carousel = composeWithItems( Carousel, [
	'items',
	'selectedIndex',
	'setSelected',
] )

Carousel = composeWithContainer( Carousel );

Carousel = composeWithSettings( Carousel, [
	'transitionTime',
] );

export default Carousel;
