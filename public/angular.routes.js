(function(){
	'use strict';

	angular.module('app')

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

		$stateProvider
		    .state('dashboard', {
		      url: "/dashboard",
		      views: {
		        "contentView": { 
		        	templateUrl: "templates/dashboard.html"
		        	//controller: 'DashboardController as ctrl'
		        }
		      }
		    });

	
		$urlRouterProvider.otherwise("/dashboard");

	}]);

})();