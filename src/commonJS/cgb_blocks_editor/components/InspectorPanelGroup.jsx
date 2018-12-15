/**
 * External dependencies
 */
import {
	mapValues,
	get,
} from 'lodash';

/**
 * WordPress dependencies
 */
const {
	__,
} = wp.i18n;
const {
    PanelBody,
    Button,
} = wp.components;
const {
    select,
} = wp.data;

/**
 * Internal dependencies
 */
import Icon 							from './Icon.jsx';

const InspectorPanelGroup = ({
	setAttributes,
	blockGroupId,
	blockName,
}) => {

	const InspectorPanelGroupSettings = get( cgbBlocks, ['components',blockGroupId,'InspectorPanelGroupSettings'] );

	return <>
		<PanelBody
			title={ __( 'Block group', 'cgb' ) }
			icon={ <Icon type={ 'blockGroup' }/> }
			initialOpen={ false }
			className={ 'cgb-inspector-panel' }
		>

			<div style={ { margin: '0 0 1em 0' } }>
				{ __( 'Connected with block group', 'cgb' ) }: <strong>{ blockGroupId }</strong>
			</div>

			<Button
				className={ 'cgb-button' }
				onClick={ () => {
					const blockType =  select( 'core/blocks' ).getBlockType( blockName );
					setAttributes( {
						...( mapValues( blockType.attributes, obj => obj.default ) ),
						blockGroupId: '',
						setupDone: false,
					} );
				} }
			>
				{ __( 'Disconnect', 'cgb' ) }
			</Button>

			<InspectorPanelGroupSettings
				setAttributes={ setAttributes }
				blockGroupId={ blockGroupId }
			/>

		</PanelBody>
	</>;
};

export default InspectorPanelGroup;