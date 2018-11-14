/*
 * External dependencies
 */
import {
	filter,
	flatten,
	chain,
} from 'lodash';

/**
 * WordPress dependencies
 */
const {
	select,
} = wp.data;

const {
	getBlockOrder,
	getBlock,
} = select( 'core/editor' );

const getCgbBlocks = ( uidsOrBlocks ) => {
	uidsOrBlocks = undefined === uidsOrBlocks ? getBlockOrder() : uidsOrBlocks;
	const cgbBlocks = [...uidsOrBlocks].map( uidOrBlock => {
		const block = 'string' === typeof uidOrBlock ? getBlock( uidOrBlock ) : uidOrBlock;
		if ( block.name.startsWith( 'cgb/' ) )
			return block;
		if ( block.innerBlocks.length )
			return getCgbBlocks( block.innerBlocks );
		return null;
	} );
	// flatten, filter nulls and return
	return chain( [...cgbBlocks] ).flatten().filter( block => null !== block ).value();
};

export default getCgbBlocks;
