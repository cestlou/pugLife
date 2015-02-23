app.factory('GameBoard', [function() {

	var items = {
		rainCloud : {
			effect: -1,
			type: 'damage',
			image: '/images/raincloud.png',
			behavior:'runToward',
			aiMoveOffset:2
		},
		food : {
			effect: 1,
			type: 'powerUp',
			image: '/images/bowl.png'
		},
		cat : {
			score: 1,
			type: 'win',
			image: '/images/cat4.jpg',
			behavior:'runAway',
			aiMoveOffset:2
		}
	}


	return {
		//init board array
		new: function(w,h) {
			this.board = [];
			this.width = w;
			this.height = h;
			this.NPCs = [];

			for (var x = 0; x < w; x++) {
				this.board.push(new Array(h));
				for (var y = 0; y < h; y++) {
					this.board[x][y] = false;
				}

			}
			console.log('board created',this.board)
		},

		add: function(obj,x,y) {
			if (this.board[x][y]) {
				alert('theres already someone on this square!');
			} else {
				if(obj.type === 'player') {
					this.player = obj;
				} else {
					this.NPCs.push(obj);
				}

				obj.gameBoard = this;
				obj.x = x;
				obj.y = y;
				this.board[x][y] = obj;


			}
			return obj;
		},

		move: function(obj,xDir,yDir) {
			var newX = obj.x + xDir;
			var newY = obj.y + yDir;

			if(newX >= this.width) {
				newX = 0;
			} else if(newX < 0) {
				newX = this.width-1;
			}

			if(newY >= this.height){
				newY = 0;
			} else if(newY < 0) {
				newY = this.height-1;
			}

			// console.log('target square',this.board[newX][newY]);
			if (this.board[newX][newY]) {
				//me is obj
				target = this.board[newX][newY]
				//obj IS the thing trying to move

				meCanMove = obj.collide(target)

				itCanMove = target.collide(obj)

				//if meCanMove == itCanMove then do nothing
				//true,false,true
				console.log('moving', meCanMove, itCanMove, meCanMove != itCanMove)
				if (meCanMove != itCanMove) {
					if (meCanMove) {
						this.remove(this.board[newX][newY]);
						this.board[newX][newY] = obj;
						this.board[obj.x][obj.y] = false;
						obj.x=newX;
						obj.y=newY;
					} else {
						this.remove(obj);
					}
				}

			} else {
				//move me
				this.board[newX][newY] = obj;
				this.board[obj.x][obj.y] = false;
				obj.x = newX;
				obj.y = newY;
			}

			if(obj.type === 'player') {
				this.doAI();
			}
		},

		remove: function(obj) {
			var self = this;

			self.NPCs.forEach(function(item,idx){
				console.log(item,obj,item==obj);
				if(item == obj){
					console.log('removed 1');
					self.NPCs.splice(idx,1);
				}
			});
			self.board[obj.x][obj.y] = false;
		},

		doAI: function() {
			this.NPCs.forEach(function(npc){
				npc.do();
			});
		},

		load:function(level) {

			switch(level) {
				case 1:
					this.new(8,8);

					this.add(new Character(items.rainCloud),3,5);
					this.add(new Character(items.rainCloud),1,1);
					this.add(new Character(items.rainCloud),6,5);
					this.add(new Character(items.rainCloud),5,3);
					this.add(new Character(items.rainCloud),2,3);
					this.add(new Character(items.rainCloud),4,3);


					this.add(new Character(items.food),5,5);


					this.add(new Character(items.cat),5,4);
					this.add(new Character(items.cat),1,4);
					this.add(new Character(items.cat),2,4);
					this.add(new Character(items.cat),2,4);
					this.add(new Character(items.cat),3,4);
					this.add(new Character(items.cat),6,4);

					this.win=3;
					break;
				case 2:
					this.new(10,10);

					this.add(new Character(items.rainCloud),3,5);
					this.add(new Character(items.rainCloud),1,1);
					this.add(new Character(items.rainCloud),3,9);
					this.add(new Character(items.rainCloud),6,5);
					this.add(new Character(items.rainCloud),3,8);
					this.add(new Character(items.rainCloud),8,8);
					this.add(new Character(items.rainCloud),7,8);
					this.add(new Character(items.rainCloud),5,3);


					this.add(new Character(items.food),5,5);

					this.add(new Character(items.cat),8,4);
					this.add(new Character(items.cat),1,4);
					this.add(new Character(items.cat),2,4);
					this.add(new Character(items.cat),3,4);
					this.add(new Character(items.cat),4,4);

					this.win=5

					break;

				default:
					return false;
			}

			return this.board;

		}
	};
}]);