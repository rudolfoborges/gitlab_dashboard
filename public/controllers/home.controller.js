(function(){
	'use strict';

	angular
		.module('app')
		.controller('HomeController', ['$scope', '$http', 'API', HomeController]);

	function HomeController($scope, $http, API){
		var ctrl = this;

		ctrl.users = [];
		ctrl.commits = [];
		ctrl.ranking = [];
		ctrl.barChart;
		ctrl.calendarChart;

		ctrl.init = function(){
			$http.get(API.USER).then(function(res){
				ctrl.users = res.data;
			});

			$http.get(API.COMMIT).then(function(res){
				ctrl.commits = res.data;
			});

			$http.get(API.RANKING + '/monthly').then(function(res){
				ctrl.ranking = res.data;
			});

			var projectsCommits = [['Project', 'Commits']];
			$http.get(API.PROJECT + '/commits').then(function(res){
				res.data.forEach(function(item){
					projectsCommits.push([item.project.name, item.commits]);
				});
				ctrl.barChart = new Chart('Bar');
				ctrl.barChart.setData(projectsCommits);
				ctrl.barChart.setOptions({});
			});

			var commitsNumbers = [['Date', 'Number']];
			$http.get(API.COMMIT + '/numbers').then(function(res){
				res.data.forEach(function(item){
					var dateSplit = item.createdAt.substring(0,10).split('-');
					console.log(dateSplit[0], parseInt(dateSplit[1]) + 1, dateSplit[2]);
					commitsNumbers.push([new Date(dateSplit[0], parseInt(dateSplit[1]) - 1, dateSplit[2]), item.commits]);
				});
				ctrl.calendarChart = new Chart('Calendar');
				ctrl.calendarChart.setData(commitsNumbers);
				ctrl.calendarChart.setOptions({});
			});
		}

		ctrl.init();
	}


})();