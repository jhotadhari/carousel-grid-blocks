/**
 * Internal dependencies
 */


console.log( 'debug cgb_blocks_editor_loader_data', cgb_blocks_editor_loader_data ); // debug


import registerBlockCarousel 	from './cgb_blocks_editor/registerBlockCarousel';
import registerBlockGrid 		from './cgb_blocks_editor/registerBlockGrid';

registerBlockCarousel();
registerBlockGrid();