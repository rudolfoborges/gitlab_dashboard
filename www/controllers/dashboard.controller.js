(function(){
	'use strict';

	angular
		.module('gitdash')
		.controller('DashboardController', ['$scope', '$http', 'API', DashboardController]);

	function DashboardController($scope, $http, API){
		var ctrl = this;

		$scope.projects = [];

		ctrl.init = function(){
			$http.get(API.PROJECT).then(function(res){
				$scope.projects = res.data;
			});
		}

		ctrl.init();
	}


})();
