var app = angular.module("bsApp");
app.service("idService", function () {
    var nextPersonId = 1;
    var nextProductId = 1;
    var nextDataId = 1;
    var nextAlertId = 1;
    return {
        getNextPersonId: function () {
            return nextPersonId++;
        },
        getNextProductId: function () {
            return nextProductId++;
        },
        getNextDataId: function () {
            return nextDataId++;
        },
        getNextAlertId: function () {
            return nextAlertId++;
        },
        setNextPersonId: function (id) {
            if (angular.isNumber(id)) {
                nextPersonId = id;
            }
        },
        setNextProductId: function (id) {
            if (angular.isNumber(id)) {
                nextProductId = id;
            }
        },
        setNextDataId: function (id) {
            if (angular.isNumber(id)) {
                nextDataId = id;
            }
        },
        setNextAlertId: function (id) {
            if (angular.isNumber(id)) {
                nextAlertId = id;
            }
        }
    };
});
