/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
    PanelBody,
    TextControl,
} = wp.components;

/**
 * Internal dependencies
 */
import Inspector 							from './Inspector.jsx';

const GridInspector = ({
	setAttributes,
	itemWidth,
}) => [
	<Inspector/>,

	<PanelBody
		title={'Grid settings'}
		initialOpen={ true }
	>
		<TextControl
			label={ 'Item Width' }
			value={ itemWidth }
			type={ 'number' }
			onChange={ ( newWidth ) => setAttributes( { itemWidth: newWidth } ) }
		/>
	</PanelBody>,

];

cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};
cgbBlocks.components.GridInspector = GridInspector;

export default GridInspector;
