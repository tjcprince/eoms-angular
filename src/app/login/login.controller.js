(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.controller('LoginController', LoginController);

	/** @ngInject */
	function LoginController($log, LoginService, $state, $auth, toastr, SatellizerShared, SatellizerConfig, SatellizerStorage,ngProgressFactory,$window) {
		var vm = this;
		vm.login = login;
		vm.authenticate = authenticate;
		//重写Satellizer 插件的setToken方法，变更.data为.data.actualEntity
		var tokenName = SatellizerConfig.tokenPrefix ? [SatellizerConfig.tokenPrefix, SatellizerConfig.tokenName].join('_') : SatellizerConfig.tokenName;
		SatellizerShared.setToken = function(response) {
			if (!response) {
				return $log.warn('Can\'t set token without passing a value');
			}

			var accessToken = response && response.access_token;
			var token;

			if (accessToken) {
				if (angular.isObject(accessToken) && angular.isObject(accessToken.data.actualEntity)) {
					response = accessToken;
				} else if (angular.isString(accessToken)) {
					token = accessToken;
				}
			}

			if (!token && response) {
				var tokenRootData = SatellizerConfig.tokenRoot && SatellizerConfig.tokenRoot.split('.').reduce(function(o, x) {
					return o[x];
				}, response.data.actualEntity);
				token = tokenRootData ? tokenRootData[SatellizerConfig.tokenName] : response.data.actualEntity && response.data.actualEntity[SatellizerConfig.tokenName];
			}

			if (!token) {
				var tokenPath = SatellizerConfig.tokenRoot ? SatellizerConfig.tokenRoot + '.' + SatellizerConfig.tokenName : SatellizerConfig.tokenName;
				return $log.warn('Expecting a token named "' + tokenPath);
			}
			SatellizerStorage.set(tokenName, token);
		};


		function login() {
			$auth.removeToken(); //清除token
			vm.progressbar = ngProgressFactory.createInstance();
			vm.progressbar.setColor('#63A3FF');
			vm.progressbar.start();
			$auth.login(vm.user, {
					'url': 'http://localhost:8080/eoms2016/auth/login',
					'method': 'post',
					'data': vm.user
				})
				.then(function(response) {
					var data = response.data;
					if (data.status == '401') {
						toastr.warning(data.entity);
						vm.progressbar.complete();
					} else {
						toastr.success('You have successfully signed in!');
						$state.go("home");
						vm.progressbar.complete();
						//清除首页缓存
						var wsCache=new $window.WebStorageCache();
						wsCache.delete("indexdata");
					}
				})
				.catch(function(error) {
					vm.progressbar.complete();
					toastr.error(error.data.message, error.status);
				});
		}

		function authenticate(provider) {
			$auth.authenticate(provider)
				.then(function() {
					toastr.success('You have successfully signed in with ' + provider + '!');
				})
				.catch(function(error) {
					if (error.error) {
						// Popup error - invalid redirect_uri, pressed cancel button, etc.
						toastr.error(error.error);
					} else if (error.data) {
						// HTTP response error from server
						toastr.error(error.data.message, error.status);
					} else {
						toastr.error(error);
					}
				});
		}
	}
})();