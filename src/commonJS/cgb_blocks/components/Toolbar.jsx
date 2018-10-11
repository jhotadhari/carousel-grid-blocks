
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
import composeWithSettingsEditor 			from '../store/compose/composeWithSettingsEditor.js';

let Toolbar = ({
	addItems,
	itemsSource,
}) => [

	<MediaUpload
		type="image"
		multiple={ true }
		onSelect={ addItems }
		render={ ({ open }) =>
			<IconButton
				title={ 'custom' === itemsSource.key ? 'Add Items' : 'Add Items is available in custom mode' }
				className={ 'components-toolbar__control' }
				icon={ 'plus' }
				disabled={ 'custom' !== itemsSource.key }
				onClick={ open }
			/>

		}
	/>

];

Toolbar = composeWithItemsEditor( Toolbar, [
	'addItems',
] );

Toolbar = composeWithSettingsEditor( Toolbar, [
	'itemsSource',
] );

export default Toolbar;