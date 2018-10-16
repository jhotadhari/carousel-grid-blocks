
/**
 * External dependencies
 */
import {
	findIndex,
	isArray,
} from 'underscore';

const findSelectedIndex = ( items ) => isArray( items ) ? findIndex( items , ( item ) => item.selected ) : -1;

export default findSelectedIndex;