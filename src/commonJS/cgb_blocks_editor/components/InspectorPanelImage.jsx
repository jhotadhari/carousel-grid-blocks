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
    ToggleControl,
} = wp.components;

/**
 * Internal dependencies
 */
import getInspectorOptions				from '../getInspectorOptions';
import ColorPaletteAlpha				from './ColorPaletteAlpha.jsx';

let InspectorPanelImage = ({
	setAttributes,
	include,
	imageControlsSettings,
	imageCaptionSettings,
	imageHoverEffect,
	imageHoverEffectSettings,
	imageHighlightEffect,
	imageHighlightEffectSettings,
	blockName,
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
				label={ __( 'Show Caption', 'cgb' ) }
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
					options={ getInspectorOptions( 'imageCaptionPosition', { blockName } ) }
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
					<ToggleControl
						label={ __( 'Custom Background Color', 'cgb'  ) }
						checked={ get( imageCaptionSettings, ['cutomBackgroundColor'] ) }
						onChange={ ( newVal ) => setAttributes( {
							imageCaptionSettings: JSON.stringify( {
								...imageCaptionSettings,
								cutomBackgroundColor: newVal,
							} ),
						} ) }
					/>

					<ColorPaletteAlpha
						value={ get( imageCaptionSettings, ['backgroundColor'] ) }
						className={ 'no-clear' }
						onChange={ ( newVal ) => setAttributes( {
							imageCaptionSettings: JSON.stringify( {
								...imageCaptionSettings,
								backgroundColor: newVal.rgb,
							} )
						} ) }
					/>
				</div>

				<div
					className={ 'cgb-inspector-flex-row' }
				>
					<ToggleControl
						label={ __( 'Custom Font Color', 'cgb'  ) }
						checked={ get( imageCaptionSettings, ['customColor'] ) }
						onChange={ ( newVal ) => setAttributes( {
							imageCaptionSettings: JSON.stringify( {
								...imageCaptionSettings,
								customColor: newVal,
							} ),
						} ) }
					/>

					<ColorPalette
						className={ 'no-clear' }
						value={ get( imageCaptionSettings, ['color'] ) }
						onChange={ ( newVal ) => setAttributes( {
							imageCaptionSettings: JSON.stringify( {
								...imageCaptionSettings,
								color: newVal,
							} )
						} ) }
					/>
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
						className={ 'no-clear' }
						value={ get( imageHighlightEffectSettings, ['boxShadowColor'] ) }
						onChange={ ( newVal ) => setAttributes( {
							imageHighlightEffectSettings: JSON.stringify( {
								...imageHighlightEffectSettings,
								boxShadowColor: undefined !== newVal ? newVal.rgb : get( imageHighlightEffectSettings, ['boxShadowColor'] ),
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
							boxShadowWidth: undefined !== newVal ? newVal : get( imageHighlightEffectSettings, ['boxShadowWidth'] ),
						} )
					} ) }
				/>
			</> }
		</PanelBody>
	}

	{ include.includes( 'imageControls' ) &&
		<PanelBody
			title={'Controls'}
			initialOpen={ false }
		>

			<SelectControl
				label={ __( 'Show Controls', 'cgb' ) }
				value={ get( imageControlsSettings, ['show'] ) }
				options={ getInspectorOptions( 'imageControlsShow' ) }
					onChange={ ( newVal ) => setAttributes( {
						imageControlsSettings: JSON.stringify( {
							...imageControlsSettings,
							show: newVal,
						} )
					} ) }
			/>

			{ 'hide' !== get( imageControlsSettings, ['show'] ) && <>

				<SelectControl
					label={ __( 'Position', 'cgb' ) }
					value={ get( imageControlsSettings, ['position'] ) }
					options={ getInspectorOptions( 'imageControlsPosition' ) }
						onChange={ ( newVal ) => setAttributes( {
							imageControlsSettings: JSON.stringify( {
								...imageControlsSettings,
								position: newVal,
							} )
						} ) }
				/>

				<div
					className={ 'cgb-inspector-flex-row' }
				>
					<TextControl
						label={ __( 'Margin', 'cgb' ) }
						value={ get( imageControlsSettings, ['margin'] ) }
						onChange={ ( newVal ) => setAttributes( {
							imageControlsSettings: JSON.stringify( {
								...imageControlsSettings,
								margin: newVal,
							} )
						} ) }
					/>

					<TextControl
						label={ __( 'Padding', 'cgb' ) }
						value={ get( imageControlsSettings, ['padding'] ) }
						onChange={ ( newVal ) => setAttributes( {
							imageControlsSettings: JSON.stringify( {
								...imageControlsSettings,
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
							className={ 'no-clear' }
							value={ get( imageControlsSettings, ['backgroundColor'] ) }
							onChange={ ( newVal ) => setAttributes( {
								imageControlsSettings: JSON.stringify( {
									...imageControlsSettings,
									backgroundColor: newVal.rgb,
								} )
							} ) }
						/>
					</BaseControl>

					{ false &&
						<BaseControl
							label={ __( 'Font Color', 'cgb' ) }
						>
							<ColorPalette
								className={ 'no-clear' }
								value={ get( imageControlsSettings, ['color'] ) }
								onChange={ ( newVal ) => setAttributes( {
									imageControlsSettings: JSON.stringify( {
										...imageControlsSettings,
										color: newVal,
									} )
								} ) }
							/>
						</BaseControl>
					}
				</div>

				<SelectControl
					multiple
					label={ __( 'Controls', 'cgb' ) }
					value={ get( imageControlsSettings, ['controls'] ) }
					options={ getInspectorOptions( 'imageControls' ) }
					onChange={ ( newVal ) => setAttributes( {
						imageControlsSettings: JSON.stringify( {
							...imageControlsSettings,
							controls: newVal,
						} )
					} ) }
				/>

				{ get( imageControlsSettings, ['controls'] ).includes( 'link' ) &&


					<PanelBody
						title={'Link Control'}
						initialOpen={ true }
					>

						<ToggleControl
							label={ 'Open link in new tab?' }
							checked={ get( imageControlsSettings, [ 'linkControlSettings', 'newTab' ] ) }
							onChange={ ( newVal ) => setAttributes( {
								imageControlsSettings: JSON.stringify( {
									...imageControlsSettings,
									linkControlSettings: {
										...get( imageControlsSettings, [ 'linkControlSettings' ] ),
										newTab: newVal,
									},
								} )
							} ) }
						/>

						<SelectControl
							label={ __( 'Link to', 'cgb' ) }
							value={  get( imageControlsSettings, [ 'linkControlSettings', 'linkTo' ] ) }
							options={ getInspectorOptions( 'imageControlsLinkLinkTo' ) }
							onChange={ ( newVal ) => setAttributes( {
								imageControlsSettings: JSON.stringify( {
									...imageControlsSettings,
									linkControlSettings: {
										...get( imageControlsSettings, [ 'linkControlSettings' ] ),
										linkTo: newVal,
									},
								} )
							} ) }
						/>

					</PanelBody>

				}

			</> }

		</PanelBody>
	}

</PanelBody>;


export default InspectorPanelImage;
