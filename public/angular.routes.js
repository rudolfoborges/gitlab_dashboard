(function(){
	'use strict';

	angular
		.module('app')
		.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

			$stateProvider
				.state('dashboard', {
					url: "/dashboard",
					cache: true,
					abstract:true,
					controller: 'DashboardController',
					templateUrl: "templates/main.html"
				})

			    .state('dashboard.home', {
			      url: "/home",
			      cache: true,
			      views: {
			        "contentView": { 
			        	templateUrl: "templates/home.html",
			        	controller: 'HomeController as ctrl'
			        }
			      }
			    })

			    .state('dashboard.ranking', {
			      url: "/ranking",
			      cache: true,
			      views: {
			        "contentView": { 
			        	templateUrl: "templates/ranking.html",
			        	controller: 'RankingController as ctrl'
			        }
			      }
			    });

			$urlRouterProvider.otherwise("/dashboard/home");

		}]);

})();