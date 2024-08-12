function createLavarWave(y, speed, height) {
    const lavar = {
        _y: y,
        _speed: speed,
        _maxY: 0,
        _update: null,
        _isEnd: false,
        tiles: [
            {tileColumn: 6, tileRow: 1}, 
            {tileColumn: 0, tileRow: 4}
        ],

        startWave: function() {
            this._maxY = this._y - height;
            const self = this;
            this._update = setInterval(function () {
                console.log(`${self._y} ${self._maxY}`)
                if (self._y < self._maxY) {
                    // reach the highest of wave
                    // falling down
                    self._speed = -self._speed;
                    self._y -= self._speed;
                    if(!self._isEnd) {
                        self._waveEnd();
                    }
                    self._isEnd = true
                } else {
                    self._y -= self._speed;
                }
               
                game.requestRedraw()

                // check collission with player
                if(self._y < game.player.y - 100) {
                    if(!self._isEnd) {
                        self._waveEnd();
                    }
                    self._isEnd = true
                    game.isOver = true;
                }
            }, 1000)
        },

        _waveEnd: function() {
            const self = this;
            setTimeout(function() {
                game.obstacles.lavar = null;
                clearInterval(self._update);
                self._update = null;
            }, 5000);
        }
    }

    return lavar;
}
