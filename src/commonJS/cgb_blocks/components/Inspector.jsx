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
import composeWithSettings 					from '../store/composeWithSettings.js';

class Inspector extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		const {
			transitionTime,
			updateSetting,
		} = this.props;

		return ([

			<PanelBody
				title={'Common settings for all cgb blocks'}
				initialOpen={ true }
			>
				<TextControl
					label={ 'Transition Time [ms]' }
					value={ transitionTime }
					type={ 'number' }
					onChange={ ( newTransitionTime ) => updateSetting( 'transitionTime', parseInt( newTransitionTime ) ) }
				/>
			</PanelBody>,

		])
	}
}

export default composeWithSettings( Inspector, [
	'transitionTime',
] );
