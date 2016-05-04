var app = angular.module("bsApp");
app.service("idService", function () {
    var nextPersonId = 1;
    var nextProductId = 1;
    return {
        getNextPersonId: function () {
            return nextPersonId++;
        },
        getNextProductId: function () {
            return nextProductId++;
        }
    };
});
