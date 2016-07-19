angular.module('ivh.treeview').factory('ivhTreeviewEomsTreedata', ['Restangular', function(Restangular) {
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
}]);