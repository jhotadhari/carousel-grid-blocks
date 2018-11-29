/*
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;
const {
    TextControl,
    IconButton,
    Dropdown,
} = wp.components;

/**
 * Internal dependencies
 */
import composeWithItemsEditor 		from '../store/compose/composeWithItemsEditor.js';

class ItemAdminControlsMoveToIndex extends React.Component {

	constructor(props) {
		super(props);

		// this.props = props;

		this.state= {
			newIndex: props.index,
		};
	}

	render() {
		const {
			items,
			index,
			moveItem,
		} = this.props;

		const {
			newIndex,
		} = this.state;

		return (
			<Dropdown
				position="bottom center"
				contentClassName={ 'cgb-block-item-controls-popover cgb-flex-row' }
				expandOnMobile={false}
				renderToggle={ ( { isOpen, onToggle, onClose } ) => (
					<IconButton
						icon="share-alt2"
						aria-expanded={ isOpen }
						label={ __( 'Move Image To New Position', 'cgb' ) }
						onClick={ onToggle }
					/>
				) }
				renderContent={ ( { isOpen, onToggle, onClose } ) => ([
					<div
						className={ 'cgb-flex-row' }
					>

						<TextControl
							label={ __( 'New Image Position', 'cgb' ) }
							value={ newIndex + 1 }
							onChange={ ( val ) => val > 0 && val <= items.length ? this.setState( { newIndex: val - 1 } ) : null }
						/>,

						<IconButton
							icon="controls-play"
							label={ __( 'Move Image To New Position', 'cgb' ) }
							onClick={ () => {
								onClose();
								moveItem( index, newIndex );
							} }
						/>

					</div>
				]) }
			/>
		);

	}
}






ItemAdminControlsMoveToIndex.propTypes = {
	items: PropTypes.array,
	index: PropTypes.number,
	moveItem: PropTypes.func,
	onClose: PropTypes.func,
}

ItemAdminControlsMoveToIndex = composeWithItemsEditor( ItemAdminControlsMoveToIndex, [
	'moveItem',
	'items',
] );

export default ItemAdminControlsMoveToIndex;
