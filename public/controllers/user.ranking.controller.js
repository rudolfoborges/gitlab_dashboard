(function(){

	angular
		.module('app')
		.controller('UserRankingController', ['$scope', '$http', 'API', UserRankingController]);

	function UserRankingController($scope, $http, API){
		var ctrl = this;

		ctrl.ranking = [];
		ctrl.monthly = [];

		ctrl.init = function(){
			$http.get(API.RANKING).then(function(res){
				ctrl.ranking = res.data;
			});

			$http.get(API.RANKING + '/monthly').then(function(res){
				ctrl.monthly = res.data;
			});
		}

		ctrl.init();

	}

})();