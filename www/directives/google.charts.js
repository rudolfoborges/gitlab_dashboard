(function(){

	angular
		.module('gitdash')
		.directive('goChart', charBarDirective);

	function charBarDirective(){

		return {
			restrict: 'A',
			link: function($scope, $elem, $attrs){

				$scope.$watch($attrs.goChartModel, function(model){
					if(model) {
						var data = google.visualization.arrayToDataTable(model.getData());
						var chart;

						if(google.visualization[model.getChartType()]){
							chart = new google.visualization[model.getChartType()]($elem[0]);
						} else {
							chart = new google.charts[model.getChartType()]($elem[0]);
						}

						if(chart){
							chart.draw(data, model.getOptions());
						}
					}
				});


			}
  		}
  	}

	google.setOnLoadCallback(function() {
	    angular.bootstrap(document.body, ['app']);
	});
	google.load("visualization", "1.1", {packages:['bar', 'calendar']});

})();

function Chart(chartType){
	var data = [];
	var options = {};

	var clazz = {
		setData: function(_data){
			data = _data;
		},
		setOptions: function(_options){
			options = _options;
		},
		getData: function(){
			return data;
		},
		getOptions: function(){
			return options;
		},
		getChartType: function(){
			return chartType;
		}
	};

	return clazz;
}
