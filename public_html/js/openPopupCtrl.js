var app = angular.module("bsApp");
app.controller("openPopupCtrl", function ($scope, $uibModalInstance, localStorageService, storageKeyName, hotkeys, $document) {
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

