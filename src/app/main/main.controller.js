(function() {
  'use strict';

  angular
    .module('eomsAngular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log,$state) {
    var vm = this;

    var _selected, treedata_avm;
    _selected = function(branch) {
      $state.go("home.main.booklist", {
        'mainid': branch.mainid
      });
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
          onSelect: _selected
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
  }
})();