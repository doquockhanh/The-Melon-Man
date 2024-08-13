let lavarWave1 = false
let fallingObject1 = false
let lavarWave2 = false
let fallingObject2 = false

game.startSpawnObstacles = function () {
    setInterval(function () {
        let y = game.player.highestY;
        if (y < -100 && !lavarWave1) {
            game.obstacles.lavar = createLavarWave(0, 100, 1500)
            lavarWave1 = true;
            game.obstacles.lavar.startWave()
        }

        if (y < -2500 && !fallingObject1) {
            fallingObject1 = true;
            spawnFallingObject(15000);
        }

        if (y < -4000 && !lavarWave2) {
            game.obstacles.lavar = createLavarWave(game.player.y + 200, 100, 1500)
            lavarWave2 = true;
            game.obstacles.lavar.startWave()
        }
        if (y < -6500 && !fallingObject2) {
            fallingObject2 = true;
            spawnFallingObject(15000);
        }
    }, 1000)
}

game.createDelay = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function spawnFallingObject(duration) {
    while (duration > 0) {
        let FO = createFallingObject(Math.random() * game.options.canvasWidth)
        game.obstacles.fallingObjects.push(FO);
        FO.startFalling()

        let delay = Math.random() + 0.1 * 3000
        duration -= delay;
        await game.createDelay(delay);
    }
}