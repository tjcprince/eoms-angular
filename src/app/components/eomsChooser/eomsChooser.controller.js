(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.controller('eomsChooserController', eomsChooserController);
	/** @ngInject */
	function eomsChooserController($log, $scope, EomsChooserService, SweetAlert) {
		var vm = this;
		//angularStrap的动态生成 tab指令的数据，派单树为未选择项目
		vm.unselectTabs = [];

		//为了生成未选择项目的数据
		var tabs = [{
			treeName: 'deptTree', //对应 ivh-treeview 模版树ivh-treeview="vm.deptTree" 
			treeControlName: 'deptTreeControl', //对应 ivh-treeview 模版树eoms-ivh-tree-control="vm.eomsIvhTreeControl"
			title: '部门与人员', //对应 angularStrap的tab指令的 title
			template: "app/components/eomsChooser/dept.template.html", //对应 angularStrap的tab指令的 template
			treedata: [{
				label: '部门与人员',
				leaf: '0',
				id: '-1'
			}]
		}];
		if(!angular.isUndefined($scope.tabs)){
			tabs=$scope.tabs;
		}

		//遍历派单树指令传入的值
		angular.forEach(tabs, function(value) {
			vm[value.treeName] = value.treedata; //给相应的模版设置树图初始化数据
			//angular-ivh-treeview树图模版的eoms-ivh-tree-control属性数据
			vm[value.treeControlName] = {};
			//添加angularstrap的tab指令的数据
			vm.unselectTabs.push({
				title: value.title,
				template: value.template,
				treeControlName: value.treeControlName
			});
		});
		//设置 派发  审批  抄送 按钮以及验证方式
		vm.category = [{
				id: 'dealPerformer', //按钮id
				childType: 'user,dept', //可选择什么样的数据
				childTypeText: '派发(只能选择用户或者部门)', //已选择项目中 树图的根节点
				text: "派发", //按钮文本
				limit: 'none', //可选择的数据个数
				vtext: '请选择任务执行人',
				allowBlank: false
			}, {
				id: 'auditPerformer', //按钮id
				childType: 'user', //可选择什么样的数据
				childTypeText: '审批(只能选择用户)', //已选择项目中 树图的根节点
				text: "审批", //按钮文本
				limit: 'none', //可选择的数据个数
				vtext: '请选择任务审批人',
				allowBlank: false
			}, {
				id: 'copyPerformer', //按钮id
				childType: 'user,dept', //可选择什么样的数据
				childTypeText: '抄送(只能选择用户或者部门)', //已选择项目中 树图的根节点
				text: "抄送", //按钮文本
				limit: 'none', //可选择的数据个数
				vtext: '请选择任务抄送人',
				allowBlank: false
			}]
			 if(!angular.isUndefined($scope.category)){
			 	vm.category=$scope.category;
			 }
			//右边已选择项目动态创建
		angular.forEach(vm.category, function(value) {
			//右边初始化树图的数据
			vm[value.id + "TreeData"] = [{
				label: value.childTypeText,
				children: []
			}];
			//angular-ivh-treeview树图模版的eoms-ivh-tree-control 属性数据
			vm[value.id + "TreeControl"] = {};
		});

		//参数为category集合中的对象
		vm.selectedNode = function(obj) {
				//为按钮对应 右边已选择项目中相应的树图数据名 也就是ivh-treeview="vm[obj.id+'TreeData']"
				var vmSelectTree = obj.id + 'TreeData'
					//判断当前tab中的树

				angular.forEach(vm.unselectTabs, function(value) {
					if (vm.unselectTabs.activeTab == value['title']) {
						var selectNode = vm[value.treeControlName].selectedNode();
						if (obj.childType.indexOf(selectNode.nodetype) == '-1') { //判断选择的数据是否符合
							SweetAlert.swal(obj.childTypeText);
							return;
						}
						var object = {
							id: selectNode.id,
							label: selectNode.label,
							nodetype: selectNode.nodetype,
							icon: selectNode.icon,
							leaf: selectNode.leaf,
							mobile: selectNode.mobole
						};
						//判断是否该项目已经被选择过了
						var flag = true;
						//遍历已选择项目category,也就是遍历右侧所有的树
						angular.forEach(vm.category, function(data) {
							if (flag) {
								angular.forEach(vm[data.id + 'TreeData'][0].children, function(o) {
									if (flag) {
										if (o.id == selectNode.id) {
											SweetAlert.swal("该项目已经被选择");
											flag = false;
										}
									}
								});
							}
						});
						if (flag) {
							vm[vmSelectTree][0].children.push(object); //添加到已选择项目中相应的树
						}
					}
				});
			}
			//angularStrap的动态生成 tab指令的数据，派单树为已选择项目
		vm.selectTabs = [{
			title: "已选择项目",
			template: "app/components/eomsChooser/selectTree.template.html"
		}];

		var selectData=$scope.selectChooserdata;//右边的树图已经添加的数据
		if(selectData){
			angular.forEach(selectData, function(value){
				vm[value.treeName][0].children=value.children;
			});
		}

		//保存派单树
		vm.save = function() {
			var selectdata=[];//此数据为记录最后一次操作派单树的数据
			var data=[];//此数据为新建工单页面显示的数据
			angular.forEach(vm.category, function(value){
				var child=[];
				angular.forEach(vm[value.id + 'TreeData'][0].children, function(val){
					var o={
						id:val.id,
						label:val.label
					}
					child.push(o);
				});
				var obj={
					name:value.text,
					treeName:value.id + 'TreeData',//树图数据名
					children:child
				}
				data.push(obj);//此数据为新建工单页面显示的数据

				//此数据为记录最后一次操作派单树的数据
				var selectobj={
					name:value.text,
					treeName:value.id + 'TreeData',//树图数据名
					children:vm[value.id + 'TreeData'][0].children
				}
				selectdata.push(selectobj)//此数据为记录最后一次操作派单树的数据
			});
			vm.selectChooserdata=selectdata;//此数据为记录最后一次操作派单树的数据
			vm.chooserdata=data;//此数据为新建工单页面显示的数据
		}
	}
})();