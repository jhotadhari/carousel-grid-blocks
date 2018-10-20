/**
 * External dependencies
 */
import {
	get,
} from 'lodash';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
    PanelBody,
    TextControl,
    SelectControl,
} = wp.components;

/**
 * Internal dependencies
 */
import InspectorCommon			from './InspectorCommon.jsx';
import InspectorImage			from './InspectorImage.jsx';

const GridInspector = ({
	setAttributes,
	gridSettings,
	imageCaptionSettings,
	imageHoverEffect,
	imageHoverEffectSettings,
	imageHighlightEffect,
	imageHighlightEffectSettings,
}) => <>
	<InspectorCommon/>


	<PanelBody
		title={'Grid settings'}
		icon="grid-view"
		initialOpen={ false }
		className={ 'cgb-inspector-panel' }
	>

		<TextControl
			label={ __( 'Columns', 'cgb'  ) + ' [int|"auto"]' }
			value={ get( gridSettings, ['columns'] ) }
			onChange={ ( newVal ) => setAttributes( {
				gridSettings: JSON.stringify( {
					...gridSettings,
					columns: newVal,
				} ),
			} ) }
		/>

		<TextControl
			label={ __( 'Margin', 'cgb'  ) + ' [px]' }
			value={ get( gridSettings, ['margin'] ) }
			type={ 'number' }
			onChange={ ( newVal ) => setAttributes( {
				gridSettings: JSON.stringify( {
					...gridSettings,
					margin: newVal,
				} ),
			} ) }
		/>

	</PanelBody>

	<InspectorImage
		setAttributes={ setAttributes }
		include={ [
			'imageCaption',
			'imageHoverEffect',
			'imageHighlightEffect',
		] }
		imageCaptionSettings={ imageCaptionSettings }
		imageHoverEffect={ imageHoverEffect }
		imageHoverEffectSettings={ imageHoverEffectSettings }
		imageHighlightEffect={ imageHighlightEffect }
		imageHighlightEffectSettings={ imageHighlightEffectSettings }
	/>

</>;

export default GridInspector;
