(function() {
  'use strict';

  angular
    .module('eomsAngular')
    .controller('AnchorpageController', AnchorpageController);

  /** @ngInject */
  function AnchorpageController() {
    var vm = this;
    // vm.selectMenu = selectMenu;

    // function selectMenu($event) {

    //   angular.element("#anchorpage-menu li").removeClass('active');
    //   angular.element($event.currentTarget).addClass('active');
    // }

    vm.multiplePanels = [{
      "title": "基本信息",
      "body": "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
    }, {
      "title": "流转信息",
      "body": "Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee."
    }, {
      "title": "流程图",
      "body": "Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade."
    }, {
      "title": "附件",
      "body": "Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade."
    }];
    vm.multiplePanels.activePanels = [0,1,2,3];
   
  }
})();