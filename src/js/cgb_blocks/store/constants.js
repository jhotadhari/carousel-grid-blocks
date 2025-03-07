const shortid = require('shortid');

const cgbBlocks = window?.cgb_blocks_editor_loader_data || window?.cgb_blocks_frontend_loader_data;

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
	items: [],
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
	ui: {
		isFullscreen: false,
		fullscreenIds: [],
	},
};


// example
// itemsSource: {
// 	key: 'archivePostType',
// 	options: {
// 		posttype: 'post',
// 	},
// }