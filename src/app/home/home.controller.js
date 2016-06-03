(function() {
  'use strict';

  angular
    .module('eomsAngular')
    .controller('HomeController', HomeController).directive('resize', function($window) {
      return function(scope, element) {

        var w = angular.element($window);
        scope.$watch(function() {
          return {
            'h': w.height(),
            'w': w.width()
          };
        }, function(newValue, oldValue) {
          var height = angular.element(element).height();
          if (height == 0) {
            angular.element("body").css({
              "padding-top": 60 + "px"
            });
          } else if (newValue.w != oldValue.w) {
            angular.element("body").css({
              "padding-top": 70 + height - 60 + "px"
            });
          }

        }, true);

        w.bind('resize', function() {
          scope.$apply();
        });
      }
    }).directive('onFinishRenderFilters', function($timeout) {
      return {
        restrict: 'A',
        link: function(scope, element) {
          if (scope.$last === true) {
            $timeout(function() {
              var left=element[0].offsetLeft;
              if (left!=15) {
                var top = element[0].offsetTop;
                angular.element("body").css({
                  "padding-top": 70 + top - ((top - 10) / 30 + 1) * 10 + "px"
                });
              }
              //根据controller的关系是选择$emit或者$broadcast
              scope.$emit('ngRepeatFinished');
            });
          }
        }
      };
    });
  /** @ngInject */
  function HomeController($log, $state, $window, UserRestangularFactory, $http, HomeService, $aside, $scope) {
    var vm = this;

    // var w = angular.element($window);
    // $scope.$watch(
    //   function () {
    //     console.info("aaaa");
    //     return $window.innerWidth;
    //   },
    //   function (value) {
    //      console.info("bbbbb");
    //     $scope.windowWidth = value;
    //   },
    //   true
    // );

    // w.bind('resize', function(){
    //   $scope.$apply();
    // });
    //查询首页菜单--begin
    HomeService.queryMenu().then(function(data) {
      vm.menuList = data;
      // vm.my_data = []; //初始化菜单树
    });
    //vm.activerow = 0; //默认第一个项目加上class  

    vm.my_tree = {};
    vm.selectCode = "";
    //创建侧边树
    vm.show = function() {
        var myOtherAside = $aside({
          title: 'My Title',
          content: 'My Content',
          scope: $scope,
          templateUrl: 'app/commons/navTree.html',
          show: false
        });
        myOtherAside.$promise.then(function() {
          myOtherAside.show();
        })
      }
      //侧边树点击节点 触发的函数
    vm.my_tree_handler = function(branch) {
        if (branch.ISLEAF == 1) {
          $state.go("home.ngtable", {
            'homeid': branch.CODE
          });
          vm.selectCode = branch.CODE;
        }
      }
      //首页菜单选中
    vm.isCurrent = function(index, code) {
        vm.activerow = index;
        vm.my_data = []; //初始化侧边菜单数据
        vm.show(); //打开侧边页面、
        //获取选中的菜单的侧边树的数据
        HomeService.menuByCode(code).then(function(data) {
          vm.my_data = data;
        });
        vm.isCollapsed=false;
      }
      //查询首页菜单--end


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
      }, {
        name: "新业务正式实施工单",
        link: "#"
      }, {
        name: "网络数据管理工单",
        link: "#"
      }, {
        name: "电路调度工单",
        link: "#"
      }]
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
    }];
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
    }];

    vm.aside = {
      "title": "标题",
      "content": "dasd"
    };

    // $state.go("home.fullpage", {
    //   'homeid': 0
    // });
    //abn-tree:begin
    // vm.select = "";
    // var _selected, treedata_avm;
    // _selected = function(branch) {
    //   $state.go("home.ngtable", {
    //     'homeid': branch.mainid
    //   });
    //   vm.select = branch.label;
    // };
    // treedata_avm = [{
    //   label: '菜单1',
    //   children: [{
    //     mainid: 1,
    //     label: '菜单1-1',
    //     data: {
    //       description: "man's best friend"
    //     },
    //     onSelect: _selected
    //   }, {
    //     mainid: 2,
    //     label: '菜单1-2',
    //     data: {
    //       description: "Felis catus"
    //     },
    //     onSelect: _selected
    //   }, {
    //     mainid: 3,
    //     label: '菜单1-3',
    //     data: {
    //       description: "hungry, hungry"
    //     },
    //     onSelect: _selected
    //   }, {
    //     mainid: 4,
    //     label: '菜单1-4',
    //     children: ['菜单1-4-1', '菜单1-4-2', '菜单1-4-3']
    //   }]
    // }, {
    //   label: 'Vegetable',
    //   data: {
    //     definition: "A plant or part of a plant used as food, typically as accompaniment to meat or fish, such as a cabbage, potato, carrot, or bean.",
    //     data_can_contain_anything: true
    //   },
    //   onSelect: function(branch) {
    //     return vm.output = "Vegetable: " + branch.data.definition;
    //   },
    //   children: [{
    //     label: 'Oranges'
    //   }, {
    //     label: 'Apples',
    //     children: [{
    //       label: 'Granny Smith',
    //       onSelect: _selected,
    //       mainid: 5
    //     }, {
    //       label: 'Red Delicous',
    //       onSelect: _selected
    //     }, {
    //       label: 'Fuji',
    //       onSelect: _selected
    //     }]
    //   }]
    // }, {
    //   label: 'Mineral',
    //   children: [{
    //     label: 'Rock',
    //     children: ['Igneous', 'Sedimentary', 'Metamorphic']
    //   }, {
    //     label: 'Metal',
    //     children: ['Aluminum', 'Steel', 'Copper']
    //   }, {
    //     label: 'Plastic',
    //     children: [{
    //       label: 'Thermoplastic',
    //       children: ['polyethylene', 'polypropylene', 'polystyrene', ' polyvinyl chloride']
    //     }, {
    //       label: 'Thermosetting Polymer',
    //       children: ['polyester', 'polyurethane', 'vulcanized rubber', 'bakelite', 'urea-formaldehyde']
    //     }]
    //   }]
    // }];

    //abn-tree:end
    $state.go("home.eomsindex");
  }
})();