(function(){

	angular
		.module('app')
		.controller('ChartController', ['$scope', ChartController])
		.directive('chart', charBarDirective);


	function charBarDirective(){

		return {
			restrict: 'A',
			//controller: 'ChartController',
			link: function($scope, $elem, $attr){
  				var data = google.visualization.arrayToDataTable([
		        	["Element", "Density", { role: "style" } ],
		        	["Copper", 8.94, "#b87333"],
		        	["Silver", 10.49, "silver"],
		        	["Gold", 19.30, "gold"],
		        	["Platinum", 21.45, "color: #e5e4e2"]
		      	]);
				var chart = new google.visualization.BarChart($elem[0]);
				chart.draw(data, {});
			}
  		}
  	}

	function ChartController($scope){

	}

	google.setOnLoadCallback(function() {  
	    angular.bootstrap(document.body, ['app']);
	});
	google.load('visualization', '1', {packages: ['corechart']});

})();

function Chart(){
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
		}
	};

	return clazz;
}