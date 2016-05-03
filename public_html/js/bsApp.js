var app = angular.module("bsApp",["ngRoute"]);
app.config(function ($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "./views/home.html"
	});
	$routeProvider.when("/summary", {
		templateUrl: "./views/summary.html"
	}),
	$routeProvider.otherwise({
		templateUrl: "./views/home.html"
	});
});
app.controller("mainCtrl", function($scope, idService){
	$scope.person = {
		id: 1,
		name: "Humberd",
		color: "#FFAA55"
	};
	$scope.product = {
		id: 1,
		name: "chipsy",
		price: 2.99,
		quantity: 5,
		persons: [1, 2]
	};
	$scope.productsList = [$scope.product];
	$scope.personsPool = [$scope.person];
	
	$scope.addPerson = function(person){
		person.id = idService.getNextPersonId();
		person.color = Please.make_color();
		$scope.personsPool.push(person);
	};
	$scope.editPerson = function(person, index) {
		/*if (angular.isDefined(person.id)) {
			for (var i = 0; i<$scope.personsPool; i++) {
				if ($scope.personsPool[i].id == person.id) {
					$scope.personsPool[i] = person;
					return;
				}
			}
		}
		$scope.addPerson(person);*/
		$scope.personsPool[index] = person;
	};
	$scope.removePerson = function(index){
		$scope.personsPool.splice(index, 1);
	};
	$scope.removePersonFromProducts = function(id) {
		for(var idx in $scope.productsList) {
			var p = $scope.productsList[idx];
			for (var jdx in p.persons) {
				if (p.persons[jdx] == id) {
					p.persons.splice(jdx, 1);
					//break;
				}
			}
		}
	};
	$scope.addProduct = function (product) {
		product.id = idService.getNextProductId();
		$scope.productsList.push(product);
	};
	$scope.removeProduct = function (index) {
		$scope.productsList.splice(index, 1);
	};
	
	$scope.shortPersonStyle = {
		"background": "red",
		"font-size": "15px"
	};
});
