// Functions responsible for drawing on canvas

game.drawTile = function (tileColumn, tileRow, x, y) {
	game.context.drawImage(
		game.textures,
		tileColumn * game.options.tileWidth,
		tileRow * game.options.tileHeight,
		game.options.tileWidth,
		game.options.tileHeight,
		x * game.options.tileWidth - Math.round(game.player.x) + Math.round(game.options.canvasWidth / 2 + game.options.tileWidth / 2),
		y * game.options.tileHeight - Math.round(game.player.y) + Math.round(game.options.canvasHeight / 2 + game.options.tileHeight / 2),
		game.options.tileWidth,
		game.options.tileHeight
	)
}

game.drawStructure = function (name, x, y) {
	var structure = game.structures[name]
	for (var i = 0; i < structure.length; i++) {
		game.drawTile(structure[i].tileColumn, structure[i].tileRow, structure[i].x + x, structure[i].y + y)
	}
}

game.drawPlayer = function () {
	actualPlayerTile = game.player.animations[game.player.direction][game.player.animationFrameNumber % 4]
	game.context.drawImage(
		game.textures,
		actualPlayerTile.tileColumn * game.options.tileWidth,
		actualPlayerTile.tileRow * game.options.tileHeight,
		game.options.tileWidth,
		game.options.tileHeight,
		Math.round(game.options.canvasWidth / 2 - game.options.tileWidth / 2),
		Math.round(game.options.canvasHeight / 2 - game.options.tileHeight / 2),
		game.options.tileWidth,
		game.options.tileHeight
	)
}

game.drawLavar = function () {
	let lavarTile = game.obstacles.lavar.tiles[0];
	game.context.drawImage(
		game.textures,
		lavarTile.tileColumn * game.options.tileWidth,
		lavarTile.tileRow * game.options.tileHeight,
		game.options.canvasWidth,
		game.options.tileHeight,
		0,
		Math.round(game.options.canvasHeight / 2 - game.options.tileHeight / 2) + game.obstacles.lavar._y - game.player.y,
		game.options.canvasWidth * game.options.tileWidth / 3,
		game.options.tileHeight * game.options.tileWidth / 3
	)

	let lavarTile2 = game.obstacles.lavar.tiles[1];
	game.context.drawImage(
		game.textures,
		lavarTile2.tileColumn * game.options.tileWidth,
		lavarTile2.tileRow * game.options.tileHeight,
		game.options.canvasWidth,
		game.options.tileHeight,
		0,
		Math.round(game.options.canvasHeight / 2 - game.options.tileHeight / 2) + game.obstacles.lavar._y - game.player.y + (game.options.tileHeight * game.options.tileWidth / 3),
		game.options.canvasWidth * game.options.tileWidth / 3,
		game.options.tileHeight * game.options.tileWidth / 3
	)

	// Draw warning
	if (game.obstacles.lavar.warning) {
		game.context.font = "10px superscript"
		game.context.textAlign = "center"
		game.context.fillStyle = "black"
		game.context.fillText("JUMPPP!!!!!!!.", game.canvas.width / 2, game.canvas.height / 3)
	}
}

game.drawFallingObject = function () {
	for (let i = 0; i < game.obstacles.fallingObjects.length; i++) {
		let Fo = game.obstacles.fallingObjects[i];
		game.context.drawImage(
			game.textures,
			Fo.tile.tileColumn * game.options.tileWidth,
			Fo.tile.tileRow * game.options.tileHeight,
			game.options.tileWidth,
			game.options.tileHeight,
			Math.round(game.options.canvasWidth / 2 - game.options.tileWidth / 2) - (game.player.x - Fo.x),
			Math.round(game.options.canvasHeight / 2 - game.options.tileHeight / 2) - (game.player.y - Fo._y),
			game.options.tileWidth,
			game.options.tileHeight
		)
	}

	if (game.obstacles.fallingObjects.length > 0) {
		game.context.font = "10px superscript"
		game.context.textAlign = "center"
		game.context.fillStyle = "black"
		game.context.fillText("Watch out!!!!!.", game.canvas.width / 2, game.canvas.height / 4)
	}
}


game.redraw = function () {
	game.drawPending = false

	// Draw the background
	if (game.backgrounds['sky'].loaded) {
		var pattern = game.context.createPattern(game.backgrounds['sky'].image, 'repeat') // Create a pattern with this image, and set it to "repeat".
		game.context.fillStyle = pattern
	} else {
		game.context.fillStyle = "#78c5ff"
	}

	game.context.fillRect(0, 0, game.canvas.width, game.canvas.height)

	if (game.backgrounds['trees'].loaded) {
		game.context.drawImage(game.backgrounds['trees'].image, 0, game.canvas.height / 2 - game.player.y / 10, 332, 180)
		game.context.drawImage(game.backgrounds['trees'].image, 332, game.canvas.height / 2 - game.player.y / 10, 332, 180)
	}

	// List nearest structures
	var structuresToDraw = []
	var drawing_distance = 15
	for (var i = 0; i < game.map.structures.length; i++) {
		if (
			game.map.structures[i].x > (game.player.x / game.options.tileWidth) - drawing_distance
			&& game.map.structures[i].x < (game.player.x / game.options.tileWidth) + drawing_distance
			&& game.map.structures[i].y > (game.player.y / game.options.tileHeight) - drawing_distance
			&& game.map.structures[i].y < (game.player.y / game.options.tileHeight) + drawing_distance
		) {
			structuresToDraw.push(game.map.structures[i])
		}
	}

	// Draw them
	for (var i = 0; i < structuresToDraw.length; i++) {
		game.drawStructure(structuresToDraw[i].name, structuresToDraw[i].x, structuresToDraw[i].y)
	}

	// Draw the player
	game.drawPlayer()

	// Draw the lavar Wave
	if (game.obstacles.lavar) {
		game.drawLavar()
	}

	// Draw the lavar Wave
	if (game.obstacles.fallingObjects.length > 0) {
		game.drawFallingObject()
	}

	game.score = Math.round(-game.player.highestY / (3 * game.options.tileHeight)), game.canvas.width - 50, game.canvas.height - 12;
	game.counter.innerHTML = "A game by Karol Swierczek | Controls: A, D / arrows and SPACE | Points: " + game.score;
}

game.requestRedraw = function () {
	if (!game.drawPending && !game.isOver) {
		game.drawPending = true
		requestAnimationFrame(game.redraw)
	}

	if (game.isOver) {
		let highestScore = game.saveHighestScore();
		clearInterval(this.player.fallInterval)
		game.context.font = "30px superscript"
		game.context.textAlign = "center"
		game.context.fillStyle = "black"
		game.context.fillText("Game over!", game.canvas.width / 2, game.canvas.height / 2)
		game.context.font = "15px Georgia"
		game.context.fillText(`Score: ${game.score} | Highest Score: ${highestScore}`, game.canvas.width / 2, game.canvas.height / 2 + 25)
		game.context.fillText("(Refresh the page to restart)", game.canvas.width / 2, game.canvas.height / 2 + 50)
	}
}

game.saveHighestScore = function () {
	let highScore = localStorage.getItem('highScore');

	if (highScore === null || game.score > highScore) {
		localStorage.setItem('highScore', game.score);
		return game.score;
	}

	return highScore;
}