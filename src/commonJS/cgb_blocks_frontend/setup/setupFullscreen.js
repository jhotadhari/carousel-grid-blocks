/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import {
	set,
} from 'lodash';

/**
 * Internal dependencies
 */
import composeWithUi			from '../../cgb_blocks/store/compose/composeWithUiFrontend';
import composeWithItems			from '../../cgb_blocks/store/compose/composeWithItemsFrontend';
import Fullscreen	 			from '../../cgb_blocks/components/Fullscreen.jsx';


const setupFullscreen = blockGroupId => {

	let _Fullscreen = Fullscreen;

	_Fullscreen = composeWithUi( _Fullscreen, blockGroupId );

	set( cgbBlocks, ['components',blockGroupId,'Fullscreen'], _Fullscreen );

}

export default setupFullscreen;
