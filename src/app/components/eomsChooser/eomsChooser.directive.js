(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.directive('eomsChooser', eomsChooser);

	/** @ngInject */
	function eomsChooser($modal) {
		var directive = {
			restrict: 'AE',
			scope: {
				tabs: "=",
				category:"=",
				chooserdata: "="
			},
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, el) {
			var scopeNew = scope.$new(); //给弹出层传参数
			scopeNew.tabs = scope.tabs;
			scopeNew.category=scope.category;
			var myModal = $modal({
				controller: 'eomsChooserController',
				controllerAs: 'vm',
				scope: scopeNew,
				title: '选择派单对象',
				templateUrl: 'app/components/eomsChooser/eomsChooser.html',
				show: false
			});
			el.bind('click', function() {
				myModal.$promise.then(myModal.show);
			});
			scopeNew.$on('modal.hide', function(e, target) {
				/*eslint angular/no-private-call: [2,{"allow":["$$childHead"]}]*/
				var chooserdata = target.$scope.$$childHead.vm.chooserdata;
				var selectChooserdata = target.$scope.$$childHead.vm.selectChooserdata;//此数据为记录最后一次操作派单树的数据
				if (chooserdata) {
					scope.chooserdata = chooserdata;
					scope.selectChooserdata=selectChooserdata;//此数据为记录最后一次操作派单树的数据
				}

			})
		}
	}

})();