
// console.log( 'cgbBlocks', cgbBlocks );		// ??? debug


/*
 * External dependencies
 */
import PropTypes from 'prop-types';
import { get } from 'lodash';

/**
 * WordPress dependencies
 */
// const { __ } = wp.i18n;
// const {
//     Button,
//     IconButton,
// } = wp.components;

/**
 * Internal dependencies
 */

const { ItemControls } = cgbBlocks.components;

class Item extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { index, item, fetchItem } = this.props;
		if ( undefined !== item.id && ! item.fetched )
			fetchItem( index );
	}

	shouldComponentUpdate( nextProps, nextState ) {
		return ! _.isEqual(
			this.props.item,
			nextProps.item
		);
	}

	componentDidUpdate( prevProps, prevState, snapshot ) {
		const { index, item, fetchItem } = this.props;
		if ( undefined !== item.id && ! item.fetched )
			fetchItem( index );
	}

	render() {
		const {
			index,
			item,
			selectedIndex,
			className,
			setSelected,
			style,
		} = this.props;
		const { id, fetched, title, orientation } = item;

		const size =
			// get( item, [ 'sizes', 'thumbnail' ] ) ||
			get( item, [ 'sizes', 'medium' ] ) ||
			get( item, [ 'sizes', 'large' ] ) ||
			get( item, [ 'sizes', 'full' ] );

		const width = size.width;
		const height = size.height;
		const url = size.source_url || size.url;

		return ([
			<div
				key={index}
				className={ [
					className,
					'cgb-block-item',
					orientation,
					index === selectedIndex ? 'selected' : '',
				].join(' ') }
				style={ style }
				onClick={ ( event ) => 'BUTTON' !== event.target.tagName ? setSelected( undefined === index ? 0 : index ) : null }
			>

				{/*
					image
				*/}
				<div className="cgb-block-item-image">

					<img
						src={ url }
						className={ [ orientation ].join(' ') }
						width={ width }
						height={ height }
					/>

				</div>


				{/*
					caption info
				*/}
				<div className="cgb-block-item-info cgb-flex-row">
					{ title &&
						<span>
							{ title }
						</span>
					}
				</div>


				{/*
					controls
				*/}
				<ItemControls
					index={ index }
					item={ item }
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
