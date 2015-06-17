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
		}


		ctrl.init();
	}


})();