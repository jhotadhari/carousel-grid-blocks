/**
 * External dependencies
 */
import {
	set,
} from 'lodash';

import CarouselInspector		from '../components/CarouselInspector.jsx';

const cgbBlocks = window?.cgb_blocks_editor_loader_data || window?.cgb_blocks_frontend_loader_data;

const setupCarouselInspector = blockGroupId => {

	set( cgbBlocks, ['components',blockGroupId,'CarouselInspector'], CarouselInspector );

}


export default setupCarouselInspector;