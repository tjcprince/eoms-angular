(function() {
  'use strict';

  angular
    .module('eomsAngular')
    .directive('eomsSelect', eomsSelect);

  /** @ngInject */
  function eomsSelect(EomsSelectService) {
    var directive = {
      restrict: 'AE',
      require: 'ngModel',
      scope: {
        initDictId: '='
      },
      link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attr, ngModel) {

      var dictid = attr.initDictId; //初始化的字典值id
      EomsSelectService.queryDict(dictid).then(function(data) { //根据字典值id查询 子字典值
        el.empty();//情况angular自带的空值
        el.append("<option value=''>" + el.attr('title') + "</option>");
        angular.forEach(data, function(obj) {
          if (obj.DICTID == ngModel.$modelValue) { //要默认选中的字典值
            el.append("<option value='" + obj.DICTID + "' selected>" + obj.DICTNAME + "</option>");
            setSelect(ngModel.$modelValue, attr.sub); //设置级联 子列表默认选中
          } else {
            el.append("<option value='" + obj.DICTID + "'>" + obj.DICTNAME + "</option>");
          }
        });
      });

      var sub = attr.sub; //级联下拉 的子下拉列表的id
      if (sub) {
        el.bind('change', function() { //给当前下拉列表绑定事件
          var selectVal = el.children('option:selected').val();
          var subEl = angular.element("#" + sub);
          clearEl(sub); //重置级联的子列表
          //subEl.attr('disabled', false);

          EomsSelectService.queryDict(selectVal).then(function(data) {
            angular.forEach(data, function(obj) {
              subEl.append("<option value='" + obj.DICTID + "'>" + obj.DICTNAME + "</option>");
            });
          });
        });
      }

      // el.triggerHandler('change')
    }
    //设置默认选中
    function setSelect(selectVal, sub) {

      var subEl = angular.element("#" + sub);
      var ctrl = subEl.data('$ngModelController');
      //subEl.attr('disabled', false);
      subEl.empty();
      subEl.append("<option value=''>" + subEl.attr('title') + "</option>");
      EomsSelectService.queryDict(selectVal).then(function(data) {
        angular.forEach(data, function(obj) {
          if (obj.DICTID == ctrl.$modelValue) {
            subEl.append("<option value='" + obj.DICTID + "' selected>" + obj.DICTNAME + "</option>");
          } else {
            subEl.append("<option value='" + obj.DICTID + "'>" + obj.DICTNAME + "</option>");
          }
        });
      });
      if (subEl.attr('sub')) {
        setSelect(ctrl.$modelValue, subEl.attr('sub'));
      }
    }

    //重置子的下拉列表
    function clearEl(sub) {
      var subEl = angular.element("#" + sub);
      var ctrl = subEl.data('$ngModelController');
      ctrl.$valid = false;
      // subEl.attr('disabled', true);
      subEl.empty();
      subEl.append("<option value=''>" + subEl.attr('title') + "</option>");
      if (subEl.attr('sub')) {
        clearEl(subEl.attr('sub'));
      }
    }

  }

})();