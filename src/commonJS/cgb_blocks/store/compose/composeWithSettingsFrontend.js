/**
 * WordPress dependencies
 */
const {
	compose
} = wp.compose;

const {
	withSelect,
} = wp.data;

const composeWithSettingsFrontend = ( component, settingKeys ) => compose( [
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
] )( component );

export default composeWithSettingsFrontend;