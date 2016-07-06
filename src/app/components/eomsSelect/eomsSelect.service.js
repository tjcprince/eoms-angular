(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.service('EomsSelectService', EomsSelectService);

	/** @ngInject*/
	function EomsSelectService(Restangular) {

		var service = {
			queryDict: queryDict
		};

		return service;

		function queryDict(dictid) {
			return Restangular.one('EomsTagsController').getList("queryDict",{
				dictid: dictid
			});
		}
	}

})();