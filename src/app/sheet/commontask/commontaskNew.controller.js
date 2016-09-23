(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.controller('CommontaskNewController', CommontaskNewController);
	/** @ngInject */
	function CommontaskNewController($scope, $log, FileUploader, SatellizerConfig, SatellizerStorage) {
		var vm = this;
		
		//弹出层的初始值
		vm.commontaskMain = {
				mainnetsort1: '101010401',
				mainnetsort2: '10101040101',
				mainnetsort3: '1010104010103'
			}
			//设置上传附件的请求headers上添加token信息
		var tokenName = SatellizerConfig.tokenPrefix ? SatellizerConfig.tokenPrefix + '_' + SatellizerConfig.tokenName : SatellizerConfig.tokenName;
		var token = SatellizerStorage.get(tokenName);
		vm.authHeader = SatellizerConfig.authHeader;
		vm.token1 = SatellizerConfig.authToken + ' ' + token
		vm.uploader = new FileUploader({
			url: 'http://localhost:8080/eoms2016/FileUploadController/filesUpload',
			headers: {
				'Authorization': vm.token1
			}
		});

		// FILTERS

		vm.uploader.filters.push({
			name: 'customFilter',
			fn: function(item /*{File|FileLikeObject}*/ , options) {
				return this.queue.length < 10;
			}
		});

		// CALLBACKS

		vm.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
			$log.info('onWhenAddingFileFailed', item, filter, options);
		};
		vm.uploader.onAfterAddingFile = function(fileItem) {
			$log.info('onAfterAddingFile', fileItem);
		};
		vm.uploader.onAfterAddingAll = function(addedFileItems) {
			$log.info('onAfterAddingAll', addedFileItems);
		};
		vm.uploader.onBeforeUploadItem = function(item) {
			$log.info('onBeforeUploadItem', item);
		};
		vm.uploader.onProgressItem = function(fileItem, progress) {
			$log.info('onProgressItem', fileItem, progress);
		};
		vm.uploader.onProgressAll = function(progress) {
			$log.info('onProgressAll', progress);
		};
		vm.uploader.onSuccessItem = function(fileItem, response, status, headers) {
			$log.info('onSuccessItem', fileItem, response, status, headers);
		};
		vm.uploader.onErrorItem = function(fileItem, response, status, headers) {
			$log.info('onErrorItem', fileItem, response, status, headers);
		};
		vm.uploader.onCancelItem = function(fileItem, response, status, headers) {
			$log.info('onCancelItem', fileItem, response, status, headers);
		};
		vm.uploader.onCompleteItem = function(fileItem, response, status, headers) {
			$log.info('onCompleteItem', fileItem, response, status, headers);
		};
		vm.uploader.onCompleteAll = function() {
			$log.info('onCompleteAll');
		};

		$log.info('vm.uploader', vm.uploader);

	}
})();