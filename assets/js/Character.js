function Character(options) {
	this.effect = 0;
	this.score = 0;
	this.points = 0;
	this.health = 0;
	this.image = "none.jpg";
	this.type = 'none';
	this.behavior = '';
	this.aiMoveOffset = 1;
	this.playerMoveCount = 0;
	this.startTime = Date.now();


	this.do = function() {
		//player has no AI
		if (this.behavior === '') {
			return true;
		};

		this.playerMoveCount += 1;
		if(this.playerMoveCount < this.aiMoveOffset) return;
		this.playerMoveCount = 0;

		// console.log('I am a '+this.type+' and i do stuff now in relation to',this.gameBoard.player);

		var theirX = this.gameBoard.player.x
		var theirY = this.gameBoard.player.y
		var myX = this.x;
		var myY = this.y;
		var xDistance = myX - theirX;
		var yDistance = myY - theirY;
		var absX = Math.abs(xDistance);
		var absY = Math.abs(yDistance);

		switch(this.behavior) {
			case 'runToward':
				//figure out: should we move on the X or Y axis?
				if (absX > absY) {
					//move on X axis
					if(xDistance > 0) {
						this.move(-1,0);
					} else {
						this.move(1,0);
					}
				} else {
					//move on Y axis
					if(yDistance > 0) {
						this.move(0,-1);
					} else {
						this.move(0,1);
					}
				}
			break;
			case 'runAway':
				// figure out: should we move on the X or Y axis?
				if (absX <= absY) {
					//move on X axis
					if(xDistance <= 0) {
						this.move(-1,0);
					} else {
						this.move(1,0);
					}
				} else {
					//move on Y axis
					if(yDistance <= 0) {
						this.move(0,-1);
					} else {
						this.move(0,1);
					}
				}
			break;
		};


	}

	this.collide = function(who) {
		// this is me ... 'who' is who I collided with

		// if this.type === 'player' return true  (true means CAN move)
		if (this.type === 'player') {
			return true;
		}

		// if who.type == 'player'
			// do something to who
			// who.health += this.effect
			// return false
		// else
			// return true

		if (who.type == 'player') {
			//do something to who
			var now = Date.now();
			who.health += this.effect;
			who.score += this.score;
			who.points += Math.ceil(1000 / ((now - who.startTime)/1000));

			return false;
		} else {
			return true;
		};
	}

	this.move = function(xDir,yDir) {
		this.gameBoard.move(this,xDir,yDir);
	}


	for (key in options) {
		this[key] = options[key];
	}
}

