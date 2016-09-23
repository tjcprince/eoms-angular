(function() {
  'use strict';
  /**
   * 删除树图节点
   * @param  {[type]} ivhTreeviewMgr  [description]
   * @param  {[type]} ivhTreeviewBfs) {             'use strict';  return {    restrict: 'A',    require: '^ivhTreeview',    link: function(scope, element, attrs, trvw) {      var root [description]
   * @return {[type]}                 [description]
   */
  angular.module('ivh.treeview').directive('ivhTreeviewEomsRemove', ivhTreeviewEomsRemove);
  /** @ngInject */
  function ivhTreeviewEomsRemove(ivhTreeviewMgr, ivhTreeviewBfs) {
    'use strict';
    return {
      restrict: 'A',
      require: '^ivhTreeview',
      link: function(scope, element, attrs, trvw) {
        var root = trvw.root(); //获取树图数据
        if (scope.depth == 1) { //给第一层节点添加删除功能
          element.append('<i class="fa fa-times" aria-hidden="true"></i>'); //添加删除的图标
          element.addClass('ivh-treeview-cursor'); //添加手型样式
        }
        //删除方法
        scope.kill = function(nodeToKill) {
          var cont = true;
          ivhTreeviewBfs(root, function(node, parents) {
            if (node === nodeToKill) {
              cont = false;
              if (parents.length) {
                var nIx = parents[0].children.indexOf(node);
                parents[0].children.splice(nIx, 1);
                ivhTreeviewMgr.validate(root, trvw.opts());
              } else {
                root.length = 0;
              }
            }
            return cont;
          });
        };
      }
    };
  }
})();