var app = angular.module("bsApp");
app.filter("personShortcut", function () {
    return function (name, lettersNumber) {
        var result = "";
        if (lettersNumber > 0) {
            result += name[0].toUpperCase();
        }
        for (var i = 1; i < lettersNumber; i++) {
            if (name[i]) {
                result += name[i].toLowerCase();
            }
        }
        return result;
    };
});
