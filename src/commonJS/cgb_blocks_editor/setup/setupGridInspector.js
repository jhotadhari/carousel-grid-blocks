/**
 * External dependencies
 */
import {
	set,
} from 'lodash';

/**
 * Internal dependencies
 */
import GridInspector		from '../components/GridInspector.jsx';

const setupGridInspector = blockGroupId => {
	set( cgbBlocks, ['components',blockGroupId,'GridInspector'], GridInspector );
}

export default setupGridInspector;
