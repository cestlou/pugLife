// app.controller('ModalDemoCtrl', function ($scope, $modal, $log) {


//   $scope.open = function (size) {

//     var modalInstance = $modal.open({
//       templateUrl: 'views/gameOver.html',
//       controller: 'ModalInstanceCtrl'
//     });

//     modalInstance.result.then(function (selectedItem) {

//     }, function () {
//       $log.info('Modal dismissed at: ' + new Date());
//     });
//   };
// });

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.


// app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
// 	$scope.ok = function () {
// 	  $modalInstance.close();
// 	};

// 	$scope.cancel = function () {
// 	  $modalInstance.dismiss('cancel');
// 	};
// }])
//////////////////////////////////// end first try /////////////////////////////////////////////


///////////////////////////////////////// from Bloggy //////////////////////////////////////////
app.controller('modalCtrl', ['$scope', '$http', '$modal', '$modalInstance', 'GameBoard', function($scope, $http, $modal, $modalInstance, GameBoard) {
  $scope.name = "Luna";

  // $scope.open = function() {

    // var postData = {
    //   title: $scope.title,
    //   body: $scope.body
    // }

  //   $http.put('/api/post/' + post.id,postData)
  //   .success(function(data) {
  //     AlertService.add('success', 'The Post Has Been Updated');
  //     $modalInstance.close(data);
  //   }).error(function(err) {
  //     alert(err);
  //   })


  // }

  $scope.ok = function() {
    GameBoard.destroy(this);
    GameBoard.new(10,10);
    $modalInstance.close();
  };



}]);