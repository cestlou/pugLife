app.controller('modalCtrl', ['$scope', '$http', '$modal', '$modalInstance', 'GameBoard', function($scope, $http, $modal, $modalInstance, GameBoard) {
  $scope.level = this.currentLevel;
  $scope.ok = function() {
    $modalInstance.close();
  };

  $scope.continue = function() {
    $modalInstance.close();
  }

}]);