class GameLogic {
    constructor(data, ui) {
        this.data = data;
        this.ui = ui;
        this.exposeToWindow();
        this.ui.showSetup();
    }

    startGame() {
        let input = document.getElementById('playerCount');
        let val = parseInt(input.value);
        
        if (isNaN(val) || val < 2) val = 2;
        if (val > 5) val = 5;
        
        input.value = val;
        
        this.data.initGame(val);
        this.ui.showGame();
        this.ui.draw(this.data);
    }

    rollDice() {
        this.data.roll();
        this.ui.draw(this.data);
    }

    chooseSeparate() {
        this.data.removeSeparate();
        this.handleTurnEnd();
    }

    chooseSum() {
        this.data.removeSum();
        this.handleTurnEnd();
    }

    skipTurn() {
        this.handleTurnEnd();
    }

    handleTurnEnd() {
        if (this.data.checkWin()) {
            this.ui.showWin(this.data.getCurrentPlayer().name);
            return;
        }
        
        this.data.nextTurn();
        this.ui.draw(this.data);
    }

    showSetup() {
        this.ui.showSetup();
    }

    exposeToWindow() {
        window.startGame = () => this.startGame();
        window.rollDice = () => this.rollDice();
        window.chooseSeparate = () => this.chooseSeparate();
        window.chooseSum = () => this.chooseSum();
        window.skipTurn = () => this.skipTurn();
        window.showSetup = () => this.showSetup();
    }
}

const gameData = new GameData();
const gameUI = new GameUI();
const app = new GameLogic(gameData, gameUI);