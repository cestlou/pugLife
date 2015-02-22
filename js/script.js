var app = angular.module('GameApp', ['ngRoute','ui.bootstrap']);

app.controller('GameController', ['$scope', '$http', 'GameBoard', '$modal', function($scope, $http, GameBoard, $modal) {

	//////////// Init game ////////////////

	// set player starting score (0)

	var pug = new Character({
		health: 5,
		type: 'player',
		image: '/images/pug.gif'
	});

	///////////////////////////////////////////

	/////// setup game level /////////////////
	var GameBoard = GameBoard;
	GameBoard.new(10,10);
	GameBoard.add(pug,0,0);


	//pre defined board in GameBoard
	var rainCloud = {
		effect: -1,
		type: 'damage',
		image: '/images/raincloud.png',
		behavior:'runToward',
		aiMoveOffset:2
	}

	GameBoard.add(new Character(rainCloud),3,5);
	GameBoard.add(new Character(rainCloud),1,1);
	GameBoard.add(new Character(rainCloud),3,9);
	GameBoard.add(new Character(rainCloud),6,5);
	GameBoard.add(new Character(rainCloud),3,8);
	GameBoard.add(new Character(rainCloud),8,8);
	GameBoard.add(new Character(rainCloud),7,8);

	GameBoard.add(new Character(rainCloud),5,3);



	var food = {
		effect: 1,
		type: 'powerUp',
		image: '/images/bowl.png'
	};
	var aFood = GameBoard.add(new Character(food),5,5);

	var cat = {
		score: 1,
		type: 'win',
		image: '/images/cat4.jpg',
		behavior:'runAway'
	}
	// GameBoard.add(new Character(cat),1,4);
	// GameBoard.add(new Character(cat),2,4);
	GameBoard.add(new Character(cat),8,4);
	// GameBoard.add(new Character(cat),4,8);
	// GameBoard.add(new Character(cat),8,9);
	// GameBoard.add(new Character(cat),8,6);
	// GameBoard.add(new Character(cat),9,1);
	// GameBoard.add(new Character(cat),1,1);
	// GameBoard.add(new Character(cat),2,1);
	// GameBoard.add(new Character(cat),2,1);
	// GameBoard.add(new Character(cat),3,1);
	// GameBoard.add(new Character(cat),4,1);

   	/////////////////////////////////////////



   	////// Bind game objects to scope ///////

	$scope.gameBoard = GameBoard.board
	$scope.pug = pug;
	$scope.score = pug.score;

   	/////////////////////////////////////////


   	/// TESTS remove later ////

	// console.log('pug health',pug.health);
 //   	console.log('pug,pug..return true (no health change)',pug.collide(pug));

 //   	console.log('pug health',pug.health);

 //   	console.log('food,pug..return false (and health + 1)',aFood.collide(pug));
 //   	console.log('pug,food..return true',pug.collide(aFood));

	// console.log('pug health',pug.health);

 //   	console.log('rain,pug..return false (and health - 1)',aRain.collide(pug));
 //   	console.log('pug,rain..return true',pug.collide(aRain));

 //   	console.log('pug health',pug.health);

 //   	console.log('food,rain..return true (no health change)',aFood.collide(aRain));
 //   	console.log('rain,food..return true',aRain.collide(aFood));

 //   	console.log('pug health',pug.health);

	////////////////////////////////////////////


   	/////////// Listen for user input ///////////////
	document.addEventListener('keyup',function(e) {
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
		if (pug.score >= 5) {
			// $scope.win = true;
			console.log('winner');

			// var modalInstance = $modal.open({
			//       templateUrl: '/views/gameOver.html',
			//       controller: 'modalCtrl'
			// });
			// return;
		} else if (pug.health <= 0) {
			// $scope.win = false;
			console.log('loser');

			$modal.open({
			    templateUrl: '/views/gameOver.html',
			    controller: 'modalCtrl',
			    resolve: {
			      	info: function() {
			      		$scope.name = "Luna"
			      	}
				}
			})
			// $modalInstance.close(function() {

			// });
		};




		$scope.$apply();
	});
	/////////////////////////////////////////////////////
}]);