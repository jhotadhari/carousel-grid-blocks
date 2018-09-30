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
} = wp.components;

/**
 * Internal dependencies
 */
import composeWithItemsEditor 		from '../store/compose/composeWithItemsEditor.js';

class MoveItemToIndex extends React.Component {

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
			onClose,
		} = this.props;

		const {
			newIndex,
		} = this.state;

		return (

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
		);

	}
}

MoveItemToIndex.propTypes = {
	items: PropTypes.array,
	index: PropTypes.number,
	moveItem: PropTypes.func,
	onClose: PropTypes.func,
}

MoveItemToIndex = composeWithItemsEditor( MoveItemToIndex, [
	'moveItem',
	'items',
] );

export default MoveItemToIndex;
