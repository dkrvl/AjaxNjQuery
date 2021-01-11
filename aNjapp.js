var testapp = angular.module('anjapp', ['ngRoute', 'ngAnimate']);


testapp.controller("appCtrl", function($scope) {
	$scope.name = "test";
	$scope.src = {
		name: "Adam",
		weather: "sunny"
	}
	$scope.dst = {
		id: '100ck',
		test: "test"
	}
		// angular.copy($scope.dst, $scope.src);
		angular.extend($scope.dst, $scope.src);

	// angular.extend(dst,  src);
	console.log("here");
	console.log($scope.dst);
	console.log($scope.src);
	console.log("here1");
	console.log(angular.isObject($scope.src));
	angular.forEach($scope.src, function(j, i) {
		console.log("{{name: " + i + "}}{{ value :" + j + "}}");
	})



	function printMSG(testOBJ) {
		if (angular.isFunction(testOBJ)) {
			testOBJ();
		} else {
			console.log(testOBJ);
		}
	};

	function v1() {
		console.log("HI THIS IS V1");
	};
	var v2 = "THIS IS V2";
	printMSG(v1);
	printMSG(v2);

});