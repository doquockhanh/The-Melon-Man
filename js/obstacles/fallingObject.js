function createFallingObject(x) {
    const fallingObject = {
        x,
        _y: null,
        _width: game.options.tileWidth / 2,
        _height: game.options.tileHeight / 2,
        _speed: 3,
        _maxY: 0,
        _update: null,
        _isEnd: false,
        tile:
            { tileColumn: 3, tileRow: 1 },

        startFalling: function () {
            this._y = game.player.highestY - 500;
            this._maxY = this._y + 1000;

            const self = this;
            this._update = setInterval(function () {
                if (self._y > self._maxY) {
                    // reach the highest pos 
                    if (!self._isEnd) {
                        self._isEnd = true
                        self._fallingEnd();
                    }
                } else {
                    self._y += self._speed;
                }

                game.requestRedraw()

                // check collission with player
                if ((self._y >= game.player.y || self._y + self._height >= game.player.y)
                    && (self._y <= game.player.y + game.player.height || self._y + self._width <= game.player.y + game.player.height)
                    && (self.x >= game.player.x || self.x + self._width >= game.player.x)
                    && (self.x <= game.player.x + self._width || self.x + self._width <= game.player.x + self._width)
                ) {
                    if (!self._isEnd) {
                        self._isEnd = true
                        self._fallingEnd();
                        game.isOver = true;
                    }
                }
            }, 20)
        },

        _fallingEnd: function () {
            game.obstacles.fallingObjects = game.obstacles.fallingObjects.filter(objs => !objs._isEnd);
            clearInterval(this._update);
            this._update = null;
        }
    }

    return fallingObject;
}
