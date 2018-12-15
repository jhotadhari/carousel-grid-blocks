/**
 * External dependencies
 */
import {
	reject,
	findIndex,
	find,
	get,
} from 'lodash';

/**
 * WordPress dependencies
 */
const {
	__,
	sprintf,
} = wp.i18n;
const {
    TextControl,
    SelectControl,
    PanelBody,
    PanelRow,
    TreeSelect,
} = wp.components;
const {
	withSelect,
} = wp.data;

const InspectorPanelGroupSettings = ({
	blockGroupId,
	updateSetting,
	transitionTime,
}) => {

	const ChooseSource = get( cgbBlocks, ['components',blockGroupId,'ChooseSource'] );

	return <>

		<PanelBody
			title={ __( 'Block group settings', 'cgb' ) }
			initialOpen={ false }
			className={ 'cgb-inspector-panel' }
		>

			<div style={ { margin: '0 0 1em 0' } }>
				{ __( 'These settings apply to all blocks in this group.', 'cgb' ) }
			</div>

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
				<ChooseSource/>

			</PanelBody>

		</PanelBody>
	</>;
};

export default InspectorPanelGroupSettings;
