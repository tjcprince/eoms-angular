(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.directive('eomsTree', eomsTree);

	function eomsTree() {
		return {
			restrict: "AE",
			templateUrl: "app/components/angularUiTree/tree.html", //模板
			replace: true,
			controller:'AngularUiTreeController',
			controllerAs:'vm'
		}
	}

})();