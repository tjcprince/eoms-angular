(function() {
  'use strict';

  angular
    .module('eomsAngular')
    .filter('capitalize', capitalize);

  function capitalize() {
    function capWord(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
    return function(input, isEveryWord) {
      return (!input) ? '' : (!isEveryWord) ? capWord(input) : input.replace(/([^\W_]+[^\s-]*) */g, capWord);
    };
  }
})();