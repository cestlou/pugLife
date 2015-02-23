var app = angular.module('GameApp', ['ngRoute','ui.bootstrap']);

app.controller('GameController', ['$scope', '$http', 'GameBoard', '$modal', function($scope, $http, GameBoard, $modal) {

	var gameover, pug, currentLevel;

   	var resetGame = function() {

		$scope.$evalAsync(function() {

	   		gameover=false;

			pug = new Character({
				health: 5,
				type: 'player',
				image: '/images/pug.gif'
			});
			$scope.pug = pug;
			$scope.score = pug.score;
			$scope.points = pug.points;

			currentLevel=1;
			loadLevel();
		});
   	}

   	var loadLevel = function() {
		var result = GameBoard.load(currentLevel);
		if(result){
			pug.score = 0;
			$scope.gameBoard = result;
			GameBoard.add(pug,0,0);
		}else{
			alert('No more levels. YOU WON!!! ');
		}

   	}

   	resetGame();

   	/////////// Listen for user input ///////////////
	document.addEventListener('keyup',function(e) {

		if(gameover) return;

		console.log('keyup');
		switch(e.which) {
			case 37:
				pug.move(0,-1);
				break;
			case 38:
				pug.move(-1,0);
				break;
			case 39:
				pug.move(0,1);
				break;
			case 40:
				pug.move(1,0);
				break;
		};



		// check for win / loss
		if (pug.score >= GameBoard.win) {
			//pre modal
			gameover=true;

			$modal.open({
				templateUrl: '/views/gameWin.html',
				controller: 'modalCtrl',
				info: function() {

				}
			}).result.then(function () {
				//$modalinstance.close()

			});

			currentLevel+=1;
			loadLevel();

			gameover=false;

			console.log('winner');
			//post modal
		} else if (pug.health <= 0) {
			gameover = true;
			console.log('loser');

			$modal.open({
			    templateUrl: '/views/gameLose.html',
			    controller: 'modalCtrl',
			    resolve: {
			      	info: function() {
			      		// $scope.level = currentLevel;
			      	}
				}
			}).result.then(function () {
				//$modalinstance.close()
				resetGame();
			}, function () {
			  	resetGame();
			});

		};

		$scope.$apply();
	});
	/////////////////////////////////////////////////////
}]);