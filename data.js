class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.crossed = [];
    }
}

class GameData {
    constructor() {
        this.players = [];
        this.curPlayer = 0;
        this.d1 = 0;
        this.d2 = 0;
        this.isRolled = false;
    }

    initGame(playerCount) {
        this.players = [];
        for (let i = 0; i < playerCount; i++) {
            this.players.push(new Player(i, "Игрок " + (i + 1)));
        }
        this.curPlayer = 0;
        this.isRolled = false;
    }

    roll() {
        this.d1 = Math.floor(Math.random() * 6) + 1;
        this.d2 = Math.floor(Math.random() * 6) + 1;
        this.isRolled = true;
    }

    removeSeparate() {
        let p = this.players[this.curPlayer];
        if (!p.crossed.includes(this.d1)) {
            p.crossed.push(this.d1);
        }
        if (this.d1 !== this.d2 && !p.crossed.includes(this.d2)) {
            p.crossed.push(this.d2);
        }
    }

    removeSum() {
        let sum = this.d1 + this.d2;
        let p = this.players[this.curPlayer];
        if (!p.crossed.includes(sum)) {
            p.crossed.push(sum);
        }
    }

    checkWin() {
        return this.players[this.curPlayer].crossed.length === 12;
    }

    nextTurn() {
        this.curPlayer = (this.curPlayer + 1) % this.players.length;
        this.isRolled = false;
    }

    getCurrentPlayer() {
        return this.players[this.curPlayer];
    }
}