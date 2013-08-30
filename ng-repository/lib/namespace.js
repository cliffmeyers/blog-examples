/**
 * Simple namespace util to wrap object and classes in namespace.
 */
(function () {
	'use strict';
	window.Namespace = {};
	window.Namespace.create = function(namespaces){
		var names = namespaces.split('.');
		var last  = window;
		var name  = null;
		var i     = null;

		for(i in names){
			if(names.hasOwnProperty(i)) {
				name = names[i];

				if(last[name]===undefined){
					last[name] = {};
				}

				last = last[name];
			}
		}
		return last;
	};

}());