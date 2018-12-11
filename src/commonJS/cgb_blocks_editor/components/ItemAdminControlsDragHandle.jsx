/**
 * External dependencies
 */
import { SortableHandle } from 'react-sortable-hoc';

/**
 * WordPress dependencies
 */
const {
    Dashicon,
    Tooltip,
} = wp.components;

/**
 * Internal dependencies
 */
import composeWithItemsEditor 			from '../../cgb_blocks/store/compose/composeWithItemsEditor.js';
import ItemAdminControlsMoveToIndex 	from './ItemAdminControlsMoveToIndex.jsx';

const ItemAdminControlsDragHandle = SortableHandle( ( { disabled, label } ) => { return (
	<Tooltip text={ label }>
		<div
			className={ 'components-icon-button components-button' }

			style={ {
				curser: disabled ? 'default' : 'pointer',
				opacity: disabled ? 0.3 : 1,
			} }
			aria-disabled={ disabled }
			disabled={ disabled }

		>
			<Dashicon
				icon="move"
				className={ disabled ? 'disabled' : '' }
			/>
		</div>
	</Tooltip>
) } );

export default ItemAdminControlsDragHandle;
