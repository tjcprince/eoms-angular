(function() {
	'use strict';

	angular
		.module('eomsAngular')
		.service('HomeService', HomeService);

	/** @ngInject*/
	function HomeService(Restangular) {

		var service = {
			queryMenu:queryMenu,
			menuByCode:menuByCode
		};

		return service;
		
		function queryMenu(){
			return Restangular.one('menuController', 'menu').getList();
		}

		function menuByCode(parentcode){
			return Restangular.one('menuController').getList('menuByCode',{parentcode:parentcode});
		}

	}

})();