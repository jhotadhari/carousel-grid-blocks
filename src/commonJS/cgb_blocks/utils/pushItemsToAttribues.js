/**
 * WordPress dependencies
 */
const {
	dispatch,
} = wp.data;

const {
	updateBlockAttributes,
} = dispatch( 'core/editor' );

/**
 * Internal dependencies
 */
import getCgbBlocks 					from './getCgbBlocks';

const pushItemsToAttribues = ( newItemIds ) =>
	[...getCgbBlocks()].map( block => updateBlockAttributes( block.clientId, { imageIds: newItemIds } ) );

export default pushItemsToAttribues;
