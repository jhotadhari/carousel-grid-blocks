/**
 * External dependencies
 */
import {
	set,
} from 'lodash';

import CarouselInspector		from '../components/CarouselInspector.jsx';

const setupCarouselInspector = blockGroupId => {

	set( cgbBlocks, ['components',blockGroupId,'CarouselInspector'], CarouselInspector );

}


export default setupCarouselInspector;