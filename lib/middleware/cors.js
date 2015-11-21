'use strict';

var cors = function(options) {

	options = options || {};
	options.allowedOrigins = options.allowedOrigins || [];
	if (!options.hasOwnProperty('allowCredentials')) {
		options.allowCredentials = true;
	}
	options.methods = options.methods || ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];
	options.headers = options.headers || ['X-Requested-With', 'Content-Type'];

	// Parse allowed origins list and turn them all into regexps
	var allowedOrigins = options.allowedOrigins.map(function(origin){
		// check if allowed origin starts with http:// or https://
		// of not, then we should allow both
		var anyHttp = !origin.match(/^https?:\/\//);
		// random hash tokens to escape wildcard sequences like "*." and ":*"
		var rand = 'WnqkQwirtbRoerjaSnei20ssbqQi',
			rand1 = rand + '1',
			rand2 = rand + '2';
		// hide wildcard sequences
		origin = origin.replace(/\*\./g, rand1);
		origin = origin.replace(/:\*/g, rand2);
		// escape wildcard regexp characters in origin value
		origin = escapeRegExp(origin);
		// return wildcard sequences back, turning them into reg expressions
		origin = origin.replace(new RegExp(rand1, 'g'), '(.*\\.)?');
		origin = origin.replace(new RegExp(rand2, 'g'), '(:\\d+)?');
		// append http/https expression if we allow both
		if (anyHttp) {
			origin = '^https?:\/\/' + origin + '$';
		}
		else {
			origin = '^' + origin + '$';
		}

		return new RegExp(origin);
	});

	// express middleware
	return function(req, res, next){
		var origin = req.get('Origin'), i, matched = false;

		// match against all prepared regexp origins
		for (i = 0; i < allowedOrigins.length; i++) {
			if (allowedOrigins[i].test(origin)) {
				matched = true;
				break;
			}
		}

		if (!matched){
			return next();
		}

		res.set('Access-Control-Allow-Origin', origin);

		if (options.methods.length) {
			res.set('Access-Control-Allow-Methods', options.methods.join(', '));
		}

		if (options.headers.length) {
			res.set('Access-Control-Allow-Headers', options.headers.join(', '));
		}

		if (options.maxAge) {
			res.set('Access-Control-Max-Age', options.maxAge);
		}

		if (options.allowCredentials) {
			res.set('Access-Control-Allow-Credentials', 'true');
		}

		if ('OPTIONS' === req.method){
			return res.sendStatus(200);
		}
		next();
	};
};

function escapeRegExp(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}



module.exports = function(domains, methods, headers) {
    return cors({
	    allowedOrigins: domains,
	    methods: methods,
		headers: headers
	});
};