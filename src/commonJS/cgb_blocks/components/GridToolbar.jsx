
/**
 * Internal dependencies
 */
import Toolbar 							from './Toolbar.jsx';

const GridToolbar = () => [
	<Toolbar/>,
];

cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};
cgbBlocks.components.GridToolbar = GridToolbar;

export default GridToolbar;
