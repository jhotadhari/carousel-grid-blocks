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

const composeWithSettingsEditor = ( component, settingKeys, blockGroupId ) => compose( [
	withSelect( ( select ) => {
		const props = {};

		if ( ! settingKeys ) return props;

		const {
			getSetting,
		} = select( blockGroupId );

		[...settingKeys].map( ( settingKey ) => {
			props[settingKey] = getSetting( settingKey );
		});

		return props;
	} ),
	withDispatch( ( dispatch, ownProps ) => {

		const {
			updateSetting,
		} = dispatch( blockGroupId );

		if ( ! settingKeys ) return props;

		return {
			updateSetting: concatenateReducers([
				updateSetting,
			]),
		};

	} ),
] )( component );

export default composeWithSettingsEditor;
