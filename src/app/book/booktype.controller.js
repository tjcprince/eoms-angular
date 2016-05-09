(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.controller('BookTypeController', BookTypeController);

	/** @ngInject */
	function BookTypeController($log, $state, $scope) {

		$scope.modal = {
			"title": "Title",
			"content": "Hello Modal<br />This is a multiline message!"
		};
		$scope.aside = {
			"title": "Title",
			"content": "Hello Aside<br />This is a multiline message!"
		};

		$log.info("booktype-----");
		$state.go("home.main.booklist.bookgrid", {
			bookTypeId: 0
		});
	}
})();