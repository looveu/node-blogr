'use strict';

module.exports = function uglify(grunt) {
	grunt.loadNpmTasks('grunt-contrib-uglify');
	return {
		options: {
			compress: {
				// drop_console: true
			}
		},
		my_target: {
			files: {
				'.build/js/app.js': ['.build/js/app.js']
			}
		}
	};
};