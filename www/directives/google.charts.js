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
	this._data = [];
	this._options = {};
	this._chartType = chartType;

	this.setData = function(data){
			this._data = data;
	}

	this.setOptions = function(options){
			this.options = options;
	}

	this.getData = function(){
			return this._data;
	}

	this.getOptions = function(){
			return this._options;
	}

	this.getChartType = function(){
			return this._chartType;
	}
}
