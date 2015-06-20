(function(){
	'use strict';

	

	angular
		.module('app')
		.controller('DashboardController', ['$scope', '$http', 'API', DashboardController]);

	function DashboardController($scope, $http, API){
		var ctrl = this;

		ctrl.projects = [];
		ctrl.users = [];
		ctrl.commits = [];
		ctrl.ranking = [];
		ctrl.barChart;
		ctrl.calendarChart;

		ctrl.init = function(){
			

			$http.get(API.PROJECT).then(function(res){
				ctrl.projects = res.data;
			});

			$http.get(API.USER).then(function(res){
				ctrl.users = res.data;
			});

			$http.get(API.COMMIT).then(function(res){
				ctrl.commits = res.data;
			});

			$http.get(API.RANKING).then(function(res){
				ctrl.ranking = res.data;
			});

			var projectsCommits = [['Projeto', 'Commits']];
			$http.get(API.PROJECT + '/commits').then(function(res){
				res.data.forEach(function(item){
					projectsCommits.push([item.project.name, item.commits]);
				});
				ctrl.barChart = new Chart('Bar');
				ctrl.barChart.setData(projectsCommits);
				ctrl.barChart.setOptions({});
			});

			var commitsNumbers = [['Data', 'Quantidade']];
			$http.get(API.COMMIT + '/numbers').then(function(res){
				res.data.forEach(function(item){
					console.log(item.createdAt.substring(0,10));
					commitsNumbers.push([new Date(item.createdAt.substring(0,10)), item.commits]);
				});
				ctrl.calendarChart = new Chart('Calendar');
				ctrl.calendarChart.setData(commitsNumbers);
				ctrl.calendarChart.setOptions({});
			});
		}

		ctrl.init();
	}


})();