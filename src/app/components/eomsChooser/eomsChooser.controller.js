(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.controller('eomsChooserController', eomsChooserController);
	/** @ngInject */
	function eomsChooserController($log, $scope, EomsChooserService) {
		var vm = this;
		//angularStrap的动态生成 tab指令的数据，派单树为选择项目
		vm.unselectTabs = [];
		console.info($scope.tabs);
		//为了生成未选择项目的数据
		var tabs = [{
			treeName: 'deptTree', //对应 ivh-treeview 模版树ivh-treeview="vm.deptTree" 
			treeControlName: 'deptTreeControl', //对应 ivh-treeview 模版树eoms-ivh-tree-control="vm.eomsIvhTreeControl"
			title: '部门与人员', //对应 angularStrap的tab指令的 title
			template: "app/components/eomsChooser/dept.template.html", //对应 angularStrap的tab指令的 template
			urlClass: "treeController", //对应后台spring Controller的路径
			urlMethod: "deptTree" //对应后台spring  Controller类中的方法路径
		}, {
			treeName: 'roleTree', //对应 ivh-treeview 模版树ivh-treeview="vm.deptTree" 
			treeControlName: 'roleTreeControl', //对应 ivh-treeview 模版树eoms-ivh-tree-control="vm.eomsIvhTreeControl"
			title: '可选子角色', //对应 angularStrap的tab指令的 title
			template: "app/components/eomsChooser/role.template.html", //对应 angularStrap的tab指令的 template
			urlClass: "treeController", //对应后台spring Controller的路径
			urlMethod: "roleTree" //对应后台spring  Controller类中的方法路径
		}];

		//遍历派单树指令传入的值
		angular.forEach(tabs, function(value) {
			//树图的数据
			vm[value.treeName] = [{
				id: 'hats',
				label: '部门与人员',
				children: [{
					id: 'hats',
					label: 'Hats',
					children: [{
						label: 'Flat cap',
						children: [{
							label: 'Flat cap'
						}, {
							label: 'Fedora'
						}, {
							label: 'Baseball'
						}, {
							label: 'Top hat'
						}, {
							label: 'Gatsby'
						}]
					}, {
						label: 'Fedora'
					}, {
						label: 'Baseball'
					}, {
						label: 'Top hat'
					}, {
						label: 'Gatsby'
					}]
				}, {
					id: 'pens',
					label: 'Pens',
					selected: true,
					children: [{
						label: 'Fountain'
					}, {
						label: 'Gel ink'
					}, {
						label: 'Roller ball'
					}, {
						label: 'Fiber tip'
					}, {
						label: 'Ballpoint'
					}]
				}, {
					label: 'Whiskey',
					id: 'whiskey',
					children: [{
						label: 'Irish'
					}, {
						label: 'Scotch'
					}, {
						label: 'Rye'
					}, {
						label: 'Tennessee'
					}, {
						label: 'Bourbon'
					}]
				}]
			}];
			//angular-ivh-treeview树图模版的eoms-ivh-tree-control指令数据
			vm[value.treeControlName] = {};
			//添加angularstrap的tab指令的数据
			vm.unselectTabs.push({
				title: value.title,
				template: value.template
			});
		});

		vm.selectTree = [{
			label: 'Glasses',
			value: 'glasses',
			children: [{
				label: 'Top Hat',
				value: 'top_hat'
			}, {
				label: 'Curly Mustache',
				value: 'mustachio'
			}]
		}];

		vm.awesomeCallback = function(node, tree) {
			// Do something with node or tree
		};

		vm.otherAwesomeCallback = function(node, isSelected, tree) {
			// Do soemthing with node or tree based on isSelected
		}
		vm.selectedNode = function() {
			$log.info(vm.eomsIvhTreeControl.selectedNode());
		}

		vm.unselectTabs.activeTab = 0;

		vm.selectTabs = [{
			title: "已选择项目",
			template: "app/components/eomsChooser/selectTree.template.html"
		}];
		vm.selectTabs.activeTab = 0;
	}
})();