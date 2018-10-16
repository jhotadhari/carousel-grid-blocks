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
    ColorPalette,
} = wp.components;
const { applyFilters } = wp.hooks;

/**
 * Internal dependencies
 */
import Inspector 				from './Inspector.jsx';
import getCgbDefault			from '../getCgbDefault';

const getOptions = key => {
	let options = [];
	switch( key ) {
		case 'imageHoverEffect':
			options = [
				{ label: __( 'None', 'cgb' ), value: 'none' },
				{ label: __( 'Scale', 'cgb' ), value: 'scale' },
			];
			break;
		case 'imageHighlightEffect':
			options = [
				{ label: __( 'None', 'cgb' ), value: 'none' },
				{ label: __( 'Box Shadow', 'cgb' ), value: 'boxShadow' },
			];
			break;
	}
	return applyFilters( 'cgb/GridInspector/options/' + key, options );
}

const GridInspector = ({
	setAttributes,
	gridSettings,
	imageHoverEffect,
	imageHoverEffectSettings,
	imageHighlightEffect,
	imageHighlightEffectSettings,
}) => [
	<Inspector/>,

	<PanelBody
		title={'Grid settings'}
		icon="grid-view"
		initialOpen={ true }
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
			label={ __( 'Image Hover Effect', 'cgb' ) }
			value={ imageHoverEffect }
			options={ getOptions( 'imageHoverEffect' ) }
			onChange={ ( newVal ) => setAttributes( { imageHoverEffect: newVal } ) }
		/>

		<SelectControl
			label={ __( 'Image Highlight Effect', 'cgb' ) }
			value={ imageHighlightEffect }
			options={ getOptions( 'imageHighlightEffect' ) }
			onChange={ ( newVal ) => setAttributes( { imageHighlightEffect: newVal } ) }
		/>

		{ 'boxShadow' === imageHighlightEffect && [

			<ColorPalette
				value={ get( imageHighlightEffectSettings, ['boxShadowColor'] ) }
				onChange={ ( newVal ) => setAttributes( {
					imageHighlightEffectSettings: JSON.stringify( {
						...imageHighlightEffectSettings,
						boxShadowColor: undefined !== newVal ? newVal : get( getCgbDefault( 'imageHighlightEffectSettings' ), ['boxShadowColor'] ),
					} )
				} ) }
			/>,

			<TextControl
				label={ __( 'Image Highlight Box Shadow width', 'cgb' ) }
				value={ get( imageHighlightEffectSettings, ['boxShadowWidth'] ) }
				type={ 'number' }
				onChange={ ( newVal ) =>  setAttributes( {
					imageHighlightEffectSettings: JSON.stringify( {
						...imageHighlightEffectSettings,
						boxShadowWidth: undefined !== newVal ? newVal : get( getCgbDefault( 'imageHighlightEffectSettings' ), ['boxShadowWidth'] ),
					} )
				} ) }
			/>
		]}

	</PanelBody>,

];

export default GridInspector;
