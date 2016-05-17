(function() {
  'use strict';

  angular
    .module('eomsAngular')
    .controller('MessengerController', MessengerController)
    /*@ngInject*/
    function MessengerController(Messages) {
      var vm=this;
      vm.username = 'anonymous';

      vm.Messages = Messages;

      vm.submit = submit;

      function submit(new_message) {
        if (!new_message) {
          return;
        }
        Messages.send({
          username: vm.username,
          message: new_message
        });
        new_message = '';
      }
    }

    
})();