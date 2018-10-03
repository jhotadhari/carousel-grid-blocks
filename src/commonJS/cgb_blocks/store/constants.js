const shortid = require('shortid');

export const DEFAULT_ITEM = {
	key: shortid.generate(),
	orientation: 'landscape',
	selected: false,
	fetched: false,

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
	},
};
