
/**
 * WordPress dependencies
 */
const {
    IconButton,
} = wp.components;

const {
	MediaUpload,
} = wp.editor;

/**
 * Internal dependencies
 */
import composeWithItemsEditor 				from '../store/compose/composeWithItemsEditor.js';

const Toolbar = ({
	addItems,
}) => [

	<MediaUpload
		type="image"
		multiple={ true }
		onSelect={ addItems }
		render={ ({ open }) =>
			<IconButton
				title={ 'Add Items' }
				className={ 'components-toolbar__control' }
				icon={ 'plus' }
				onClick={ open }
			/>

		}
	/>

];

export default composeWithItemsEditor( Toolbar, [
	'addItems',
] );
