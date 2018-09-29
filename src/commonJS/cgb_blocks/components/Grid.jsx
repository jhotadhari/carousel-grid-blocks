/**
 * External dependencies
 */
// import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
    IconButton,
} = wp.components;
const {
	compose
} = wp.compose;

/**
 * Internal dependencies
 */
import composeWithItems 		from '../store/composeWithItems.js';
import composeWithContainer 	from '../store/composeWithContainer.js';
import composeWithSettings 		from '../store/composeWithSettings.js';
import Item	 					from './Item.jsx';

class Grid extends React.Component {

	constructor(props) {
		super( props );
	}

	render() {

		const {
			items,
			itemWidth,
			selectedIndex,
			transitionTime,
		} = this.props;

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

			</div>
		])
	}
};

// Grid.propTypes = {
// 	label: PropTypes.string,
// 	meta: PropTypes.object,
// 	metaKey: PropTypes.string,
// }

// Grid.defaultProps = {
// 	label: '',
// }


Grid = composeWithItems( Grid, [
	'items',
	'selectedIndex',
] )

Grid = composeWithContainer( Grid );

Grid = composeWithSettings( Grid, [
	'transitionTime',
] );

export default Grid;
