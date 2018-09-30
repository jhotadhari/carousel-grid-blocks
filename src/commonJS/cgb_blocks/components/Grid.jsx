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

const Grid = ( {
	items,
	itemWidth,
	selectedIndex,
	transitionTime,
} ) => <div className="cgb-block">

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
					style={ {
						transition: 'box-shadow ' + ( transitionTime / 1000 ) + 's',
						boxShadow: index === selectedIndex ? '5px 5px #f00, 5px -5px #f00, -5px 5px #f00, -5px -5px #f00' : 'none',
					} }
				/>

			) ) }

		</div>
	}

</div>;


export default Grid;
