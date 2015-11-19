'use strict';

var path = require('path');

module.exports = function dustjs(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-dust-html');

	// Options
	return {
    
    dist: {
      src: 'public/templates/index.dust',
      dest: 'public/index.html',
      partialsDir: 'public/templates',
      options: {
        // see below for options. this is optional.
      }
    },
    context: [
      { name: 'hello', title: 'wow' }
    ]
	};
};
