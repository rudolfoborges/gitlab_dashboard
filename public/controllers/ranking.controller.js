(function(){

	angular
		.module('app')
		.controller('RankingController', ['$scope', '$http', 'API', RankingController]);

	function RankingController($scope, $http, API){
		var ctrl = this;
		ctrl.ranking = [];

		ctrl.init = function(){
			$http.get(API.RANKING).then(function(res){
				ctrl.ranking = res.data;
			});
		}

		ctrl.init();

	}

})();