'use strict';

var _ = require('lodash');


var serverInfo = function serverInfo(options) {
	// express middleware
	return function(req, res, next){
		var DefaultOptions = {
			name: 'newMoon',
			version: '1.2.6'	
		};
		options = _.defaultsDeep(options, DefaultOptions)
		res.set('Server', options.name + '/' + options.version);
		next()
	}
}

module.exports = function(name, version) {
    return serverInfo({
	    name: name,
	    version: version
	});
};