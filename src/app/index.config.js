(function() {
  'use strict';

  angular
    .module('eomsAngular')
    .config(config)
    .config(httpProviderConfig)
    .factory('httpInterceptorFactory', httpInterceptorFactory)
    .config(httpInterceptorConfig)
    .config(restangularConfig)
    .config(ivhTreeviewOptionsConfig)
    ;

  /**
   * 设置$httpProvider 访问后台缺省配置(解决spring接收不到参数问题)
   * @param  {[type]} $httpProvider [description]
   * @return {[type]}               [description]
   */
  function httpProviderConfig($httpProvider) {
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
      /**
       * The workhorse; converts an object to x-www-form-urlencoded serialization.
       * @param {Object} obj
       * @return {String}
       */
      var param = function(obj) {
        var query = '';
        var name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
          value = obj[name];

          if (value instanceof Array) {
            for (i = 0; i < value.length; ++i) {
              subValue = value[i];
              fullSubName = name + '[' + i + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          } else if (value instanceof Object) {
            for (subName in value) {
              subValue = value[subName];
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          } else if (angular.isDefined(value) && value !== null) {
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
          }
        }

        return query.length ? query.substr(0, query.length - 1) : query;
      };

      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
  }
  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;
  }
  /** @ngInject */
  function restangularConfig(RestangularProvider,eomsIp) {
    RestangularProvider.setBaseUrl('http://'+eomsIp+':8080/eoms2016');
    //RestangularProvider.setRequestSuffix('.json');
    //RestangularProvider.setJsonp(true);
    // RestangularProvider.setDefaultRequestParams('jsonp', {
    //   callback: 'JSON_CALLBACK'
    // });
    RestangularProvider.setDefaultHeaders({token: "x-restangular"});
    RestangularProvider.setDefaultHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    // RestangularProvider.setDefaultHeaders({
    //         'Content-Type':'application/json',
    //         'Access-Control-Allow-Origin':'*',
    //         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    //     });
    
    RestangularProvider.setDefaultHttpFields({cache: true})
    RestangularProvider.setFullRequestInterceptor(function (element, operation, route, url, headers, params, httpConfig) {
      return {
        element: element,
        params: params,
        headers: headers,
        httpConfig: _.extend(httpConfig, {skipAuthorization: false})
      };
    });
    RestangularProvider.addResponseInterceptor(function(data, operation) {
      var extractedData;
      if (operation === "getList") {
        extractedData = data.entity;//后台必须返回json也就是new ArrayList()
        extractedData.status = data.status;
      } else {
        extractedData = data;
      }
      return extractedData;
    });

  }

  /** @ngInject */
  function httpInterceptorConfig($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptorFactory');
  }
  /** @ngInject */
  function httpInterceptorFactory($q) {

    var interceptor = {
      'request': function(config) {
        return config;
      },
      'response': function(resp) {
        return resp;
      },
      'requestError': function(rejection) {
        return $q.reject(rejection);
      },
      'responseError': function(rejection) {
        return rejection
      }
    }
    return interceptor;
  }
  /** @ngInject */
  function ivhTreeviewOptionsConfig(ivhTreeviewOptionsProvider){
    ivhTreeviewOptionsProvider.set({
    idAttribute: 'id',
    labelAttribute: 'label',
    childrenAttribute: 'children',
    selectedAttribute: 'selected',
    useCheckboxes: false,
    expandToDepth: 0,
    indeterminateAttribute: '__ivhTreeviewIndeterminate',
    expandedAttribute: '__ivhTreeviewExpanded',
    defaultSelectedState: false,
    validate: true,
    twistieExpandedTpl: '<i class="fa fa-minus" aria-hidden="true"></i>',
    twistieCollapsedTpl: '<i class="fa fa-plus" aria-hidden="true"></i>',
    twistieLeafTpl: '<i class="fa fa-plus" aria-hidden="true" style="opacity:0;"></i>'//设置为透明了，为了占位
  });
  }
})();
