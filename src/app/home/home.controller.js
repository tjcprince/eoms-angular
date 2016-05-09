(function() {
  'use strict';

  angular
    .module('eomsAngular')
    .controller('HomeController', HomeController).factory('Messages', function($websocket) {
  var ws = $websocket('ws://localhost:8080/eoms2016/websck');
  var collection = [];

  ws.onMessage(function(event) {
    console.log('message: ', event);
    var res;
    try {
      res = JSON.parse(event.data);
    } catch(e) {
      res = {'username': 'anonymous', 'message': event.data};
    }

    collection.push({
      username: res.username,
      content: res.message,
      timeStamp: event.timeStamp
    });
  });

  ws.onError(function(event) {
    console.log('connection Error', event);
  });

  ws.onClose(function(event) {
    console.log('connection closed', event);
  });

  ws.onOpen(function() {
    console.log('connection open');
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
      }
      else if (angular.isObject(message)) {
        ws.send(JSON.stringify(message));
      }
    }

  };
})
.controller('MessengerController', function($scope, Messages) {
  $scope.username = 'anonymous';

  $scope.Messages = Messages;

  $scope.submit = function(new_message) {
    if (!new_message) { return; }
    Messages.send({
      username: $scope.username,
      message: new_message
    });
    $scope.new_message = '';
  };


})
.filter('capitalize', function() {
  function capWord(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  }
  return function(input, isEveryWord) {
     return (!input) ? '' : (!isEveryWord) ? capWord(input) : input.replace(/([^\W_]+[^\s-]*) */g, capWord);
  };
});

  /** @ngInject */
  function HomeController($log, $state, UserRestangularFactory, $http) {
    var vm = this;

    vm.test = test;
    function test() {
      $http({
        method: 'GET',
        url: 'http://localhost:8080/eoms2016/auth/getUser',
        params: {
          'username': 'tan'
        }
      }).then(function(users) {
        $log.info(users);
        $log.info("getuser-Success");
        // for (var i = 0; i < users.length; i++) {
        //  $log.info(users[i]);
        // }
      });
    }

    vm.test1 = test1;

    function test1() {
      UserRestangularFactory.all('getUser').getList({
          username: "tan@163.com"
        }) // GET: /users
        .then(function(users) {
          $log.info(users);
          $log.info("getuser-Success");
          // for (var i = 0; i < users.length; i++) {
          //  $log.info(users[i]);
          // }
        })
    }


    vm.navtree = [{
      name: "运行维护类流程",
      link: "#",
      subtree: [{
        name: "集中化故障工单",
        link: "home.ngtable({homeid:0})"
      }, {
        name: "投诉处理工单",
        link: "#"
      }, {
        name: "网络优化",
        link: "#"
      }, {
        name: "家宽投诉处理工单",
        link: "#"
      }]
    }, {
      name: "业务实现类流程",
      link: "#",
      subtree: [{
        name: "新业务试点工单",
        link: "#"
      },{
        name: "新业务正式实施工单",
        link: "#"
      },{
        name: "网络数据管理工单",
        link: "#"
      },{
        name: "电路调度工单",
        link: "#"
      }
      ]
    }, {
      name: "divider",
      link: "#"

    }, {
      name: "管理支撑类流程",
      link: "#"
    }, {
      name: "divider",
      link: "#"
    }, {
      name: "任务类流程",
      link: "#"
    }];
vm.navtree1 = [{
      name: "网元管理",
      link: "＃"
    }, {
      name: "制定",
      link: "home.anchorpage({homeid:0})"
    }, {
      name: "审批",
      link: "#"
    }, {
      name: "执行",
      link: "#"
    }, {
      name: "执行",
      link: "#"
    }, {
      name: "执行",
      link: "#"
    }, {
      name: "执行",
      link: "#"
    }, {
      name: "执行",
      link: "#"
    }, {
      name: "执行",
      link: "#"
    }, {
      name: "执行",
      link: "#"
    }, {
      name: "执行",
      link: "#"
    }, {
      name: "执行",
      link: "#"
    }, {
      name: "执行",
      link: "#"
    }, {
      name: "执行",
      link: "#"
    }, {
      name: "执行",
      link: "#"
    }, {
      name: "执行",
      link: "#"
    }, {
      name: "执行",
      link: "#"
    }, {
      name: "执行",
      link: "#"
    } ];
vm.navtree2 = [{
      name: "全屏切换",
      link: "home.fullpage({homeid:0})"
    }, {
      name: "锚点切换",
      link: "home.anchorpage({homeid:0})"
    }, {
      name: "第三屏",
      link: "#"
    }, {
      name: "第四屏",
      link: "#"
    } ];

    vm.aside = {
      "title": "标题",
      "content": "dasd"
    };

    // $state.go("home.fullpage", {
    //   'homeid': 0
    // });
//abn-tree:begin
    vm.select="";
    var _selected, treedata_avm;
    _selected = function(branch) {
      $state.go("home.ngtable", {
        'homeid': branch.mainid
      });
      vm.select=branch.label;
    };
    treedata_avm = [{
      label: '菜单1',
      children: [{
        mainid:1,
        label: '菜单1-1',
        data: {
          description: "man's best friend"
        },
        onSelect: _selected
      }, {
        mainid:2,
        label: '菜单1-2',
        data: {
          description: "Felis catus"
        },
        onSelect: _selected
      }, {
        mainid:3,
        label: '菜单1-3',
        data: {
          description: "hungry, hungry"
        },
        onSelect: _selected
      }, {
        mainid:4,
        label: '菜单1-4',
        children: ['菜单1-4-1', '菜单1-4-2', '菜单1-4-3']
      }]
    }, {
      label: 'Vegetable',
      data: {
        definition: "A plant or part of a plant used as food, typically as accompaniment to meat or fish, such as a cabbage, potato, carrot, or bean.",
        data_can_contain_anything: true
      },
      onSelect: function(branch) {
        return vm.output = "Vegetable: " + branch.data.definition;
      },
      children: [{
        label: 'Oranges'
      }, {
        label: 'Apples',
        children: [{
          label: 'Granny Smith',
          onSelect: _selected,
          mainid:5
        }, {
          label: 'Red Delicous',
          onSelect: _selected
        }, {
          label: 'Fuji',
          onSelect: _selected
        }]
      }]
    }, {
      label: 'Mineral',
      children: [{
        label: 'Rock',
        children: ['Igneous', 'Sedimentary', 'Metamorphic']
      }, {
        label: 'Metal',
        children: ['Aluminum', 'Steel', 'Copper']
      }, {
        label: 'Plastic',
        children: [{
          label: 'Thermoplastic',
          children: ['polyethylene', 'polypropylene', 'polystyrene', ' polyvinyl chloride']
        }, {
          label: 'Thermosetting Polymer',
          children: ['polyester', 'polyurethane', 'vulcanized rubber', 'bakelite', 'urea-formaldehyde']
        }]
      }]
    }];

    vm.my_data = treedata_avm;
  //abn-tree:end
  }
})();