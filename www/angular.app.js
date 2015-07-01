(function(){
	'use strict';

	angular
		.module('gitdash', ['ui.router'])
		.constant('API', {
			PROJECT: '/api/v1/projects',
			USER: '/api/v1/users',
			COMMIT: '/api/v1/commits',
			RANKING: '/api/v1/ranking'
		})
		.config(['$locationProvider', '$httpProvider', '$provide',
				function($locationProvider, $httpProvider, $provide){
					$locationProvider.html5Mode(false).hashPrefix('!');
		}]);

})();
