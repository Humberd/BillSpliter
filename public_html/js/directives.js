var app = angular.module("bsApp");
app.directive('numberToString', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {
                return value ? value + "" : "";
            });
            ngModel.$formatters.push(function (value) {
                console.log(value);
                return parseFloat(value, 10);
            });
        }
    };
});
