(function(){
  'use strict';

  angular
    .module('gitdash')
    .controller('UserProfileController', ['$scope', '$http', '$routeParams', 'API', UserProfileController]);


  function UserProfileController($scope, $http, $routeParams, API){
    var ctrl = this;
    ctrl.user = {};
    ctrl.commits = [];

    ctrl.init = function(){
      $http.get(API.USER + '/' + $routeParams.id, function(res){
        ctrl.user = res.data;
      });
    }

    ctrl.init();
  }


})();
