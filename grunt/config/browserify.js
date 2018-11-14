'use strict';

const files = [{
	expand: true,
	cwd: 'src/commonJS',
	src: [
		'*.js',
		'*.jsx',
	],
	dest: '<%= dest_path %>/js',
	rename: function (dst, src) {
		return dst + '/' + src.replace('.js', '.min.js');
	}
}];

const transform = [
	[ 'browserify-shim', {global: true}],
	[ 'babelify', {
		plugins: [
			'@babel/plugin-syntax-dynamic-import',
			// '@babel/plugin-dynamic-import-node',
			// 'dynamic-import-node-babel-7',
		],
		// transform: [
		// 	'browserify-require-async',
		// ],
		presets: [
			'@babel/preset-env',
			'@babel/preset-react',
		],
	}],
	// [ 'jstify' ],
];

module.exports = {

	dist: {
		files,
        options: {
        	transform,
        	browserifyOptions: {
        		debug: false,
        	}
        },
	},

	debug: {
		files,
        options: {
        	transform,
        	browserifyOptions: {
        		debug: true,
        	}
        },
	}

};
