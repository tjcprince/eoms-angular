(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.controller('CommontaskListController', CommontaskListController);
	/** @ngInject */
	function CommontaskListController($modal) {
		var vm = this;

		var newSheetModal = $modal({
			controller: 'CommontaskNewController',
			controllerAs: 'vm',
			title: '新建工单',
			templateUrl: 'app/sheet/commontask/commontaskNew.html',
			show: false,
			animation: 'am-fade-and-slide-top'
		});
		vm.newSheet = function() {
			newSheetModal.$promise.then(newSheetModal.show);
		}

	}
})();