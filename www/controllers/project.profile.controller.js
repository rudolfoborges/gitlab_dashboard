(function(){
  'use strict';

  angular
    .module('gitdash')
    .controller('ProjectProfileController', ['$scope', '$http', '$stateParams', 'API', ProjectProfileController]);


  function ProjectProfileController($scope, $http, $stateParams, API){
    var ctrl = this;
    ctrl.user = {};
    ctrl.awards = [];
    ctrl.commits = [];
    ctrl.calendarChart;
    ctrl.contributors = [];

    ctrl.init = function(){
      $http.get(API.PROJECT + '/' + $stateParams.id).then(function(res){
        ctrl.project = res.data.project;
        ctrl.awards = res.data.awards;
        ctrl.contributors = res.data.contributors;
      });

      $http.get(API.PROJECT + '/' + $stateParams.id + '/commits').then(function(res){
        ctrl.commits = res.data;
      });

      var commitsNumbers = [['Date', 'Number']];
      $http.get(API.PROJECT + '/' + $stateParams.id + '/commits/groupByDay').then(function(res){
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
