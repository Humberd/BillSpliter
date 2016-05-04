var app = angular.module("bsApp", ["ngRoute", "ngCookies"]);
app.config(function ($routeProvider, $cookiesProvider) {
    $routeProvider.when("/", {
        templateUrl: "./views/home.html"
    });
    $routeProvider.when("/summary", {
        templateUrl: "./views/summary.html"
    });
    $routeProvider.otherwise({
        templateUrl: "./views/home.html"
    });
});
app.controller("mainCtrl", function ($scope, idService, $cookies) {
    console.log($cookies);
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
//    $scope.productsList = [{
//            id: idService.getNextProductId(),
//            name: "Pepsi",
//            price: 4.99,
//            quantity: 6,
//            persons: [1, 2, 3]
//        }, {
//            id: idService.getNextProductId(),
//            name: "Kukurydza",
//            price: 2.49,
//            quantity: 2,
//            persons: [1]
//        }];
    $scope.productsList = [];
//    $scope.personsPool = [{
//            id: idService.getNextPersonId(),
//            name: "Sawik",
//            color: Please.make_color()
//        }, {
//            id: idService.getNextPersonId(),
//            name: "Misiek",
//            color: Please.make_color()
//        }, {
//            id: idService.getNextPersonId(),
//            name: "Mścich",
//            color: Please.make_color()
//        }];
    $scope.personsPool = [];
///////////////
    $scope.addPerson = function (person) {
        if (angular.isDefined(person) && angular.isString(person.name)) {
            person.id = idService.getNextPersonId();
            person.color = Please.make_color();
            $scope.personsPool.push(person);
            $scope.refreshNewPerson();
        }
    };
    $scope.removePerson = function (id) {
        for (var p in $scope.personsPool) {
            if ($scope.personsPool[p].id == id) {
                $scope.removePersonFromProducts(id);
                $scope.personsPool.splice(p, 1);
                return;
            }
        }
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
        try {
            product.quantity = $scope.validateNumber(product.quantity);
            product.price = $scope.validateNumber(product.price);
            product.name = $scope.validateString(product.name);
            product.id = idService.getNextProductId();
            $scope.productsList.push(angular.copy(product));
            $scope.refreshNewProduct();
        } catch (err) {
            console.log(err);
        }

    };
    $scope.removeProduct = function (index) {
        $scope.productsList.splice(index, 1);
    };
//////////////////////////
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
/////////////////////////////
    $scope.refreshNewProduct = function () {
        if (angular.isDefined($scope.newProduct)) {
            var persons = $scope.newProduct.persons.filter(function (person) {
                return $scope.personsPool.some(function (poolPerson) {
                    return poolPerson.id === person.id;
                });
            });
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

    $scope.refreshNewPerson = function () {
        $scope.newPerson = {
            name: null
        };
    };

    $scope.refreshPersonColor = function (id) {
        for (var p in $scope.personsPool) {
            if ($scope.personsPool[p].id == id) {
                $scope.personsPool[p].color = Please.make_color();
                return;
            }
        }
    };
///////////////////////
    $scope.addProductShortcutKey = function (newProduct, event) {
        if (event.keyCode === 13) {
            $scope.addProduct(newProduct);
        }
    };

    $scope.addPersonShortcutKey = function (newPerson, event) {
        if (event.keyCode === 13) {
            $scope.addPerson(newPerson);
        }
    };
//////////////////
    $scope.validateNumber = function (value) {
        if (angular.isNumber(value)) {
            return value;
        }
        if (angular.isString(value)) {
            value = value.replace(",", ".");
            value = parseFloat(value, 10);
//            console.log(value);
            if (isNaN(value)) {
                throw "not a number";
            } else {
                return value;
            }
        }
        throw "not a number";
    };

    $scope.validateString = function (string) {
        if (angular.isString(string)) {
            return string;
        } else {
            throw "not a string";
        }
    };
/////////////
    $scope.summary = function () {
        var persons = $scope.personsPool;
        for (var p in persons) {
            persons[p].contribution = 0;
        }

        var products = $scope.productsList;

        for (var p in products) {
            var list = products[p].persons;
            var totalProductPrice = products[p].price * products[p].quantity;
            var partialContribution = totalProductPrice / list.length;
            for (var l in list) {
                for (q in persons) {
                    if (persons[q].id == list[l]) {
                        persons[q].contribution += partialContribution;
                        break;
                    }
                }
            }
        }
    };
//////////////
    $scope.clear = function () {
        $scope.personsPool = [];
        $scope.productsList = [];
    };

    $scope.toggleDebugMode = function () {
        $scope.debugMode = !$scope.debugMode;
    };
});
