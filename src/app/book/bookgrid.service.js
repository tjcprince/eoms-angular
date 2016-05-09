(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.service('BookGridService', BookGridService);

	/** @ngInject*/
	function BookGridService($http, $log) {

		var service = {
			getBooks: getBooks
		};

		return service;

		function getBooks(bookTypeID) {

			return $http.get('app/data/books'+bookTypeID+'.json').then(getLoginComplete)
				.catch(getLoginFailed);

			function getLoginComplete(response) {
				return response.data;
			}

			function getLoginFailed(error) {
				$log.error('XHR Failed for getAvengers.' + error.data);
			}
		}
	}

})();