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
import composeWithUi			from '../../cgb_blocks/store/compose/composeWithUiEditor';
import Fullscreen	 			from '../../cgb_blocks/components/Fullscreen.jsx';

const cgbBlocks = window?.cgb_blocks_editor_loader_data || window?.cgb_blocks_frontend_loader_data;

const setupFullscreen = blockGroupId => {

	let _Fullscreen = Fullscreen;

	_Fullscreen = composeWithUi( _Fullscreen, blockGroupId );

	set( cgbBlocks, ['components',blockGroupId,'Fullscreen'], _Fullscreen );

}

export default setupFullscreen;
