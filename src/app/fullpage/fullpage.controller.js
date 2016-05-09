(function() {
  'use strict';

  angular
    .module('eomsAngular')
    .controller('FullpageController', FullpageController);

  /** @ngInject */
  function FullpageController() {
    var vm = this;
    vm.mainOptions = {
      sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#ccddff','#FFC0CB'],
      anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
      menu:'#fullpage-menu'
    };
    // $state.go("home.main", {
    //   'homeid': 0
    // });

   
  }
})();