var app = angular.module("bsApp");
//app.directive('numberToString', function () {
//    return {
//        require: 'ngModel',
//        link: function (scope, element, attrs, ngModel) {
//            ngModel.$parsers.push(function (value) {
//                return value ? value + "" : "";
//            });
//            ngModel.$formatters.push(function (value) {
//                return parseFloat(value, 10);
//            });
//        }
//    };
//});
app.directive("navBar", function () {
    return {
        restrict: "EA",
        templateUrl: "./views/navBar.html",
        controller: function ($scope, alertService) {
            var types = ["success", "info", "warning", "danger"];
            $scope.addAlert = function () {
                alertService[types[Math.floor(Math.random() * types.length)]]("test");
            };
        }
    };
});
app.directive("alerts", function () {
    return {
        restruct: "EA",
        templateUrl: "./views/alerts.html",
        scope: {
        },
        controller: function ($scope, alertService) {
            $scope.alerts = alertService.getAlerts();

            $scope.close = function (id) {
                alertService.remove(id);
            };
        }
    };
});
app.directive("ngConfirmClick", function () {
    return {
        restrict: "A",
        templateUlr: "/views/confirmPopup.html",
        scope: {
            callback: "&ngConfirmClick",
            message: "@"
        },
        controller: function ($scope, $element, $uibModal) {
            $element.on("click", function () {
                var windowPromise = $uibModal.open({
                    templateUrl: "./views/confirmPopup.html",
                    controller: "confirmPopupCtrl",
                    backdrop: true,
                    size: "sm",
                    resolve: {
                        message: function () {
                            if (angular.isString($scope.message) && $scope.message.length > 0) {
                                return $scope.message;
                            }
                            return "Do you want to save?";
                        }
                    }
                });
                windowPromise.result.then(function (result) {
                    $scope.callback();
                });
            });
        }
    };
});
