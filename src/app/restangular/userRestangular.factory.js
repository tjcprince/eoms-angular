(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.factory('UserRestangularFactory', UserRestangularFactory);

	/** @ngInject*/
	function UserRestangularFactory(Restangular) {
		return Restangular.withConfig(function(RestangularConfigurer) {
			RestangularConfigurer.setBaseUrl('http://localhost:8080/eoms2016/auth/');
		});
	}

})();