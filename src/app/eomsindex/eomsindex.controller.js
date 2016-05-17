(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.controller('EomsindexController', EomsindexController);

	/** @ngInject */
	function EomsindexController(EomsindexService, $log, NgTableParams) {
		var vm = this;
		EomsindexService.querySheet().then(function(data) {
			vm.tableParams = new NgTableParams({
				count: 5
			}, {
				counts: [5, 10, 20],
				data: data
			});
		});
	}
})();