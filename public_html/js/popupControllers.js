var app = angular.module("bsApp");
app.controller("openPopupCtrl", function ($scope, $uibModalInstance, localStorageService, storageKeyName, hotkeys, $document, alertService) {
    $scope.billsList = localStorageService.get(storageKeyName);
    $scope.selected = {
        bill: null
    };
    $scope.open = function () {
        if ($scope.selected.bill) {
            $uibModalInstance.close($scope.selected.bill);
            return;
        }
//        $scope.cancel();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
    $scope.select = function (bill) {
        $scope.selected.bill = bill;
    };

    $scope.removeFromLocalStorage = function (id) {
        console.log("dupa");
        if (angular.isNumber(id)) {
            for (var b in $scope.billsList) {
                if ($scope.billsList[b].id == id) {
                    var title = $scope.billsList[b].title;
                    $scope.billsList.splice(b, 1);
                    localStorageService.set(storageKeyName, $scope.billsList);
                    alertService.info("Successfully removed: " + title, 5000);
                    return;
                }
            }
            alertService.warning("Cannot find a bill to remove", 10000);
        }
    };
    function onKeydown(evt) {
        if (evt.which === 13) {
            evt.preventDefault();
            $scope.$apply(function () {
                $scope.open();
            });
        }
    }

    $document.on('keydown', onKeydown);
    $scope.$on('$destroy', function () {
        $document.off('keydown', onKeydown);
    });
});
app.controller("confirmPopupCtrl", function ($scope, $uibModalInstance, message) {
    $scope.message = message;
    $scope.confirm = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
});

