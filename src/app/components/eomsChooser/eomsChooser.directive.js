(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.directive('eomsChooser', eomsChooser);

	/** @ngInject */
	function eomsChooser($modal) {
		var directive = {
			restrict: 'AE',
			scope:{
				type:"@"
			},
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, el, attr) {
			var scopeNew = scope.$new();//给弹出层传参数
			scopeNew.type=scope.type;
			var myModal = $modal({
				controller: 'eomsChooserController',
				controllerAs: 'vm',
				scope:scopeNew,
				title: '选择派单对象',
				templateUrl: 'app/components/eomsChooser/eomsChooser.html',
				show: false
			});
			el.bind('click', function() {
				myModal.$promise.then(myModal.show);
			});
		}
	}

})();