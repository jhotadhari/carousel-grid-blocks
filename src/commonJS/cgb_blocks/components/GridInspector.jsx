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
import getInspectorOptions		from '../getInspectorOptions';

const GridInspector = ({
	setAttributes,
	gridSettings,
	imageControlsSettings,
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

		<SelectControl
			label={ __( 'Item sizes and aspect ratio', 'cgb' ) }
			value={ get( gridSettings, ['itemSizes'] ) }
			options={ getInspectorOptions( 'gridItemSizes' ) }
				onChange={ ( newVal ) => setAttributes( {
					gridSettings: JSON.stringify( {
						...gridSettings,
						itemSizes: newVal,
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
			'imageControls',
		] }
		imageControlsSettings={ imageControlsSettings }
		imageCaptionSettings={ imageCaptionSettings }
		imageHoverEffect={ imageHoverEffect }
		imageHoverEffectSettings={ imageHoverEffectSettings }
		imageHighlightEffect={ imageHighlightEffect }
		imageHighlightEffectSettings={ imageHighlightEffectSettings }
		blockName={ 'cgb/grid' }
	/>

</>;

export default GridInspector;
