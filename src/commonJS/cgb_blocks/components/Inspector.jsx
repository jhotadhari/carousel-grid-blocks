/**
 * External dependencies
 */
import {
	reject,
	findIndex,
} from 'underscore';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
    TextControl,
    SelectControl,
    // Panel,
    PanelBody,
    PanelRow,
} = wp.components;



const {
	withSelect,
	// select,
} = wp.data;
/**
 * Internal dependencies
 */
import composeWithSettingsEditor 		from '../store/compose/composeWithSettingsEditor.js';

let Inspector = ({
	updateSetting,
	transitionTime,
	itemsSource,
	posttypes,
}) => [
	<PanelBody
		title={ __( 'Common settings for all cgb blocks within this post', 'cgb' ) }
		icon="welcome-widgets-menus"
		initialOpen={ true }
		className={ 'cgb-inspector-panel' }
	>
		<TextControl
			label={ 'Transition Time [ms]' }
			value={ transitionTime }
			type={ 'number' }
			onChange={ ( newVal ) => updateSetting( 'transitionTime', parseInt( newVal ) ) }
		/>

		<PanelBody
			title={ __( 'Source', 'cgb' ) }
			initialOpen={ true }
		>
				<SelectControl
					value={ itemsSource.key }
					options={ [
						{ label: 'Custom', value: 'custom' },
						{ label: 'Post Type Archive', value: 'archivePostType' },
					] }
					onChange={ ( newVal ) => updateSetting( 'itemsSource', {
						...itemsSource,
						key: newVal,
					} ) }
				/>


				{ 'archivePostType' === itemsSource.key &&

					<SelectControl
						label={ __( 'Post Type', 'cgb' ) }
						value={ findIndex( posttypes, posttype => posttype.name === itemsSource.options.posttype ) }
						options={ [...posttypes].map( ( posttype, index ) => {
							return { label: posttype.name, value: index };
						} ) }
						onChange={ ( index ) => {
							let posttype = posttypes[index];
							updateSetting( 'itemsSource', {
								...itemsSource,
								options: {
									...itemsSource.options,
									posttype: posttype.name,
									baseURL: posttype.baseURL,
								},
							} )

						} }
					/>

				}

		</PanelBody>

	</PanelBody>,
];

Inspector = withSelect( ( select ) => {
	let posttypes = select( 'core' ).getEntitiesByKind( 'postType' );
	posttypes = reject( posttypes , posttype => {
		return [
			'wp_block',
			'attachment',
		].includes( posttype.name );
	});
	return {
		posttypes: posttypes,
	}
} )( Inspector );

Inspector = composeWithSettingsEditor( Inspector, [
	'transitionTime',
	'itemsSource',
] );

export default Inspector;