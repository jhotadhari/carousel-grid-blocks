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
import registerCgbStore		 	from './cgb_blocks/store/registerCgbStoreFrontend';
import setupItem					from './cgb_blocks_frontend/setup/setupItem';
import setupGridItem				from './cgb_blocks_frontend/setup/setupGridItem';
import setupGrid					from './cgb_blocks_frontend/setup/setupGrid';
import setupCarousel			 	from './cgb_blocks_frontend/setup/setupCarousel';
import setupFullscreen			 	from './cgb_blocks_frontend/setup/setupFullscreen';

const setupGroup = blockGroupId => {

	if ( undefined !== get( cgbBlocks, ['stores',blockGroupId] ) ) return blockGroupId;

	cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};
	cgbBlocks.stores = undefined !== cgbBlocks.stores ? cgbBlocks.stores : {};
	cgbBlocks.components[blockGroupId] = undefined !== cgbBlocks.components[blockGroupId] ? cgbBlocks.components[blockGroupId] : {};

	// register store
	registerCgbStore( blockGroupId );

	// setup components
	setupItem( blockGroupId );
	setupGridItem( blockGroupId );
	setupGrid( blockGroupId );
	setupCarousel( blockGroupId );
	setupFullscreen( blockGroupId );

	return blockGroupId;
};

cgbBlocks.setupGroup = setupGroup;
