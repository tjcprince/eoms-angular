/**
 * 设置树图节点选中
 * @param  {[type]} ) {             'use strict';  return {    restrict: 'A',    require: '^ivhTreeview',    link: function(scope, element, attrs, trvw) {      var node [description]
 * @return {[type]}   [description]
 */
angular.module('ivh.treeview').directive('ivhTreeviewEomsSelect', [function() {
  'use strict';
  return {
    restrict: 'A',
    require: '^ivhTreeview',
    link: function(scope, element, attrs, trvw) {
      var node = scope.node;

      element.addClass('ivh-treeview-cursor');

      element.bind('click', function() {
        element.addClass('ivh-treeview-selected');
        //设置选中的节点和取消上次选中节点的样式
        trvw.selectedNode(scope.node,element);
      });
    }
  };
}]);
