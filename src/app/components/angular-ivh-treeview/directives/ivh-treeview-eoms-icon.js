angular.module('ivh.treeview').directive('ivhTreeviewEomsIcon', [function() {
  'use strict';
  return {
    restrict: 'A',
    require: '^ivhTreeview',
    link: function(scope, element, attrs, trvw) {
      var node = scope.node;
      if (node.icon == 'dept') {
        element.append('<i class="fa fa-users" aria-hidden="true"></i>');
      } else if (node.icon=='user') {
        element.append('<i class="fa fa-user" aria-hidden="true"></i>');
      } else {
        element.append('<i class="fa fa-folder-o" aria-hidden="true"></i>');
      }


    }
  };
}]);