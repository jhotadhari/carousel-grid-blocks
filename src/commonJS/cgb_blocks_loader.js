/**
 * WordPress dependencies
 */
const { setLocaleData } = wp.i18n;

/**
 * Internal dependencies
 */
import registerBlockCarousel from './cgb_blocks_loader/registerBlockCarousel';
import registerBlockGrid from './cgb_blocks_loader/registerBlockGrid';

setLocaleData( cgbBlocks.locale, 'cgb' );

registerBlockCarousel();
registerBlockGrid();