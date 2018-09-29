
export const DEFAULT_ITEM = {
	id: undefined,
	url: cgbBlocks.themeDirUrl + '/images/placeholder.jpg',
	title: '',
	alt: '',
	caption: '',
	sizes: {
		full: {
			width: 600,
			height: 400,
			url: cgbBlocks.themeDirUrl + '/images/placeholder.jpg',
		}
	},
	orientation: 'landscape',
	fetched: false,
	selected: false,
};

export const DEFAULT_STATE = {
	items: [{...DEFAULT_ITEM, selected: true}],
	settings: {
		transitionTime: 350,
	},
};
