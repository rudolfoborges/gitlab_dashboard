(function(){
  'use strict';

  angular
    .module('gitdash')
    .controller('UserProfileController', ['$scope', '$http', 'API', UserProfileController]);


  function UserProfileController(){
    var ctrl = this;
    ctrl.user = {};
    ctrl.commits = [];

    ctrl.int = function(){

    }

    ctrl.init();
  }


})();
