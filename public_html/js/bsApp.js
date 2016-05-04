var app = angular.module("bsApp", ["ngRoute"]);
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
app.controller("mainCtrl", function ($scope, idService) {
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
        persons: [1]
    };
    $scope.productsList = [{
            id: 1,
            name: "Pepsi",
            price: 4.99,
            quantity: 6,
            persons: [1, 2, 3]
        }, {
            id: 2,
            name: "Kukurydza",
            price: 2.49,
            quantity: 2,
            persons: [1]
        }];
    $scope.personsPool = [{
            id: 1,
            name: "Sawik",
            color: Please.make_color()
        }, {
            id: 2,
            name: "Misiek",
            color: Please.make_color()
        }, {
            id: 3,
            name: "Mścich",
            color: Please.make_color()
        }];

    $scope.addPerson = function (person) {
        person.id = idService.getNextPersonId();
        person.color = Please.make_color();
        $scope.personsPool.push(person);
    };
    $scope.editPerson = function (person, index) {
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
    $scope.removePerson = function (index) {
        $scope.personsPool.splice(index, 1);
    };
    $scope.removePersonFromProducts = function (id) {
        for (var idx in $scope.productsList) {
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
        $scope.productsList.push(angular.copy(product));
        $scope.refreshNewProduct();
    };
    $scope.removeProduct = function (index) {
        $scope.productsList.splice(index, 1);
    };

    $scope.toggleAddPersonToProduct = function (id, idPool) {
        for (var p in idPool) {
            if (idPool[p] == id) {
                idPool.splice(p, 1);
                return;
            }
        }
        idPool.push(id);
    };

    $scope.personShortcutColor = function (person, idPool) {
        var result = {};
        for (var p in idPool) {
            if (idPool[p] == person.id) {
                result.background = person.color;
                return result;
            }
        }
        result.background = "#3A3A3A";
        result.color = "grey";
        return result;
    };
    $scope.personShortcutClass = function (person, idPool) {
        for (var p in idPool) {
            if (idPool[p] == person.id) {
                return "participant";
            }
        }
        return "not-participant";
    };

    $scope.refreshNewProduct = function () {
        if (angular.isDefined($scope.newProduct)) {
            var persons = angular.copy($scope.newProduct.persons);
        } else {
            var persons = [];
            for (var i in $scope.personsPool) {
                persons.push($scope.personsPool[i].id);
            }
        }
        $scope.newProduct = {
            name: null,
            quantity: null,
            price: null,
            persons: persons
        };
    };

    $scope.addProductShortcut = function (newProduct, event) {
        if (event.keyCode === 13) {
            $scope.addProduct(newProduct);
        }
    };
});
