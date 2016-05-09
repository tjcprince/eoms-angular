(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.service('SignupService', SignupService);

	/** @ngInject*/
	function SignupService($http,$log,UserRestangularFactory) {

		var service = {
			signup: signup
		};

		return service;

		function signup(userinfo) {

			UserRestangularFactory.all('signup').post("users", userinfo, {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
			}).then(function(postedUser) {
				$log.info(postedUser);
				$log.info("Success");
			}); 
		}

	}

})();