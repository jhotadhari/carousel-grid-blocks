/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { get } from 'lodash';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
    Button,
    IconButton,
} = wp.components;

const {
	MediaUpload,
} = wp.editor;

/**
 * Internal dependencies
 */
import composeWithItems 			from '../store/composeWithItems.js';
// import composeWithSettings 		from '../store/composeWithSettings.js';


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
			items,
			updateItemFromMedia,
			selectedIndex,
			className,
			setSelected,
			removeItem,
			// transitionTime,
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
				<div className="cgb-block-item-info">
					{ title &&
						<span>
							{ title }
						</span>
					}
				</div>


				{/*
					controls
				*/}
				<div className="cgb-block-item-controls">
					<div className="cgb-block-item-controls-inner">
						<MediaUpload
							type="image"
							value={ id }
							onSelect={ ( media ) => updateItemFromMedia( index, media ) }
							render={ ({ open }) =>
								<Button
									onClick={ open }
									className="button button-large"
								>
									{ '??? Pick Image' }
								</Button>

							}
						/>

						<IconButton
							className="cgb-remove-item cgb-button"
							icon="minus"
							onClick={ removeItem }
						/>
					</div>
				</div>


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

Item = composeWithItems( Item, [
	'items',
	'fetchItem',
	'updateItemFromMedia',
	'selectedIndex',
	'setSelected',
	'removeItem',
] );

// Item = composeWithSettings( Item, [
// 	'transitionTime',
// ] );

export default Item;
