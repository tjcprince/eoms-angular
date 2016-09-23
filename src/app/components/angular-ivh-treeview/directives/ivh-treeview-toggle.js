(function() {
  'use strict';
  /**
   * Toggle logic for treeview nodes
   *
   * Handles expand/collapse on click. Does nothing for leaf nodes.
   *
   * @private
   * @package ivh.treeview
   * @copyright 2014 iVantage Health Analytics, Inc.
   */

  angular.module('ivh.treeview').directive('ivhTreeviewToggle', ivhTreeviewToggle);
  /** @ngInject */
  function ivhTreeviewToggle(ivhTreeviewEomsTreedata) {
    'use strict';
    return {
      restrict: 'A',
      require: '^ivhTreeview',
      link: function(scope, element, attrs, trvw) {
        var node = scope.node;

        element.addClass('ivh-treeview-toggle');
        if (node.leaf == "0") { //判断节点是否有子节点 0 是 1否
          element.addClass('ivh-treeview-node-collapsed'); //添加类似文件夹的图标
        }
        element.bind('click', function() {
          //判断节点是否有子节点 以及是否已经查询过一次了
          if (node.leaf == "0" && trvw.isLeaf(node)) {
            var urlClass = element.attr('urlClass');
            var urlMethod = element.attr('urlMethod');
            ivhTreeviewEomsTreedata.queryTree(urlClass, urlMethod, node.id).then(function(data) {
              node.children = data; //添加数据
              //添加数据后，打开节点
              trvw.toggleExpanded(node);
              trvw.onToggle(node);
              element.removeClass('ivh-treeview-node-collapsed'); //打开节点后，删除类似文件夹的图标
            });
          } else {
            if (!trvw.isLeaf(node)) {
              scope.$apply(function() {
                trvw.toggleExpanded(node);
                trvw.onToggle(node);
                element.removeClass('ivh-treeview-node-collapsed'); //打开节点后，删除类似文件夹的图标
              });
            }
          }

        });
      }
    };
  }
})();