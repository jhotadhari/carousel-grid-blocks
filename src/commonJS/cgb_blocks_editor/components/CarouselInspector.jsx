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
    Button,
} = wp.components;

/**
 * Internal dependencies
 */
import getInspectorOptions				from '../getInspectorOptions';
import InspectorPanelImage					from './InspectorPanelImage.jsx';
import Icon 							from './Icon.jsx';

const CarouselInspector = ({
	blockGroupId,
	setAttributes,
	carouselSettings,
	imageControlsSettings,
	imageCaptionSettings,
	imageHoverEffect,
	imageHoverEffectSettings,
}) => {

	const InspectorPanelGroup = get( cgbBlocks, ['components',blockGroupId,'InspectorPanelGroup'] );

	return <>

		<InspectorPanelGroup
			setAttributes={ setAttributes }
			blockGroupId={ blockGroupId }
			blockName={ 'cgb/carousel' }
		/>

		<PanelBody
			title={'Carousel settings'}
			initialOpen={ false }
			icon="format-gallery"
			className={ 'cgb-inspector-panel' }
		>

			<div className={ 'cgb-controls-box' }>

				<SelectControl
					label={ __( 'Image Fit', 'cgb'  ) }
					value={ get( carouselSettings, ['imageFit'] ) }
					options={ getInspectorOptions( 'imageFit' ) }
					onChange={ ( newVal ) => setAttributes( {
						carouselSettings: JSON.stringify( {
							...carouselSettings,
							imageFit: newVal,
						} ),
					} ) }
				/>

				{ 'cover' === get( carouselSettings, ['imageFit'] ) && <>

					<BaseControl
						label={ __( 'Width', 'cgb'  ) }
						className={ 'cgb-columns-field' }
					>

						<TextControl
							value={ get( carouselSettings, ['width', 'value'] ) }
							type={ 'number' }
							onChange={ ( newVal ) => setAttributes( {
								carouselSettings: JSON.stringify( {
									...carouselSettings,
									width: {
										...get( carouselSettings, ['width'] ),
										value: newVal,
									},
								} ),
							} ) }
						/>

						<SelectControl
							value={ get( carouselSettings, ['width', 'unit'] ) }
							className={ 'cgb-columns-field-30 cgb-columns-field-no-margin' }
							options={ [
								{ label: 'px', value: 'px' },
								{ label: '%', value: 'percent' },
							] }
							onChange={ ( newVal ) => setAttributes( {
								carouselSettings: JSON.stringify( {
									...carouselSettings,
									width: {
										...get( carouselSettings, ['width'] ),
										unit: newVal,
									},
								} ),
							} ) }
						/>
					</BaseControl>

					<BaseControl
						label={ __( 'Height', 'cgb'  ) }
						className={ 'cgb-columns-field' }
					>

						<TextControl
							value={ get( carouselSettings, ['height', 'value'] ) }
							type={ 'number' }
							onChange={ ( newVal ) => setAttributes( {
								carouselSettings: JSON.stringify( {
									...carouselSettings,
									height: {
										...get( carouselSettings, ['height'] ),
										value: newVal,
									},
								} ),
							} ) }
						/>

						<SelectControl
							value={ get( carouselSettings, ['height', 'unit'] ) }
							className={ 'cgb-columns-field-30 cgb-columns-field-no-margin' }
							options={ [
								{ label: 'px', value: 'px' },
								{ label: '%', value: 'percent' },
							] }
							onChange={ ( newVal ) => setAttributes( {
								carouselSettings: JSON.stringify( {
									...carouselSettings,
									height: {
										...get( carouselSettings, ['height'] ),
										unit: newVal,
									},
								} ),
							} ) }
						/>
					</BaseControl>

				</> }

				{ 'contain' === get( carouselSettings, ['imageFit'] ) && <>

					<SelectControl
						label={ __( 'Inner Align', 'cgb'  ) }
						value={ get( carouselSettings, ['innerAlign'] ) }
						options={ [
							{ label: __( 'Left', 'cgb' ), value: 'left' },
							{ label: __( 'Center', 'cgb' ), value: 'center' },
							{ label: __( 'Right', 'cgb' ), value: 'right' },
						] }
						onChange={ ( newVal ) => setAttributes( {
							carouselSettings: JSON.stringify( {
								...carouselSettings,
								innerAlign: newVal,
							} ),
						} ) }
					/>

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
							className={ 'cgb-columns-field-30 cgb-columns-field-no-margin' }
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
								className={ 'cgb-columns-field-30 cgb-columns-field-no-margin' }
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
								className={ 'cgb-columns-field-30 cgb-columns-field-no-margin' }
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

				</> }

			</div>






			<div className={ get( carouselSettings, ['showArrows'] ) && 'cgb-controls-box' }>
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
				{ get( carouselSettings, ['showArrows'] ) &&
					<SelectControl
						label={ __( 'arrowsPosition', 'cgb'  ) }
						value={ get( carouselSettings, ['arrowsPosition'] ) }
						options={ getInspectorOptions( 'arrowsPosition' ) }
						onChange={ ( newVal ) => setAttributes( {
							carouselSettings: JSON.stringify( {
								...carouselSettings,
								arrowsPosition: newVal,
							} ),
						} ) }
					/>
				}
			</div>




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




			<div className={ get( carouselSettings, ['showIndicators'] ) && 'cgb-controls-box' }>
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
				{ get( carouselSettings, ['showIndicators'] ) &&
					<SelectControl
						label={ __( 'indicatorsPosition', 'cgb'  ) }
						value={ get( carouselSettings, ['indicatorsPosition'] ) }
						options={ getInspectorOptions( 'indicatorsPosition' ) }
						onChange={ ( newVal ) => setAttributes( {
							carouselSettings: JSON.stringify( {
								...carouselSettings,
								indicatorsPosition: newVal,
							} ),
						} ) }
					/>
				}
			</div>

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


			<div className={ get( carouselSettings, ['autoPlay'] ) && 'cgb-controls-box' }>
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
			</div>

			<SelectControl
				label={ __( 'Animation', 'cgb'  ) }
				value={ get( carouselSettings, ['animation'] ) }
				options={ getInspectorOptions( 'animation' ) }
				onChange={ ( newVal ) => setAttributes( {
					carouselSettings: JSON.stringify( {
						...carouselSettings,
						animation: newVal,
					} ),
				} ) }
			/>

		</PanelBody>

		<InspectorPanelImage
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
			blockName={ 'cgb/carousel' }
		/>
	</>;

};

export default CarouselInspector;
