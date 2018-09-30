/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
    PanelBody,
    SelectControl,
} = wp.components;

/**
 * Internal dependencies
 */
import Inspector 							from './Inspector.jsx';

const CarouselInspector = ({
	setAttributes,
	imageHoverEffect,
}) => [
	<Inspector/>,

	<PanelBody
		title={'Carousel settings'}
		initialOpen={ true }
	>

		<SelectControl
			label={ __( 'Image Hover Effect', 'cgb' ) }
			value={ imageHoverEffect }
			options={ [
				{ label: __( 'None', 'cgb' ), value: 'none' },
				{ label: __( 'Scale', 'cgb' ), value: 'scale' },
			] }
			onChange={ ( newImageHoverEffect ) => setAttributes( { imageHoverEffect: newImageHoverEffect } ) }
		/>

	</PanelBody>,

];

cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};
cgbBlocks.components.CarouselInspector = CarouselInspector;

export default CarouselInspector;
