(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.service('LoginService', LoginService);

	/** @ngInject*/
	function LoginService($http, $log) {

		var service = {
			getLogin: getLogin
		};

		return service;

		function getLogin(userInfo) {
			$log.info(userInfo);
			return $http.get('app/data/login.json').then(getLoginComplete)
				.catch(getLoginFailed);

			function getLoginComplete(response) {
				return response.data.user;
			}

			function getLoginFailed(error) {
				$log.error('XHR Failed for getAvengers.' + error.data);
			}
		}

	}

})();