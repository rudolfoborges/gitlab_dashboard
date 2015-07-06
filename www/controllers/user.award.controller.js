(function(){
  'use strict';

  angular
    .module('gitdash')
    .controller('UserAwardController', ['$scope', '$http', 'API', UserAwardController]);

  function UserAwardController($scope, $http, API){
    var ctrl = this;
    var awards = [];

    ctrl.init = function(){
      $http.get(API.AWARD + '/user').then(function(res){
        ctrl.awards = res.data;
      });
    }

    ctrl.init();
  }

})();
