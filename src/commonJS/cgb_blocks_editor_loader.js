/**
 * WordPress dependencies
 */
const { setLocaleData } = wp.i18n;

/**
 * Internal dependencies
 */
import registerBlockCarousel from './cgb_blocks/registerBlockCarousel';
import registerBlockGrid from './cgb_blocks/registerBlockGrid';

setLocaleData( cgbBlocks.locale, 'cgb' );

registerBlockCarousel();
registerBlockGrid();