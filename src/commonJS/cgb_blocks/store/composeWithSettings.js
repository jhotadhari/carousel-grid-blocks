/**
 * External dependencies
 */
import concatenateReducers from 'redux-concatenate-reducers'

/**
 * WordPress dependencies
 */
const {
	compose
} = wp.compose;

const {
	withSelect,
	withDispatch,
} = wp.data;

const composeWithSettings = ( component, settingKeys ) => compose( [
	withSelect( ( select ) => {
		const props = {};

		if ( ! settingKeys ) return props;

		const {
			getSetting,
		} = select( 'cgb-store' );

		[...settingKeys].map( ( settingKey ) => {
			props[settingKey] = getSetting( settingKey );
		});

		return props;
	} ),
	withDispatch( ( dispatch, ownProps ) => {

		const {
			pushSettingsToAttribues,
			updateSetting,
		} = dispatch( 'cgb-store' );

		if ( ! settingKeys ) return props;

		return {
			updateSetting: concatenateReducers([
				updateSetting,
				pushSettingsToAttribues,
			]),
		};

	} ),
] )( component );

export default composeWithSettings;