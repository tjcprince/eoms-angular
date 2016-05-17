(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.service('EomsindexService', EomsindexService);

	/** @ngInject*/
	function EomsindexService(Restangular, $log) {

		var service = {
			querySheet: querySheet
		};

		return service;

		function querySheet() {
			 return Restangular.one('sheetController', 'querySheet').getList();
		}

	}

})();