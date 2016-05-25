(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.controller('EomsindexController', EomsindexController);

	/** @ngInject */
	function EomsindexController(EomsindexService, $log, NgTableParams, $window, $websocket,toastr) {
		var vm = this;
		var wsCache = new $window.WebStorageCache();
		if (wsCache.get("indexdata") == null) {
			EomsindexService.querySheet().then(function(data) {
				vm.tableParams = new NgTableParams({
					count: 5
				}, {
					counts: [5, 10, 20],
					data: data
				});
				wsCache.set('indexdata', data);
			});
		} else {
			$log.info("aaa");
			vm.tableParams = new NgTableParams({
				count: 5
			}, {
				counts: [5, 10, 20],
				data: wsCache.get("indexdata")
			});
		}

		var ws = $websocket('ws://localhost:8080/eoms2016/websck');
		//var collection = [];

		ws.onMessage(function(event) {
			$log.info('message1: ', event);
			var res = null;
			try {
				res = angular.fromJson(event.data);
				// collection.push({
				// 	id: res.id,
				// 	createUser: res.createUser,
				// 	title: res.title,
				// 	content:res.content
				// });
				toastr.success('有新的待办工单,请及时处理!');
				var data = wsCache.get('indexdata');
				data.unshift(res);
				wsCache.set("indexdata", data);
				vm.tableParams = new NgTableParams({
					count: 5
				}, {
					counts: [5, 10, 20],
					data: wsCache.get("indexdata")
				});
				$log.info('message2: ', res);
				//$log.info('collection: ', collection);
			} catch (e) {
				$log.info('message3: ', res);
			}
		});

		ws.onError(function(event) {
			$log.info('connection Error', event);
		});

		ws.onClose(function(event) {
			$log.info('connection closed', event);
		});

		ws.onOpen(function() {
			$log.info('connection open');
		});
		//删除工单
		// var wsCache = new $window.WebStorageCache();
		// var data = wsCache.get('indexdata');
		// $log.info(data);
		// for (var i = 0; i < data.length; i++) {
		// 	if (data[i].id == 19) {
		// 		data.splice(i, 1);
		// 	}
		// }
		// for (var j = 0; j < data.length; j++) {
		// 	$log.info(data[j].id);
		// }
		// wsCache.set("indexdata", data);
		
	}
})();