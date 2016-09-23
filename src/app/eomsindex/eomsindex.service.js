(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.service('EomsindexService', EomsindexService);

	/** @ngInject*/
	function EomsindexService(Restangular) {

		var service = {
			querySheet: querySheet,
			ceshi: ceshi
		};

		return service;

		function querySheet() {
			return Restangular.one('sheetController', 'querySheet').getList();
		}

		function ceshi() {
			return Restangular.one('sheetController', 'ceshi').getList();
		}

	}

})();