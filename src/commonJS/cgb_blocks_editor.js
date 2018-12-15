/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import {
	get,
} from 'lodash';

/**
 * Internal dependencies
 */
import registerCgbStore					 	from './cgb_blocks/store/registerCgbStoreEditor';
import setupItemAdminControlsMoveToIndex	from './cgb_blocks_editor/setup/setupItemAdminControlsMoveToIndex';
import setupItemAdminControlsDragHandle		from './cgb_blocks_editor/setup/setupItemAdminControlsDragHandle';
import setupItemAdminControls				from './cgb_blocks_editor/setup/setupItemAdminControls';
import setupItem							from './cgb_blocks_editor/setup/setupItem';
import setupGridItem						from './cgb_blocks_editor/setup/setupGridItem';
import setupGrid							from './cgb_blocks_editor/setup/setupGrid';
import setupCarousel			 			from './cgb_blocks_editor/setup/setupCarousel';
import setupFullscreen			 			from './cgb_blocks_editor/setup/setupFullscreen';
import setupChooseSource					from './cgb_blocks_editor/setup/setupChooseSource';
import setupPlaceholderChooseItems			from './cgb_blocks_editor/setup/setupPlaceholderChooseItems';
import setupInspectorPanelGroupSettings		from './cgb_blocks_editor/setup/setupInspectorPanelGroupSettings';
import setupInspectorPanelGroup	 			from './cgb_blocks_editor/setup/setupInspectorPanelGroup';
import setupGridInspector 					from './cgb_blocks_editor/setup/setupGridInspector';
import setupCarouselInspector 				from './cgb_blocks_editor/setup/setupCarouselInspector';
import setupToolbar 						from './cgb_blocks_editor/setup/setupToolbar';

const setupGroup = blockGroupId => {

	if ( undefined !== get( cgbBlocks, ['stores',blockGroupId] ) ) return blockGroupId;

	cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};
	cgbBlocks.stores = undefined !== cgbBlocks.stores ? cgbBlocks.stores : {};
	cgbBlocks.components[blockGroupId] = undefined !== cgbBlocks.components[blockGroupId] ? cgbBlocks.components[blockGroupId] : {};

	// register store
	registerCgbStore( blockGroupId );

	// setup components
	setupItemAdminControlsMoveToIndex( blockGroupId );
	setupItemAdminControlsDragHandle( blockGroupId );
	setupItemAdminControls( blockGroupId );
	setupItem( blockGroupId );
	setupGridItem( blockGroupId );
	setupGrid( blockGroupId );
	setupCarousel( blockGroupId );
	setupFullscreen( blockGroupId );
	setupChooseSource( blockGroupId );
	setupPlaceholderChooseItems( blockGroupId );
	setupInspectorPanelGroupSettings( blockGroupId );
	setupInspectorPanelGroup( blockGroupId );
	setupGridInspector( blockGroupId );
	setupCarouselInspector( blockGroupId );
	setupToolbar( blockGroupId );

	return blockGroupId;
};

cgbBlocks.setupGroup = setupGroup;
