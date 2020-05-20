$(function () {

    document.addEventListener("keydown", function (event) {
        game.redirectFurry(event)
    });
    let interval;

    class Fury {
        constructor(x, y, direction) {
            this.x = 0;
            this.y = 0;
            this.direction = 'right';
        }

    }

    class Coin {
        constructor(x, y) {
            this.x = Math.floor(Math.random() * 10);
            this.y = Math.floor(Math.random() * 10);
        }
    }

    class Game {
        constructor(furry, coin, board, score,) {
            this.furry = new Fury();
            this.coin = new Coin();
            this.board = document.querySelector('#board').querySelectorAll('div');
            this.score = 0;
            this.index = function (x, y) {
                return x + (y * 10);
            };
        }


        startGame() {

            interval = setInterval(function () {
                game.showFurry()
            }, 170);

        }

        showFurry() {
            this.hideFurry();
            this.moveFurry();
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');


        }

        hideFurry() {
            for (let i = 0; i < this.board.length; i++) {
                this.board[i].classList.remove('furry');
            }
        }

        showCoin() {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        }

        moveFurry() {
            if (this.furry.direction === "right") {
                this.furry.x = this.furry.x + 1;
            } else if (this.furry.direction === "left") {
                this.furry.x = this.furry.x - 1;
            } else if (this.furry.direction === "down") {
                this.furry.y = this.furry.y + 1;
            } else if (this.furry.direction === "up") {
                this.furry.y = this.furry.y - 1;
            }
            this.gameOver();
            this.showCoin();
            this.CoinCollision();

        }

        redirectFurry(event) {
            switch (event.which) {
                case 37:
                    this.furry.direction = 'left';
                    break;
                case 38:
                    this.furry.direction = 'up';
                    break;
                case 39:
                    this.furry.direction = 'right';
                    break;
                case 40:
                    this.furry.direction = 'down';
                    break;
            }

        }

        CoinCollision() {
            if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
                this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
                this.score++;
                document.querySelector('#score strong').innerHTML = this.score;
                this.coin = new Coin();
                game.showCoin();

            }
        }



        gameOver() {
            if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
                this.hideFurry();

                function stopGame() {
                    clearInterval(interval);
                    $('#board').fadeOut(1000);
                    $('#score').fadeOut(1000);
                    $('.invisible').css('display', 'block');
                    let pre = $('<pre>');
                    $('#score').clone().appendTo(pre);
                    $('#over').append(pre);
                }
                stopGame();
            }
        }
        
    }
    const game = new Game();
    game.startGame();

    $('#btn').click(() => {
        this.location.reload();
        
    })
});
