(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.service('LoginService', LoginService);

	/** @ngInject*/
	function LoginService($http, $log, Restangular) {

		var service = {
			getLogin: getLogin,
			loginEoms: loginEoms//模拟登陆EOMS系统
		};

		return service;

		function getLogin() {
			return $http.get('app/data/login.json').then(getLoginComplete)
				.catch(getLoginFailed);

			function getLoginComplete(response) {
				return response.data.user;
			}

			function getLoginFailed(error) {
				$log.error('XHR Failed for getAvengers.' + error.data);
			}
		}

		function loginEoms(user) {
			return Restangular.one('auth').getList("loginEoms",{
				username: user.userid,
				password:user.password
			});
		}

	}

})();