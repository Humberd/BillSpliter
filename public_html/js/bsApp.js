var app = angular.module("bsApp", ["ngRoute", "ngCookies", "LocalStorageModule", "ui.bootstrap", "cfp.hotkeys", "yaru22.angular-timeago"]);
app.config(function ($routeProvider, localStorageServiceProvider) {
    $routeProvider.when("/", {
        templateUrl: "./views/home.html"
    });
    $routeProvider.when("/summary", {
        templateUrl: "./views/summary.html"
    });
    $routeProvider.otherwise({
        templateUrl: "./views/home.html"
    });
    localStorageServiceProvider
            .setPrefix("bsApp")
            .setNotify(true, true);
});
app.run(function (localStorageService, storageKeyName) {
    if (!angular.isArray(localStorageService.get(storageKeyName))) {
        localStorageService.set(storageKeyName, []);
    }
});
app.constant("storageKeyName", "bills");
app.controller("mainCtrl", function ($rootScope, $scope, idService, localStorageService, storageKeyName, $uibModal, hotkeys, $location) {
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
//    $rootScope.$on("LocalStorageModule.notification.setitem", function (oldVal, newVal) {
//        console.log("new");
//    });
//    var foo = localStorageService.set("key", [{ok: "true", k: false, dupa: {}}]);
//    console.log(foo);
/////////////////////////
    function defaultData() {
        $scope.data = {
            id: idService.getNextDataId(),
            title: "defaultTitle",
            createDate: new Date(),
            editDate: new Date(),
            productsList: [],
            personsPool: []
        };
    }
    defaultData();
    $scope.data.productsList = [{
            id: idService.getNextProductId(),
            name: "Pepsi",
            price: 4000.99,
            quantity: 6,
            persons: [1, 2, 3]
        }, {
            id: idService.getNextProductId(),
            name: "Kukurydza",
            price: 2.49,
            quantity: 2,
            persons: [1]
        }];
    $scope.data.personsPool = [{
            id: idService.getNextPersonId(),
            name: "Sawik",
            color: Please.make_color()
        }, {
            id: idService.getNextPersonId(),
            name: "Misiek",
            color: Please.make_color()
        }, {
            id: idService.getNextPersonId(),
            name: "Mścich",
            color: Please.make_color()
        }];
//    $scope.debugMode = true;
///////////////
    $scope.addPerson = function (person) {
        if (angular.isDefined(person) && angular.isString(person.name)) {
            person.id = idService.getNextPersonId();
            person.color = Please.make_color();
            $scope.data.personsPool.push(person);
            $scope.refreshNewPerson();
        }
    };
    $scope.removePerson = function (id) {
        for (var p in $scope.data.personsPool) {
            if ($scope.data.personsPool[p].id == id) {
                $scope.removePersonFromProducts(id);
                $scope.data.personsPool.splice(p, 1);
                return;
            }
        }
    };
    $scope.removePersonFromProducts = function (id) {
        for (var idx in $scope.data.productsList) {
            var p = $scope.data.productsList[idx];
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
            $scope.data.productsList.push(angular.copy(product));
            $scope.refreshNewProduct();
        } catch (err) {
            console.log(err);
        }

    };
    $scope.removeProduct = function (index) {
        $scope.data.productsList.splice(index, 1);
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
                return $scope.data.personsPool.some(function (poolPerson) {
                    return poolPerson.id === person.id;
                });
            });
        } else {
            var persons = [];
            for (var i in $scope.data.personsPool) {
                persons.push($scope.data.personsPool[i].id);
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
        for (var p in $scope.data.personsPool) {
            if ($scope.data.personsPool[p].id == id) {
                $scope.data.personsPool[p].color = Please.make_color();
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
        var persons = $scope.data.personsPool;
        for (var p in persons) {
            persons[p].contribution = 0;
        }

        var products = $scope.data.productsList;

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
///////////////////////////////////
    $scope.newBill = function () {
        defaultData();
    };

    $scope.clear = function () {
        $scope.data.productsList = [];
        $scope.data.personsPool = [];
    };

    $scope.toggleDebugMode = function () {
        $scope.debugMode = !$scope.debugMode;
    };

    $scope.save = function () {
        $scope.data.editDate = new Date();
        var bills = localStorageService.get(storageKeyName);
        for (var b in bills) {
            if (bills[b].id == $scope.data.id) {
                bills.splice(b, 1, $scope.data);
                localStorageService.set(storageKeyName, bills);
                return;
            }
        }
        bills.push($scope.data);
        localStorageService.set(storageKeyName, bills);
    };

    $scope.open = function () {
        var windowPromise = $uibModal.open({
            templateUrl: "./views/openPopup.html",
            controller: "openPopupCtrl"
        });
        windowPromise.result.then(function (result) {
            $scope.data = result;
            $location.path("/home");
        });
    };
    $scope.open();
////////////////HOTKEYS////////////////
    function addHotkey(combo, description, callback) {
        hotkeys.bindTo($scope).add({
            combo: combo,
            description: description,
            callback: function (event, hotkey) {
                event.preventDefault();
                event.stopPropagation();
                callback();
            }
        });
    }
    addHotkey("ctrl+o","Open saved bills", $scope.open);
    addHotkey("ctrl+s","Save bill", $scope.save);
    addHotkey("ctrl+m","New bill", $scope.newBill);
    addHotkey("ctrl+d","Debug mode", $scope.toggleDebugMode);
    addHotkey("ctrl+k","Clear current bill (same bill, but empty)", $scope.clear);
//////////////////////////////////////
});
