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

			    .state('dashboard.ranking_users', {
			      url: "/ranking/users",
			      cache: true,
			      views: {
			        "contentView": { 
			        	templateUrl: "templates/user.ranking.html",
			        	controller: 'UserRankingController as ctrl'
			        }
			      }
			    })

			    .state('dashboard.ranking_projects', {
			      url: "/ranking/projects",
			      cache: true,
			      views: {
			        "contentView": { 
			        	templateUrl: "templates/project.ranking.html",
			        	controller: 'ProjectRankingController as ctrl'
			        }
			      }
			    })

			    .state('dashboard.userView', {
			      url: "/users/:id/view",
			      cache: true,
			      views: {
			        "contentView": { 
			        	templateUrl: "templates/project.ranking.html",
			        	controller: 'ProjectRankingController as ctrl'
			        }
			      }
			    })

			    .state('dashboard.projectView', {
			      url: "/projects/:id/view",
			      cache: true,
			      views: {
			        "contentView": { 
			        	templateUrl: "templates/project.ranking.html",
			        	controller: 'ProjectRankingController as ctrl'
			        }
			      }
			    });

			$urlRouterProvider.otherwise("/dashboard/home");

		}]);

})();