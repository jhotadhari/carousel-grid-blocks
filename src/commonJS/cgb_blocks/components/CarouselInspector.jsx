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
import InspectorCommon 					from './InspectorCommon.jsx';
import InspectorImage					from './InspectorImage.jsx';

const CarouselInspector = ({
	setAttributes,
	imageControlsSettings,
	imageCaptionSettings,
	imageHoverEffect,
	imageHoverEffectSettings,
}) => <>
	<InspectorCommon/>

	<PanelBody
		title={'Carousel settings'}
		initialOpen={ false }
		icon="format-gallery"
		className={ 'cgb-inspector-panel' }
	>
		<span>
			nix ???
		</span>
	</PanelBody>

	<InspectorImage
		setAttributes={ setAttributes }
		include={ [
			'imageCaption',
			'imageHoverEffect',
			'imageControls',
		] }
		imageControlsSettings={ imageControlsSettings }
		imageCaptionSettings={ imageCaptionSettings }
		imageHoverEffect={ imageHoverEffect }
		imageHoverEffectSettings={ imageHoverEffectSettings }
	/>
</>;

export default CarouselInspector;
