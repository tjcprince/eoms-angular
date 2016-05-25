(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.controller('NgtableController', NgtableController);
	/** @ngInject */
	function NgtableController(NgTableParams) {
		var vm = this;
		
		var dataset = [{
			name: '小米',
			age: 21,
			sex: '男',
			phone: 1232312,
			url: "home.anchorpage({homeid:0})"
		}, {
			name: '小强',
			age: 21,
			sex: '男',
			phone: 232312,
			url: "home.anchorpage({homeid:0})"
		}, {
			name: '小小',
			age: 21,
			sex: '男',
			phone: 1232,
			url: "home.anchorpage({homeid:0})"
		}, {
			name: '小猫',
			age: 21,
			sex: '男',
			phone: 231,
			url: "home.anchorpage({homeid:0})"
		}, {
			name: '小猫',
			age: 21,
			sex: '男',
			phone: 231,
			url: "home.anchorpage({homeid:0})"
		}, {
			name: '小猫',
			age: 21,
			sex: '男',
			phone: 231,
			url: "home.anchorpage({homeid:0})"
		}, {
			name: '小猫',
			age: 21,
			sex: '男',
			phone: 231,
			url: "home.anchorpage({homeid:0})"
		}, {
			name: '小猫',
			age: 21,
			sex: '男',
			phone: 231,
			url: "home.anchorpage({homeid:0})"
		}, {
			name: '小猫',
			age: 21,
			sex: '男',
			phone: 231,
			url: "home.anchorpage({homeid:0})"
		}];
		vm.tableParams = new NgTableParams({
			count: 5
		}, {
			counts: [5, 10, 20],
			data: dataset
		});
		vm.modal = {
			"title": "Title",
			"content": "Hello Modal<br />This is a multiline message!"
		};
	}
})();