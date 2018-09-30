/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
    PanelBody,
    TextControl,
    SelectControl,
    ColorPalette,
} = wp.components;

/**
 * Internal dependencies
 */
import Inspector 							from './Inspector.jsx';
import defaults 							from '../../cgb_blocks_loader/defaults';

const GridInspector = ({
	setAttributes,
	itemWidth,
	imageHoverEffect,
	imageHighlightEffect,
	imageHighlightBoxShadowColor,
	imageHighlightBoxShadowWidth,
}) => [
	<Inspector/>,

	<PanelBody
		title={'Grid settings'}
		initialOpen={ true }
	>

		<TextControl
			label={ __( 'Item Width', 'cgb'  ) }
			value={ itemWidth }
			type={ 'number' }
			onChange={ ( newVal ) => setAttributes( { itemWidth: newVal } ) }
		/>

		<SelectControl
			label={ __( 'Image Hover Effect', 'cgb' ) }
			value={ imageHoverEffect }
			options={ [
				{ label: __( 'None', 'cgb' ), value: 'none' },
				{ label: __( 'Scale', 'cgb' ), value: 'scale' },
			] }
			onChange={ ( newVal ) => setAttributes( { imageHoverEffect: newVal } ) }
		/>

		<SelectControl
			label={ __( 'Image Highlight Effect', 'cgb' ) }
			value={ imageHighlightEffect }
			options={ [
				{ label: __( 'None', 'cgb' ), value: 'none' },
				{ label: __( 'Box Shadow', 'cgb' ), value: 'boxShadow' },
			] }
			onChange={ ( newVal ) => setAttributes( { imageHighlightEffect: newVal } ) }
		/>

		{ 'boxShadow' === imageHighlightEffect && [

			<ColorPalette
				value={ imageHighlightBoxShadowColor }
				onChange={ ( newVal ) => undefined !== newVal
					? setAttributes( { imageHighlightBoxShadowColor: newVal } )
					: setAttributes( { imageHighlightBoxShadowColor: defaults.imageHighlightBoxShadowColor } )
				}
			/>,

			<TextControl
				label={ __( 'Image Highlight Box Shadow width', 'cgb' ) }
				value={ imageHighlightBoxShadowWidth }
				type={ 'number' }
				onChange={ ( newVal ) => setAttributes( { imageHighlightBoxShadowWidth: newVal } ) }
			/>
		]}

	</PanelBody>,

];

cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};
cgbBlocks.components.GridInspector = GridInspector;

export default GridInspector;
