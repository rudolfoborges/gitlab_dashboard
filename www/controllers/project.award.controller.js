(function(){
  'use strict';

  angular
    .module('gitdash')
    .controller('ProjectAwardController', ['$scope', '$http', 'API', ProjectAwardController]);

  function ProjectAwardController($scope, $http, API){
    var ctrl = this;
    var awards = [];

    ctrl.init = function(){
      $http.get(API.AWARD + '/project').then(function(res){
        ctrl.awards = res.data;
      });
    }

    ctrl.init();
  }

})();
