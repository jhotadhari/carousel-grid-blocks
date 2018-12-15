/**
 * External dependencies
 */
import {
	reject,
	set,
} from 'lodash';

/**
 * WordPress dependencies
 */
const {
	withSelect,
} = wp.data;

/**
 * Internal dependencies
 */
import composeWithSettings 				from '../../cgb_blocks/store/compose/composeWithSettingsEditor';
import ChooseSource						from '../components/ChooseSource.jsx';

const setupChooseSource = blockGroupId => {

	let _ChooseSource = withSelect( ( select ) => {
		const {
			getEntitiesByKind,
			getTaxonomies,
			getEntityRecords,
		} = select( 'core' );

		const taxonomies = getTaxonomies();

		const posttypes = reject( [...getEntitiesByKind( 'postType' )] , posttype => {
			return [
				'wp_block',
				'attachment',
			].includes( posttype.name );
		});

		return {
			posttypes: posttypes,
			taxonomies: taxonomies,
			getEntityRecords: getEntityRecords,
		}
	} )( ChooseSource );

	_ChooseSource = composeWithSettings( _ChooseSource, [
		'itemsSource',
	], blockGroupId );

	set( cgbBlocks, ['components',blockGroupId,'ChooseSource'], _ChooseSource );

}

export default setupChooseSource;
