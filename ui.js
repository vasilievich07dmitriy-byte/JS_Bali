class GameUI {
    showSetup() {
        document.getElementById('setupScreen').classList.remove('hidden');
        document.getElementById('setupScreen').classList.add('active');
        document.getElementById('gameScreen').classList.remove('active');
        document.getElementById('gameScreen').classList.add('hidden');
        document.getElementById('winScreen').classList.remove('active');
        document.getElementById('winScreen').classList.add('hidden');
    }

    showGame() {
        document.getElementById('setupScreen').classList.remove('active');
        document.getElementById('setupScreen').classList.add('hidden');
        document.getElementById('gameScreen').classList.remove('hidden');
        document.getElementById('gameScreen').classList.add('active');
        document.getElementById('winScreen').classList.remove('active');
        document.getElementById('winScreen').classList.add('hidden');
    }

    draw(data) {
        let currentPlayer = data.getCurrentPlayer();
        document.getElementById('turnInfo').innerText = `Ход: ${currentPlayer.name}`;
        
        let rollBtn = document.getElementById('rollBtn');
        let choiceArea = document.getElementById('choiceArea');
        
        if (data.isRolled) {
            rollBtn.classList.add('hidden');
            choiceArea.classList.remove('hidden');
            
            document.getElementById('diceResult').innerText = `${data.d1} и ${data.d2}`;
            
            let sepBtn = document.getElementById('sepBtn');
            let sumBtn = document.getElementById('sumBtn');
            
            let pNums = currentPlayer.numbers.filter(n => !currentPlayer.crossed.includes(n));
            
            let hasD1 = pNums.includes(data.d1);
            let hasD2 = pNums.includes(data.d2);
            
            if (hasD1 && hasD2 && data.d1 !== data.d2) {
                sepBtn.innerText = `Убрать ${data.d1} и ${data.d2}`;
                sepBtn.disabled = false;
            } else if (hasD1) {
                sepBtn.innerText = `Убрать ${data.d1}`;
                sepBtn.disabled = false;
            } else if (hasD2) {
                sepBtn.innerText = `Убрать ${data.d2}`;
                sepBtn.disabled = false;
            } else {
                sepBtn.innerText = `Убрать по отдельности`;
                sepBtn.disabled = true;
            }

            let sum = data.d1 + data.d2;
            let canSum = pNums.includes(sum);
            sumBtn.innerText = `Убрать сумму (${sum})`;
            sumBtn.disabled = !canSum;

        } else {
            rollBtn.classList.remove('hidden');
            choiceArea.classList.add('hidden');
        }

        let pArea = document.getElementById('playersArea');
        pArea.innerHTML = "";
        pArea.className = "players-area";
        
        if (data.players.length % 2 === 0) {
            pArea.classList.add('players-even');
        } else {
            pArea.classList.add('players-odd');
        }
        
        data.players.forEach((p, i) => {
            let div = document.createElement('div');
            div.className = `player-board ${i === data.curPlayer ? 'active' : 'inactive'}`;
            
            let numsHtml = p.numbers.map(n => {
                if (p.crossed.includes(n)) {
                    return `<span class="red-text">${n}</span>`;
                }
                return `<span>${n}</span>`;
            }).join(' ');
            
            div.innerHTML = `<h3>${p.name}</h3><div class="numbers">${numsHtml}</div>`;
            pArea.appendChild(div);
        });
    }

    showWin(name) {
        document.getElementById('gameScreen').classList.remove('active');
        document.getElementById('gameScreen').classList.add('hidden');
        
        document.getElementById('winScreen').classList.remove('hidden');
        document.getElementById('winScreen').classList.add('active');
        
        document.getElementById('winMessage').innerText = `${name} победил!`;
    }
}