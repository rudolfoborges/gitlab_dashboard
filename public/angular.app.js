(function(){
	'use strict';

	angular
		.module('app', ['ui.router'])

	.config(['$locationProvider', '$httpProvider', '$provide',
			function($locationProvider, $httpProvider, $provide){
				$locationProvider.html5Mode(false).hashPrefix('!');
	}]);

})();