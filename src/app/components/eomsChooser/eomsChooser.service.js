(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.service('EomsChooserService', EomsChooserService);

	/** @ngInject*/
	function EomsChooserService(Restangular) {

		var service = {
			queryDict: queryDict
		};

		return service;

		function queryDict(dictid) {

			// vm.deptTree = [{
			// 	id: 'hats',
			// 	label: '部门与人员',
			// 	children: [{
			// 		id: 'hats',
			// 		label: 'Hats',
			// 		children: [{
			// 			label: 'Flat cap',
			// 			children: [{
			// 				label: 'Flat cap'
			// 			}, {
			// 				label: 'Fedora'
			// 			}, {
			// 				label: 'Baseball'
			// 			}, {
			// 				label: 'Top hat'
			// 			}, {
			// 				label: 'Gatsby'
			// 			}]
			// 		}, {
			// 			label: 'Fedora'
			// 		}, {
			// 			label: 'Baseball'
			// 		}, {
			// 			label: 'Top hat'
			// 		}, {
			// 			label: 'Gatsby'
			// 		}]
			// 	}, {
			// 		id: 'pens',
			// 		label: 'Pens',
			// 		selected: true,
			// 		children: [{
			// 			label: 'Fountain'
			// 		}, {
			// 			label: 'Gel ink'
			// 		}, {
			// 			label: 'Roller ball'
			// 		}, {
			// 			label: 'Fiber tip'
			// 		}, {
			// 			label: 'Ballpoint'
			// 		}]
			// 	}, {
			// 		label: 'Whiskey',
			// 		id: 'whiskey',
			// 		children: [{
			// 			label: 'Irish'
			// 		}, {
			// 			label: 'Scotch'
			// 		}, {
			// 			label: 'Rye'
			// 		}, {
			// 			label: 'Tennessee'
			// 		}, {
			// 			label: 'Bourbon'
			// 		}]
			// 	}]
			// }];

			// vm.roleTree = [{
			// 	label: '可选子角色',
			// 	value: 'glasses',
			// 	children: [{
			// 		label: 'Top Hat',
			// 		value: 'top_hat'
			// 	}, {
			// 		label: 'Curly Mustache',
			// 		value: 'mustachio'
			// 	}]
			// }];
			return Restangular.one('EomsTagsController').getList("queryDict", {
				dictid: dictid
			});
		}
	}

})();