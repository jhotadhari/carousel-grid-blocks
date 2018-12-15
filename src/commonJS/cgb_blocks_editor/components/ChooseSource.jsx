/**
 * External dependencies
 */
import {
	reject,
	findIndex,
	find,
} from 'lodash';

/**
 * WordPress dependencies
 */
const {
	__,
} = wp.i18n;
const {
    SelectControl,
    TreeSelect,
} = wp.components;

const ChooseSource = ({
	updateSetting,
	itemsSource,
	posttypes,
	taxonomies,
	getEntityRecords,
}) => {
	const getTaxonomyTermTree = ( posttype, taxs ) => {

		if ( undefined === taxs )
			taxs = undefined !== posttype ? reject( [...taxonomies].map( taxonomy =>
				taxonomy.types.includes( posttype ) ? taxonomy : null
			), option => option === null ) : [];

		const getTermOptionChildren = tax => {
			const terms = getEntityRecords( 'taxonomy', tax.slug );
			return terms === null ? [] : [...terms].map( term => { return {
				name: term.name,	// Let's use the slug, because I got many tax labels named 'category'. So slug makes it clear
				id: JSON.stringify({ tax: tax.slug, term: term.slug }),
				children: [],
			} } );
		};

		return [...taxs].map( tax => { return {
			name: tax.slug,
			id: JSON.stringify({ tax: tax.slug, term: null }),
			children: [],
			children: getTermOptionChildren( tax ),
		} } );

	};

	const newItemSourceUrl = ( { posttype, serializedTaxonomyTerms } ) => {
		const filters = [];

		// serializedTaxonomyTerms
		if ( undefined !== serializedTaxonomyTerms) [...serializedTaxonomyTerms].map( serializedTaxonomyTerm => {
			let taxonomyTerm = { term: null };
			try {
				taxonomyTerm = JSON.parse( serializedTaxonomyTerm );
			} catch(e) {
				taxonomyTerm = taxonomyTerm;
			}

			if ( taxonomyTerm.term !== null ) {
				const filter = find( filters, filter => filter.key === taxonomyTerm.tax );
				if ( filter ){
					filter.values.push( taxonomyTerm.term );
				} else {
					filters.push({ key: taxonomyTerm.tax, values: [taxonomyTerm.term] } );
				}
			}
		} );

		const filterStrings = [...filters].map( filter => 'filter[' + filter.key + ']=' + filter.values.join(',') );

		return filterStrings.length
			? posttype.baseURL + '/?' + filterStrings.join( '&' )
			: posttype.baseURL;
	};

	return <>
		<SelectControl
			label={ __( 'Items Source', 'cgb' ) }
			value={ itemsSource.key }
			options={ [
				{ label: 'Custom', value: 'custom' },
				{ label: 'Post Type Archive', value: 'archivePostType' },
			] }
			onChange={ ( newVal ) => updateSetting( 'itemsSource', {
				...itemsSource,
				key: newVal,
			} ) }
		/>

		{ 'archivePostType' === itemsSource.key &&
			<SelectControl
				label={ __( 'Post Type', 'cgb' ) }
				value={ findIndex( posttypes, posttype => posttype.name === itemsSource.options.posttype ) }
				options={ [...posttypes].map( ( posttype, index ) => {
					return { label: posttype.name, value: index };
				} ) }
				onChange={ ( index ) => updateSetting( 'itemsSource', {
					...itemsSource,
					options: {
						...itemsSource.options,
						posttype: posttypes[index]['name'],
						url: newItemSourceUrl( {
							posttype: posttypes[index],
							serializedTaxonomyTerms: [],
						} ),
					},
				} ) }
			/>
		}

		{ 'archivePostType' === itemsSource.key &&
			<TreeSelect
				multiple
				label={ __( 'Include taxonomy terms', 'cgb' ) }
				help={ ! cgbBlocks.is_active_wp_rest_filter && [
					<p>{ __('Rest filters need to be enabled to use this feature', 'cgb' ) }</p>,
					<p>
						{ __('Try this plugin', 'cgb' ) + ': ' }
						<a href={ 'https://wordpress.org/plugins/wp-rest-filter/' } target={ '_blank' }>WP Rest Filter</a>
					</p>,
				] }
				disabled={ ! cgbBlocks.is_active_wp_rest_filter }
				style={ ! cgbBlocks.is_active_wp_rest_filter ? { color: 'rgba( 51, 51, 51, 0.5 )', } : {} }
				selectedId={ itemsSource.options.includeTaxonomyTerms }
				tree={ getTaxonomyTermTree( itemsSource.options.posttype ) }
				onChange={ ( serializedTaxonomyTerms ) => {
					let newIncludeTaxonomyTerms = [];
					let filteredSerializedTaxonomyTerms = [];
					if ( serializedTaxonomyTerms.length ) {
						filteredSerializedTaxonomyTerms = reject( serializedTaxonomyTerms, str => str.includes( '\"term\":null'  ) );
						if ( filteredSerializedTaxonomyTerms.length ) {
							newIncludeTaxonomyTerms = filteredSerializedTaxonomyTerms;
						} else {
							newIncludeTaxonomyTerms = itemsSource.options.includeTaxonomyTerms || [];
						}
					} else {
						newIncludeTaxonomyTerms = [];
					}
					updateSetting( 'itemsSource', {
						...itemsSource,
						options: {
							...itemsSource.options,
							includeTaxonomyTerms: newIncludeTaxonomyTerms,
							url: newItemSourceUrl( {
								posttype: find( posttypes, posttype => posttype.name === itemsSource.options.posttype ),
								serializedTaxonomyTerms: newIncludeTaxonomyTerms },
							),
						},
					} );
				} }
			/>
		}
	</>;
};

export default ChooseSource;