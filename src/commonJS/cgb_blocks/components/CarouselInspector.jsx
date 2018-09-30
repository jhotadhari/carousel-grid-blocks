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

const CarouselInspector = () => [
	<Inspector/>,

	<PanelBody
		title={'Carousel settings'}
		initialOpen={ true }
	>
		<TextControl
			label={ 'nothing to control ???' }
			value={ '???' }
			onChange={ ( newVal ) => console.log( 'newVal', newVal ) }
		/>
	</PanelBody>,

];

cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};
cgbBlocks.components.CarouselInspector = CarouselInspector;

export default CarouselInspector;
