(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.controller('AngularUiTreeController', AngularUiTreeController)
		.controller('ModalInstanceCtrl', modalInstanceCtrl);
	/** @ngInject */
	function modalInstanceCtrl($uibModalInstance, items) {
		var vm = this;
		vm.items = items;
		vm.selected = {
			item: vm.items[0]
		};

		vm.ok = function() {
			$uibModalInstance.close(vm.selected.item);
		};

		vm.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}
	/** @ngInject */
	function AngularUiTreeController($uibModal, $log) {
		var vm = this;
		//angular-ui-tree:begin
		vm.remove = function(scope) {
			scope.remove();
		};

		vm.toggle = function(scope) {
			scope.toggle();
		};

		vm.moveLastToTheBeginning = function() {
			var a = vm.data.pop();
			vm.data.splice(0, 0, a);
		};

		vm.newSubItem = function(scope) {
			var nodeData = scope.$modelValue;
			nodeData.nodes.push({
				id: nodeData.id * 10 + nodeData.nodes.length,
				title: nodeData.title + '.' + (nodeData.nodes.length + 1),
				nodes: []
			});
		};

		vm.collapseAll = function() {
			vm.$broadcast('angular-ui-tree:collapse-all');
		};

		vm.expandAll = function() {
			vm.$broadcast('angular-ui-tree:expand-all');
		};

		vm.addNode = function(scope) {

		}
		vm.data = [{
			'id': 1,
			'title': 'node1',
			'nodes': [{
				'id': 11,
				'title': 'node1.1',
				'nodes': [{
					'id': 111,
					'title': 'node1.1.1',
					'nodes': []
				}]
			}, {
				'id': 12,
				'title': 'node1.2',
				'nodes': []
			}]
		}, {
			'id': 2,
			'title': 'node2',
			'nodrop': true, // An arbitrary property to check in custom template for nodrop-enabled
			'nodes': [{
				'id': 21,
				'title': 'node2.1',
				'nodes': []
			}, {
				'id': 22,
				'title': 'node2.2',
				'nodes': []
			}]
		}, {
			'id': 3,
			'title': 'node3',
			'nodes': [{
				'id': 31,
				'title': 'node3.1',
				'nodes': []
			}]
		}];
		//angular-ui-tree:end

		vm.items = ['item1', 'item2', 'item3'];

		vm.open = function(size) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'myModalContent.html',
				controller: 'ModalInstanceCtrl',
				controllerAs: 'vm',
				size: size,
				resolve: {
					items: function() {
						return vm.items;
					}
				}
			});

			modalInstance.result.then(function(selectedItem) {
				vm.selected = selectedItem;
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};

	}
})();