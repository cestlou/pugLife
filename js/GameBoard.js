app.factory('GameBoard', [function(){
	console.log('gameboard loading')
	return {
		//init board array
		new: function(w,h) {
			this.board = [];
			this.width=w;
			this.height=h;
			this.NPCs=[];

			for (var x = 0; x < w; x++) {
				this.board.push(new Array(h));
				for (var y = 0; y < h; y++) {
					this.board[x][y]=false;
				}

			}
			console.log('board created',this.board)
		},

		add: function(obj,x,y) {
			if (this.board[x][y]) {
				alert('theres already someone on this square!')
			} else {
				if(obj.type === 'player'){
					this.player = obj;
				}else{
					this.NPCs.push(obj);
				}

				obj.gameBoard = this;
				obj.x=x;
				obj.y=y;
				this.board[x][y] = obj;


			}
			return obj;
		},

		move: function(obj,xDir,yDir) {
			var newX = obj.x + xDir;
			var newY = obj.y + yDir;

			if(newX >= this.width){
				newX=0;
			}else if(newX < 0){
				newX=this.width-1;
			}

			if(newY >= this.height){
				newY=0;
			}else if(newY < 0){
				newY=this.height-1;
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
				console.log('moving',meCanMove,itCanMove,meCanMove != itCanMove)
				if (meCanMove != itCanMove){
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
				obj.x=newX;
				obj.y=newY;
			}

			if(obj.type === 'player'){
				this.doAI();
			}
		},

		remove: function(obj) {
			var self=this;

			self.NPCs.forEach(function(item,idx){
				console.log(item,obj,item==obj);
				if(item==obj){
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
		destroy: function(obj) {
			var self = obj;
			for (var i = 0; i < self.length; i++) {
				self.splice(i,1);
			}

		}
	};
}]);