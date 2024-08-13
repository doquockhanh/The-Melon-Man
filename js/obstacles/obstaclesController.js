let lavarWave1 = false
let fallingObject1 = false

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
    })

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