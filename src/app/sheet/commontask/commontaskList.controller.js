(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.controller('CommontaskListController', CommontaskListController);
	/** @ngInject */
	function CommontaskListController($scope) {
		$scope.submitForm = function(isValid) {
			// check to make sure the form is completely valid
			if (isValid) {
				alert('our form is amazing');
			}

		};
	}
})();