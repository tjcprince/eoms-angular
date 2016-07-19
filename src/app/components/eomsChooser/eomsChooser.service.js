(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.service('EomsChooserService', EomsChooserService);

	/** @ngInject*/
	function EomsChooserService(Restangular) {

		var service = {
			queryTree: queryTree
		};

		return service;

		function queryTree(urlClass, urlMethod) {

			return Restangular.one(urlClass).getList(urlMethod);
		}
	}

})();