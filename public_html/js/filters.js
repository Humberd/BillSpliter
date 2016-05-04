var app = angular.module("bsApp");
app.filter("personShortcut", function () {
    return function (name, lettersNumber) {
        var result = name[0].toUpperCase();
        result += name[1].toLowerCase();
        return result;
    };
});
