(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.controller('BookGridController', BookGridController);

	/** @ngInject */
	function BookGridController($log, $state, $stateParams, BookGridService) {
		var vm = this;
		vm.books = [];

		books();

		function books() {
			return getBooks().then(function() {
				$log.info("获取书籍成功！");
			});
		}

		function getBooks() {
			return BookGridService.getBooks($stateParams.bookTypeId)
				.then(function(data) {
					vm.books = data;
					return vm.books;
				});
		}
	}
})();