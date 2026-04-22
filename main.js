class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }
}

let players = [];
let curPlayer = 0;
let d1 = 0;
let d2 = 0;
let isRolled = false;

const init = () => {
    players = [new Player(0, "Игрок 1"), new Player(1, "Игрок 2")];
    curPlayer = 0;
    isRolled = false;
    draw();
};

window.rollDice = () => {
    d1 = Math.floor(Math.random() * 6) + 1;
    d2 = Math.floor(Math.random() * 6) + 1;
    isRolled = true;
    draw();
};

window.chooseSeparate = () => {
    players[curPlayer].numbers = players[curPlayer].numbers.filter(n => n !== d1 && n !== d2);
    nextTurn();
};

window.chooseSum = () => {
    let sum = d1 + d2;
    players[curPlayer].numbers = players[curPlayer].numbers.filter(n => n !== sum);
    nextTurn();
};

window.skipTurn = () => {
    nextTurn();
};

const nextTurn = () => {
    if (players[curPlayer].numbers.length === 0) {
        alert(`Поздравляем! ${players[curPlayer].name} победил!`);
        init();
        return;
    }
    curPlayer = (curPlayer + 1) % players.length;
    isRolled = false;
    draw();
};

const draw = () => {
    document.getElementById('turnInfo').innerText = `Ход: ${players[curPlayer].name}`;
    
    let rollBtn = document.getElementById('rollBtn');
    let choiceArea = document.getElementById('choiceArea');
    
    if (isRolled) {
        rollBtn.classList.add('hidden');
        choiceArea.classList.remove('hidden');
        
        document.getElementById('diceResult').innerText = `${d1} и ${d2}`;
        
        let sepBtn = document.getElementById('sepBtn');
        let sumBtn = document.getElementById('sumBtn');
        let pNums = players[curPlayer].numbers;
        
        let hasD1 = pNums.includes(d1);
        let hasD2 = pNums.includes(d2);
        
        if (hasD1 && hasD2 && d1 !== d2) {
            sepBtn.innerText = `Убрать ${d1} и ${d2}`;
            sepBtn.disabled = false;
        } else if (hasD1 && !hasD2) {
            sepBtn.innerText = `Убрать ${d1}`;
            sepBtn.disabled = false;
        } else if (!hasD1 && hasD2) {
            sepBtn.innerText = `Убрать ${d2}`;
            sepBtn.disabled = false;
        } else {
            sepBtn.innerText = `Убрать по отдельности`;
            sepBtn.disabled = true;
        }

        let sum = d1 + d2;
        let canSum = pNums.includes(sum);
        sumBtn.innerText = `Убрать сумму (${sum})`;
        sumBtn.disabled = !canSum;

    } else {
        rollBtn.classList.remove('hidden');
        choiceArea.classList.add('hidden');
    }

    let pArea = document.getElementById('playersArea');
    pArea.innerHTML = "";
    
    players.forEach((p, i) => {
        let div = document.createElement('div');
        div.className = `player-board ${i === curPlayer ? 'active' : 'inactive'}`;
        div.innerHTML = `<h3>${p.name}</h3><div class="numbers">${p.numbers.join(' ')}</div>`;
        pArea.appendChild(div);
    });
};

init();