(function() {
	'use strict';
	angular.module('ivh.treeview').factory('ivhTreeviewEomsTreedata', ivhTreeviewEomsTreedata);
	/** @ngInject */
	function ivhTreeviewEomsTreedata(Restangular) {
		'use strict';

		var service = {
			queryTree: queryTree
		};

		return service;

		function queryTree(urlClass, urlMethod, id) {

			return Restangular.one(urlClass).getList(urlMethod, {
				id: id
			});
		}
	}
})();