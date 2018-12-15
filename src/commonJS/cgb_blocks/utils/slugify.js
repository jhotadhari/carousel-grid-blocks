/**
 * External dependencies
 */
import slugify from 'slugify';

export default string => slugify( string, { remove: /[?\/\=§*+~.()'"!:@]/g } );
