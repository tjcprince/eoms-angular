(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.service('UserService', UserService);

	/** @ngInject*/
	function UserService(Restangular, $log,UserRestangularFactory) {
		var service = {
			getUser: getUser,
			putUser: putUser//表单提交
		};
		return service;

		function getUser(username) {
			UserRestangularFactory.all('getUser').getList({username: username}) // GET: /users
				.then(function(users) {
					$log.info(users);
					$log.info("getuser-Success");
					// for (var i = 0; i < users.length; i++) {
					// 	$log.info(users[i]);
					// }
				})
		}

		function putUser() {
			var formData = {
				"email": "aaa@163",
				"password": "11111",
				"displayName": "谭"
			};

			UserRestangularFactory.all('signup').post("users", formData, {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
			}).then(function(postedUser) {
				$log.info(postedUser);
				$log.info("Success");
			}); 
		}
	}

})();