(function() {
  'use strict';

  angular
    .module('eomsAngular')
    .factory('Messages', Messages)
  /* @ngInject*/
  function Messages($websocket,$log) {
    var ws = $websocket('ws://localhost:8080/eoms2016/websck');
    var collection = [];

    ws.onMessage(function(event) {
      $log.info('message: ', event);
      var res;
      try {
        res = angular.fromJson(event.data);
        $log.info('message: ', res);
      } catch (e) {
        res = {
          'username': 'anonymous',
          'message': event.data
        };
      }

      collection.push({
        username: res.username,
        content: res.message,
        timeStamp: event.timeStamp
      });
    });

    ws.onError(function(event) {
      $log.info('connection Error', event);
    });

    ws.onClose(function(event) {
      $log.info('connection closed', event);
    });

    ws.onOpen(function() {
      $log.info('connection open');
      ws.send('Hello World');
      ws.send('again');
      ws.send('and again');
    });
    // setTimeout(function() {
    //   ws.close();
    // }, 500)

    return {
      collection: collection,
      status: function() {
        return ws.readyState;
      },
      send: function(message) {
        if (angular.isString(message)) {
          ws.send(message);
        } else if (angular.isObject(message)) {
          ws.send(angular.toJson(message));
        }
      }

    };
  }
})();