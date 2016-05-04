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
        templateUrl: "./views/navBar.html"
    };
});
