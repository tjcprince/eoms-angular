(function() {
  'use strict';

  angular
    .module('eomsAngular')
    .config(routerConfig);

 /** @ngInject */
  function routerConfig($stateProvider, $logProvider, $urlRouterProvider, $authProvider, $windowProvider,$locationProvider) {
    $locationProvider.html5Mode(true);//去掉url中的#
    var $window = $windowProvider.$get();
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'

      })
      .state('signup', {
        url: '/signup',
       
        templateUrl: 'app/login/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      .state("home", {
        url: "/home",
        resolve: {
          loginRequired: loginRequired
        },
        views: {
          "": {
            templateUrl: "app/home/home.html",
            controller: 'HomeController',
            controllerAs: 'vm'
          }
        }
      })
      .state("home.eomsindex", {
        url: "/eomsindex",
        resolve: {
          loginRequired: loginRequired
        },
        views: {
          "": {
            templateUrl: "app/eomsindex/eomsindex.html",
            controller: 'EomsindexController',
            controllerAs: 'vm'
          }
        }
      })
      .state("home.ngtable", {
        url: "/ngtable/{homeid:[0-9]{1,4}}",
        resolve: {
          loginRequired: loginRequired
        },
        views: {
          "": {
            templateUrl: "app/ngtable/ngtable.html",
            controller: 'NgtableController',
            controllerAs: 'vm'
          }
        }
      })
      .state("home.anchorpage", {
        url: "/anchorpage",
        resolve: {
          loginRequired: loginRequired
        },
        views: {
          "": {
            templateUrl: "app/anchorpage/anchorpage.html",
            controller: 'AnchorpageController',
            controllerAs: 'vm'
          }
        }
      })
      .state("home.fullpage", {
        url: "/fullpage/{homeid:[0-9]{1,4}}",
        resolve: {
          loginRequired: loginRequired
        },
        views: {
          "": {
            templateUrl: "app/fullpage/fullpage.html",
            controller: 'FullpageController',
            controllerAs: 'vm'
          }
        }
      })
      .state("home.main", {
        url: "/main/{homeid:[0-9]{1,4}}",
        resolve: {
          loginRequired: loginRequired
        },
        views: {
          "": {
            templateUrl: "app/main/main.html",
            controller: 'MainController',
            controllerAs: 'vm'
          }
        }
      })
      .state("home.main.booklist", {
        url: "/booklist/{mainid:[0-9]{1,4}}",
        resolve: {
          loginRequired: loginRequired
        },
        views: {
          "": {
            templateUrl: "app/book/booklist.html"
          },
          "booktype@home.main.booklist": {
            templateUrl: "app/book/booktype.html",
            controller: 'BookTypeController',
            controllerAs: 'vm'
          }
        }
      }).state("home.main.booklist.bookgrid", {
        url: "/bookgrid/{bookTypeId:[0-9]{1,4}}",
        resolve: {
          loginRequired: loginRequired
        },
        views: {
          "": {
            templateUrl: "app/book/bookgrid.html",
            controller: 'BookGridController',
            controllerAs: 'vm'
          }
        }
      });

    $urlRouterProvider.otherwise('/login');
    
    $authProvider.facebook({
      clientId: '657854390977827'
    });

    $authProvider.google({
      clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com'
    });

    $authProvider.github({
      clientId: '0ba2600b1dbdb756688b'
    });

    $authProvider.linkedin({
      clientId: '77cw786yignpzj'
    });

    $authProvider.instagram({
      clientId: '799d1f8ea0e44ac8b70e7f18fcacedd1'
    });

    $authProvider.yahoo({
      clientId: 'dj0yJmk9SDVkM2RhNWJSc2ZBJmQ9WVdrOWIzVlFRMWxzTXpZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yYw--'
    });

    $authProvider.twitter({
      url: '/auth/twitter'
    });

    $authProvider.live({
      clientId: '000000004C12E68D'
    });

    $authProvider.twitch({
      clientId: 'qhc3lft06xipnmndydcr3wau939a20z'
    });

    $authProvider.bitbucket({
      clientId: '48UepjQDYaZFuMWaDj'
    });

    $authProvider.oauth2({
      name: 'foursquare',
      url: '/auth/foursquare',
      clientId: 'MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K',
      redirectUri: $window.location.origin || $window.location.protocol + '//' + $window.location.host,
      authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate'
    });

    // function skipIfLoggedIn($q, $auth) {
    //   var deferred = $q.defer();
    //   if ($auth.isAuthenticated()) {
    //     deferred.reject();
    //   } else {
    //     deferred.resolve();
    //   }
    //   return deferred.promise;
    // }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }
  }

})();
