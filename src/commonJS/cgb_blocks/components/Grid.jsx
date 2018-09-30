/**
 * External dependencies
 */
// import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
// const { __ } = wp.i18n;
// const {
//     IconButton,
// } = wp.components;

const { Item } = cgbBlocks.components;


class Grid extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {
			items,
			itemWidth,
			selectedIndex,
			transitionTime,
			imageHoverEffect,
			imageHighlightEffect,
			imageHighlightBoxShadowColor,
			imageHighlightBoxShadowWidth,

		} = this.props;

		const getItemsStyle = ( index ) => {
			let itemStyle = null;
			switch( imageHighlightEffect ) {
			case 'boxShadow':
				itemStyle = {
					transition: 'box-shadow ' + ( transitionTime / 1000 ) + 's',
					boxShadow: index === selectedIndex ? `${imageHighlightBoxShadowWidth}px ${imageHighlightBoxShadowWidth}px ${imageHighlightBoxShadowColor}, ${imageHighlightBoxShadowWidth}px -${imageHighlightBoxShadowWidth}px ${imageHighlightBoxShadowColor}, -${imageHighlightBoxShadowWidth}px ${imageHighlightBoxShadowWidth}px ${imageHighlightBoxShadowColor}, -${imageHighlightBoxShadowWidth}px -${imageHighlightBoxShadowWidth}px ${imageHighlightBoxShadowColor}` : 'none',
				};
			}
			return itemStyle;
		}

		return ([

			<div className="cgb-block">

				{ items && items.length &&
					<div
						className={ 'cgb-block-grid' }
						style={ {
							gridTemplateColumns: 'repeat( auto-fill, minmax( ' + itemWidth + 'px, 1fr ) )',
						} }
					>

						{ [...items].map( ( item, index ) => (

							<Item
								key={ index }
								index={ index }
								item={ item }
								className={ 'cgb-block-grid-item' }
								imageHoverEffect={ imageHoverEffect }
								imageHighlightEffect={ imageHighlightEffect }
								imageHighlightBoxShadowColor={ imageHighlightBoxShadowColor }
								imageHighlightBoxShadowWidth={ imageHighlightBoxShadowWidth }
								style={ { ...getItemsStyle( index ) } }
							/>

						) ) }

					</div>
				}

			</div>

		])
	}
}



export default Grid;
