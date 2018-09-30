/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
    PanelBody,
    TextControl,
} = wp.components;

/**
 * Internal dependencies
 */
import composeWithSettingsEditor 		from '../store/compose/composeWithSettingsEditor.js';

const Inspector = ({
	transitionTime,
	updateSetting,
}) => [
	<PanelBody
		title={ __( 'Common settings for all cgb blocks within this post', 'cgb' ) }
		initialOpen={ true }
	>
		<TextControl
			label={ 'Transition Time [ms]' }
			value={ transitionTime }
			type={ 'number' }
			onChange={ ( newTransitionTime ) => updateSetting( 'transitionTime', parseInt( newTransitionTime ) ) }
		/>
	</PanelBody>,
];

export default composeWithSettingsEditor( Inspector, [
	'transitionTime',
] );
