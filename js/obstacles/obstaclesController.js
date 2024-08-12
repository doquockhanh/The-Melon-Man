var lavarWave1 = false

function checkToSpawnObstacles(y) {
    if (y < -100 && !lavarWave1) {
        game.obstacles.lavar = createLavarWave(0, 50, 1500)
        lavarWave1 = true;
        game.obstacles.lavar.startWave()
    }
}