const shortid = require('shortid');

export const DEFAULT_ITEM = {
	key: shortid.generate(),
	orientation: 'landscape',
	selected: false,
	fetched: false,

	postLink: '',
	postTitle: '',
	postExcerpt: '',

	// img atts
	src: cgbBlocks.pluginDirUrl + '/images/placeholder.jpg',
	srcSet: undefined,
	sizes: undefined,
	width: 600,
	height: 400,
	alt: '',

	// media response
	id: undefined,
	title: '',
	caption: '',
	mediaSizes: {
		full: {
			width: 600,
			height: 400,
			url: cgbBlocks.pluginDirUrl + '/images/placeholder.jpg',
		}
	},

};

export const DEFAULT_STATE = {
	items: [{...DEFAULT_ITEM, selected: true}],
	settings: {
		transitionTime: 350,
		itemsSource: {
			key: 'custom',
			options: {
				posttype: 'post',
				url: '/wp/v2/posts',
				includeTaxonomyTerms: [],
			},
		}
	},
};


// ??? example
// itemsSource: {
// 	key: 'archivePostType',
// 	options: {
// 		posttype: 'post',
// 	},
// }