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
    SelectControl,
    TextControl,
    BaseControl,
    ToggleControl,
} = wp.components;

/**
 * Internal dependencies
 */
import InspectorCommon 					from './InspectorCommon.jsx';
import InspectorImage					from './InspectorImage.jsx';

const CarouselInspector = ({
	setAttributes,
	carouselSettings,
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

		<BaseControl
			label={ __( 'Max Width', 'cgb'  ) }
			className={ 'cgb-columns-field' }
		>

			<TextControl
				value={ get( carouselSettings, ['maxWidth', 'value'] ) }
				type={ 'number' }
				onChange={ ( newVal ) => setAttributes( {
					carouselSettings: JSON.stringify( {
						...carouselSettings,
						maxWidth: {
							...get( carouselSettings, ['maxWidth'] ),
							value: newVal,
						},
					} ),
				} ) }
			/>

			<SelectControl
				value={ get( carouselSettings, ['maxWidth', 'unit'] ) }
				className={ 'cgb-columns-field-30' }
				options={ [
					{ label: 'px', value: 'px' },
					{ label: '%', value: 'percent' },
				] }
				onChange={ ( newVal ) => setAttributes( {
					carouselSettings: JSON.stringify( {
						...carouselSettings,
						maxWidth: {
							...get( carouselSettings, ['maxWidth'] ),
							unit: newVal,
						},
					} ),
				} ) }
			/>
		</BaseControl>

		<ToggleControl
			label={ __( 'Set Max Height', 'cgb'  ) }
			checked={ get( carouselSettings, ['maxHeight', 'setMaxHeight'] ) }
			onChange={ ( newVal ) => setAttributes( {
				carouselSettings: JSON.stringify( {
					...carouselSettings,
					maxHeight: {
						...get( carouselSettings, ['maxHeight'] ),
						setMaxHeight: newVal === true,
					},
				} ),
			} ) }
		/>
		{ get( carouselSettings, ['maxHeight', 'setMaxHeight'] ) &&
			<BaseControl
				className={ 'cgb-columns-field' }
			>

				<TextControl
					value={ get( carouselSettings, ['maxHeight', 'value'] ) }
					type={ 'number' }
					onChange={ ( newVal ) => setAttributes( {
						carouselSettings: JSON.stringify( {
							...carouselSettings,
							maxHeight: {
								...get( carouselSettings, ['maxHeight'] ),
								value: newVal,
							},
						} ),
					} ) }
				/>

				<SelectControl
					value={ get( carouselSettings, ['maxHeight', 'unit'] ) }
					className={ 'cgb-columns-field-30' }
					options={ [
						{ label: 'px', value: 'px' },
					] }
					onChange={ ( newVal ) => setAttributes( {
						carouselSettings: JSON.stringify( {
							...carouselSettings,
							maxHeight: {
								...get( carouselSettings, ['maxHeight'] ),
								unit: newVal,
							},
						} ),
					} ) }
				/>
			</BaseControl>
		}

		<ToggleControl
			label={ __( 'Resize to screen height', 'cgb'  ) }
			checked={ get( carouselSettings, ['resizeToScreenHeight', 'resize'] ) }
			onChange={ ( newVal ) => setAttributes( {
				carouselSettings: JSON.stringify( {
					...carouselSettings,
					resizeToScreenHeight: {
						...get( carouselSettings, ['resizeToScreenHeight'] ),
						resize: newVal === true,
					},
				} ),
			} ) }
		/>
		{ get( carouselSettings, ['resizeToScreenHeight', 'resize'] ) &&

			<BaseControl
				className={ 'cgb-columns-field' }
				label={ __( 'Screen Height Margin', 'cgb'  ) }
			>

				<TextControl
					value={ get( carouselSettings, ['resizeToScreenHeight', 'value'] ) }
					type={ 'number' }
					onChange={ ( newVal ) => setAttributes( {
						carouselSettings: JSON.stringify( {
							...carouselSettings,
							resizeToScreenHeight: {
								...get( carouselSettings, ['resizeToScreenHeight'] ),
								value: newVal,
							},
						} ),
					} ) }
				/>

				<SelectControl
					value={ get( carouselSettings, ['resizeToScreenHeight', 'unit'] ) }
					className={ 'cgb-columns-field-30' }
					options={ [
						{ label: 'px', value: 'px' },
						{ label: '%', value: 'percent' },
					] }
					onChange={ ( newVal ) => setAttributes( {
						carouselSettings: JSON.stringify( {
							...carouselSettings,
							resizeToScreenHeight: {
								...get( carouselSettings, ['resizeToScreenHeight'] ),
								unit: newVal,
							},
						} ),
					} ) }
				/>
			</BaseControl>
		}

		<ToggleControl
			label={ __( 'showArrows', 'cgb'  ) }
			checked={ get( carouselSettings, ['showArrows'] ) }
			onChange={ ( newVal ) => setAttributes( {
				carouselSettings: JSON.stringify( {
					...carouselSettings,
					showArrows: newVal === true,
				} ),
			} ) }
		/>

		<ToggleControl
			label={ __( 'showStatus', 'cgb'  ) }
			checked={ get( carouselSettings, ['showStatus'] ) }
			onChange={ ( newVal ) => setAttributes( {
				carouselSettings: JSON.stringify( {
					...carouselSettings,
					showStatus: newVal === true,
				} ),
			} ) }
		/>

		<ToggleControl
			label={ __( 'showIndicators', 'cgb'  ) }
			checked={ get( carouselSettings, ['showIndicators'] ) }
			onChange={ ( newVal ) => setAttributes( {
				carouselSettings: JSON.stringify( {
					...carouselSettings,
					showIndicators: newVal === true,
				} ),
			} ) }
		/>

		<ToggleControl
			label={ __( 'infiniteLoop', 'cgb'  ) }
			checked={ get( carouselSettings, ['infiniteLoop'] ) }
			onChange={ ( newVal ) => setAttributes( {
				carouselSettings: JSON.stringify( {
					...carouselSettings,
					infiniteLoop: newVal === true,
				} ),
			} ) }
		/>

		<ToggleControl
			label={ __( 'autoPlay', 'cgb'  ) }
			checked={ get( carouselSettings, ['autoPlay'] ) }
			onChange={ ( newVal ) => setAttributes( {
				carouselSettings: JSON.stringify( {
					...carouselSettings,
					autoPlay: newVal === true,
				} ),
			} ) }
		/>
		{ get( carouselSettings, ['autoPlay'] ) && <>
			<TextControl
				label={ __( 'autoPlay interval', 'cgb'  ) }
				value={ get( carouselSettings, ['interval'] ) }
				type={ 'number' }
				onChange={ ( newVal ) => setAttributes( {
					carouselSettings: JSON.stringify( {
						...carouselSettings,
						interval: newVal,
					} ),
				} ) }
			/>

			<ToggleControl
				label={ __( 'stopOnHover', 'cgb'  ) }
				checked={ get( carouselSettings, ['stopOnHover'] ) }
				onChange={ ( newVal ) => setAttributes( {
					carouselSettings: JSON.stringify( {
						...carouselSettings,
						stopOnHover: newVal === true,
					} ),
				} ) }
			/>
		</> }

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
