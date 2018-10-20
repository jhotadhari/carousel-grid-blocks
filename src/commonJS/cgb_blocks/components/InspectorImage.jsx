/**
 * External dependencies
 */
import {
	// reject,
	// findIndex,
	// find,
	get,
} from 'lodash';

/**
 * WordPress dependencies
 */
const {
	__,
	// sprintf,
} = wp.i18n;
const {
    TextControl,
    SelectControl,
    PanelBody,
    ColorPalette,
    BaseControl,
} = wp.components;

/**
 * Internal dependencies
 */
import getCgbDefault					from '../getCgbDefault';
import getInspectorOptions				from '../getInspectorOptions';
import ColorPaletteAlpha				from './ColorPaletteAlpha.jsx';

let InspectorImage = ({
	setAttributes,
	include,
	imageCaptionSettings,
	imageHoverEffect,
	imageHoverEffectSettings,
	imageHighlightEffect,
	imageHighlightEffectSettings,

}) => <PanelBody
	title={'Image settings'}
	icon="format-image"
	initialOpen={ false }
	className={ 'cgb-inspector-panel' }
>

	{ include.includes( 'imageCaption' ) &&
		<PanelBody
			title={'Caption'}
			initialOpen={ false }
		>

			<SelectControl
				label={ __( 'Show Caption', 'expa' ) }
				value={ get( imageCaptionSettings, ['show'] ) }
				options={ getInspectorOptions( 'imageCaptionShow' ) }
					onChange={ ( newVal ) => setAttributes( {
						imageCaptionSettings: JSON.stringify( {
							...imageCaptionSettings,
							show: newVal,
						} )
					} ) }
			/>

			{ 'hide' !== get( imageCaptionSettings, ['show'] ) && <>

				<SelectControl
					label={ __( 'Position', 'cgb' ) }
					value={ get( imageCaptionSettings, ['position'] ) }
					options={ getInspectorOptions( 'imageCaptionPosition' ) }
						onChange={ ( newVal ) => setAttributes( {
							imageCaptionSettings: JSON.stringify( {
								...imageCaptionSettings,
								position: newVal,
							} )
						} ) }
				/>

				<div
					className={ 'cgb-inspector-flex-row' }
				>
					<TextControl
						label={ __( 'Margin', 'cgb' ) }
						value={ get( imageCaptionSettings, ['margin'] ) }
						onChange={ ( newVal ) => setAttributes( {
							imageCaptionSettings: JSON.stringify( {
								...imageCaptionSettings,
								margin: newVal,
							} )
						} ) }
					/>

					<TextControl
						label={ __( 'Padding', 'cgb' ) }
						value={ get( imageCaptionSettings, ['padding'] ) }
						onChange={ ( newVal ) => setAttributes( {
							imageCaptionSettings: JSON.stringify( {
								...imageCaptionSettings,
								padding: newVal,
							} )
						} ) }
					/>
				</div>

				<div
					className={ 'cgb-inspector-flex-row' }
				>
					<BaseControl
						label={ __( 'Background', 'cgb' ) }
					>
						<ColorPaletteAlpha

							value={ get( imageCaptionSettings, ['backgroundColor'] ) }
							onChange={ ( newVal ) => setAttributes( {
								imageCaptionSettings: JSON.stringify( {
									...imageCaptionSettings,
									backgroundColor: newVal.rgb,
								} )
							} ) }
						/>
					</BaseControl>

					<BaseControl
						label={ __( 'Font Color', 'cgb' ) }
					>
						<ColorPalette
							value={ get( imageCaptionSettings, ['color'] ) }
							onChange={ ( newVal ) => setAttributes( {
								imageCaptionSettings: JSON.stringify( {
									...imageCaptionSettings,
									color: newVal,
								} )
							} ) }
						/>
					</BaseControl>
				</div>

				<SelectControl
					multiple
					label={ __( 'Parts', 'cgb' ) }
					value={ get( imageCaptionSettings, ['parts'] ) }
					options={ getInspectorOptions( 'imageCaptionParts' ) }
						onChange={ ( newVal ) => setAttributes( {
							imageCaptionSettings: JSON.stringify( {
								...imageCaptionSettings,
								parts: newVal,
							} )
						} ) }
				/>

			</> }

		</PanelBody>
	}

	{ include.includes( 'imageHoverEffect' ) &&
		<PanelBody
			title={'Hover Effect'}
			initialOpen={ false }
		>
			<SelectControl
				label={ __( 'Hover Effect', 'cgb' ) }
				value={ imageHoverEffect }
				options={ getInspectorOptions( 'imageHoverEffect' ) }
				onChange={ ( newVal ) => setAttributes( { imageHoverEffect: newVal } ) }
			/>
		</PanelBody>
	}

	{ include.includes( 'imageHighlightEffect' ) &&
		<PanelBody
			title={'Highlight Effect'}
			initialOpen={ false }
		>
			<SelectControl
				label={ __( 'Highlight Effect', 'cgb' ) }
				value={ imageHighlightEffect }
				options={ getInspectorOptions( 'imageHighlightEffect' ) }
				onChange={ ( newVal ) => setAttributes( { imageHighlightEffect: newVal } ) }
			/>

			{ 'boxShadow' === imageHighlightEffect && <>

				<BaseControl
					label={ __( 'Box shadow color', 'cgb' ) }
				>
					<ColorPaletteAlpha
						value={ get( imageHighlightEffectSettings, ['boxShadowColor'] ) }
						onChange={ ( newVal ) => setAttributes( {
							imageHighlightEffectSettings: JSON.stringify( {
								...imageHighlightEffectSettings,
								boxShadowColor: undefined !== newVal ? newVal.rgb : get( getCgbDefault( 'imageHighlightEffectSettings' ), ['boxShadowColor'] ),
							} )
						} ) }
					/>
				</BaseControl>

				<TextControl
					label={ __( 'Box shadow width', 'cgb' ) }
					value={ get( imageHighlightEffectSettings, ['boxShadowWidth'] ) }
					type={ 'number' }
					onChange={ ( newVal ) => setAttributes( {
						imageHighlightEffectSettings: JSON.stringify( {
							...imageHighlightEffectSettings,
							boxShadowWidth: undefined !== newVal ? newVal : get( getCgbDefault( 'imageHighlightEffectSettings' ), ['boxShadowWidth'] ),
						} )
					} ) }
				/>
			</> }
		</PanelBody>
	}

</PanelBody>;


export default InspectorImage;
