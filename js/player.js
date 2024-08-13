game.player = {
		x: 54,
		y: 0,
		height: 24,
		highestY: 0,
		direction: "left",
		isInAir: false,
		startedJump: false,
		moveInterval: null,
		jumpCount: 0,
		maxJumpCount: 2,
		fallID: null,
		fallTimeout: function(startingY, time, maxHeight) {
			this.fallID = setTimeout( function () {
				if (this.isInAir) {
					this.y = startingY - maxHeight + Math.pow((-time / 3 + 11), 2)
					if (this.y < this.highestY) {
						this.highestY = this.y
					}
					if (time > 37) {
						this.startedJump = false
						game.checkCollisions()
					}
					if (time < 150) {
						time++
						this.fallTimeout(startingY, time, maxHeight)
					} else {
						game.isOver = true
					}
					if (this.y > 40) {
						game.isOver = true
					}
					game.requestRedraw()
				}
			}.bind(this, startingY, time, maxHeight), 12)
		},
		animationFrameNumber: 0,
		collidesWithGround: true,
		animations: {
			// Describe coordinates of consecutive animation frames of objects in textures
			left: [{tileColumn: 4, tileRow: 0}, {tileColumn: 5, tileRow: 0}, {tileColumn: 4, tileRow: 0}, {tileColumn: 6, tileRow: 0}],
			right: [{tileColumn: 9, tileRow: 0}, {tileColumn: 8, tileRow: 0}, {tileColumn: 9, tileRow: 0}, {tileColumn: 7, tileRow: 0}]
		},
		jump: function () {
			// cannot jump when reach maxJumpCount
			if (this.jumpCount >= this.maxJumpCount) return;

			this.jumpCount++
			clearTimeout(this.fallID);
			var startingY = this.y
			this.isInAir = true
			this.startedJump = true
			game.sounds.jump.play()
			var time = 1
			maxHeight = 121
			this.fallTimeout(startingY, time, maxHeight)
		},
		fall: function () {
			if(this.isInAir) return;

			var startingY = this.y
			this.isInAir = true
			this.startedJump = true
			time = 30
			maxHeight = 0
			this.fallTimeout(startingY, time, maxHeight)
		}
	}
