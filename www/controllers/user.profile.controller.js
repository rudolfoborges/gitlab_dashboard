(function(){
  'use strict';

  angular
    .module('gitdash')
    .controller('UserProfileController', ['$scope', '$http', '$stateParams', 'API', UserProfileController]);


  function UserProfileController($scope, $http, $stateParams, API){
    var ctrl = this;
    ctrl.user = {};
    ctrl.commits = [];
    ctrl.calendarChart;

    ctrl.init = function(){
      $http.get(API.USER + '/' + $stateParams.id).then(function(res){
        ctrl.user = res.data;
      });

      $http.get(API.USER + '/' + $stateParams.id + '/commits').then(function(res){
        ctrl.commits = res.data;
      });

      var commitsNumbers = [['Date', 'Number']];
      $http.get(API.USER + '/' + $stateParams.id + '/commits/groupByDay').then(function(res){
        res.data.forEach(function(item){
					var dateSplit = item.createdAt.split('-');
					commitsNumbers.push([new Date(dateSplit[0], dateSplit[1], dateSplit[2]), item.commits]);
				});
				ctrl.calendarChart = new Chart('Calendar');
				ctrl.calendarChart.setData(commitsNumbers);
				ctrl.calendarChart.setOptions({width: 1000});
      });

    }

    ctrl.init();
  }


})();
