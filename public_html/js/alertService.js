var app = angular.module("bsApp");
app.service("alertService", function (idService) {
    var alertsQueue = [];
    var defaultTimeout = 2000;
    return {
        add: function (type, message, timeout) {
            var alert = {
                id: idService.getNextAlertId(),
                type: type,
                message: message,
                timeout: angular.isNumber(timeout) ? timeout : defaultTimeout
            };
            alertsQueue.push(alert);
        },
        remove: function (id) {
            for (var p in alertsQueue) {
                if (alertsQueue[p].id == id) {
                    alertsQueue.splice(p, 1);
                    return;
                }
            }
        },
        success: function (message, timeout) {
            this.add("success", message, timeout);
        },
        info: function (message, timeout) {
            this.add("info", message, timeout);
        },
        warning: function (message, timeout) {
            this.add("warning", message, timeout);
        },
        danger: function (message, timeout) {
            this.add("danger", message, timeout);
        },
        getAlerts: function () {
            return alertsQueue;
        }
    };
});
