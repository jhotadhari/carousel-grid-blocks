const options = {
	text_domain: 'text_domain',		// Currently it is only used to generate the destination file name: [text-domain].pot	see: https://github.com/stephenharris/grunt-pot#text_domain
	msgmerge: false,				// true will merge it into existing po file, but with fuzzy translations
	dest: 'src/languages/',
	keywords: [
		'__',
		'_e',
		'_x',
		'esc_html',
		'esc_html__',
		'esc_html_e',
		'esc_attr__',
		'esc_attr_e',
		'esc_attr_x',
		'esc_html_x',
		'ngettext',
		'_n',
		'_c',
		'_ex',
		'_nx'
	],
};

// base config ... well its empty, ok
const config = {};

// add subtask 'phpFiles' to config
config['phpFiles'] = {
	options: {
		...options,
		language: 'PHP',
		text_domain: '<%= global["pkg"].textDomain %>-LOCALE',

	},
	files: [{
		expand: true,
		src: [
			'src/**/*.php',
			'<%= pattern.global_exclude %>',
		],
	}],
};

// add subtask for each js handle to config
const handles = [
	'cgb_blocks_editor',
	'cgb_blocks_frontend',
	'cgb_options_page',
];

[...handles].map( handle => {

	config[handle] = {
		options: {
			...options,
			language: 'JavaScript',
			text_domain: '<%= global["pkg"].textDomain %>-LOCALE-' + handle,
		},
		files: [{
			expand: true,
			src: [
				'src/commonJS/' + handle + '.js',
				'src/commonJS/' + handle + '_loader.js',
				'src/commonJS/cgb_blocks/**/*.js',
				'src/commonJS/cgb_blocks/**/*.jsx',
				'src/commonJS/' + handle + '/**/*.js',
				'src/commonJS/' + handle + '/**/*.jsx',
				'<%= pattern.global_exclude %>',

				// exclude
				'!src/commonJS/cgb_blocks/utils/slugify.js',
			],
		}],
	};

} );

module.exports = config;
