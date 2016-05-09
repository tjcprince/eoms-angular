(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.controller('SignupController', SignupController);
	/** @ngInject */
	function SignupController($location, $auth, toastr, $log) {
		var vm = this;
		vm.signup = signup;

		function signup() {
			$auth.signup(vm.user, {
					'url': 'http://localhost:8080/eoms2016/auth/signup',
					'method': 'post',
					'data': vm.user
				})
				.then(function(response) {
					$log.info(response.data);
					toastr.info('You have successfully created a new account and have been signed-in');
				})
				.catch(function(response) {
					toastr.error(response.data.message);
				});
		}
	}
})();