(function(){
	'use strict';

	angular.module('app')

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

		/*
		$stateProvider
		    .state('classes', {
		      url: "/turmas",
		      views: {
		        "contentView": { 
		        	templateUrl: "templates/classes.html",
		        	controller: 'ClassController as ctrl'
		        }
		      }
		    })

		    .state('classDetail', {
		      url: "/turma/:id",
		      views: {
		        "contentView": { 
		        	templateUrl: "templates/class_detail.html",
		        	controller: 'ClassController as ctrl'
		        }
		      }
		    });
		*/

		$urlRouterProvider.otherwise("/#!/");

	}]);

})();