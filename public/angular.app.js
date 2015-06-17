(function(){
	'use strict';

	angular
		.module('app', ['ui.router'])
		.constant('API', {
			PROJECT: '/api/projects',
			USER: '/api/users',
			COMMIT: '/api/commits',
			RANKING: '/api/ranking'
		})
		.config(['$locationProvider', '$httpProvider', '$provide',
				function($locationProvider, $httpProvider, $provide){
					$locationProvider.html5Mode(false).hashPrefix('!');
		}]);

})();