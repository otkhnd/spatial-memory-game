document.addEventListener('DOMContentLoaded', () => {
    const readyButton = document.getElementById('ready-button');
    const startButton = document.getElementById('start-button');
    const gameBoard = document.getElementById('game-board');
    const message = document.getElementById('message');
    const cells = document.querySelectorAll('.cell');
    let sequence = [];
    let playerSequence = [];
    let level = 1;

    readyButton.addEventListener('click', () => {
        readyButton.classList.add('hidden');
        gameBoard.classList.remove('hidden');
        startButton.classList.remove('hidden');
    });

    startButton.addEventListener('click', () => {
        startButton.classList.add('hidden');
        message.classList.remove('hidden');
        startGame();
    });

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            cell.classList.add('active');
            setTimeout(() => {
                cell.classList.remove('active');
            }, 300);
            playerSequence.push(cell.id.replace('cell-', ''));
            if (playerSequence.length === sequence.length) {
                checkSequence();
            }
        });
    });

    function startGame() {
        sequence = [];
        playerSequence = [];
        for (let i = 0; i < level; i++) {
            sequence.push(Math.floor(Math.random() * 9).toString());
        }
        playSequence();
    }

    function playSequence() {
        let delay = 0;
        sequence.forEach((cell, index) => {
            setTimeout(() => {
                document.getElementById(`cell-${cell}`).classList.add('active');
                setTimeout(() => {
                    document.getElementById(`cell-${cell}`).classList.remove('active');
                    if (index === sequence.length - 1) {
                        message.textContent = 'Repeat';
                    }
                }, 1000);
            }, delay);
            delay += 1500;
        });
    }

    function checkSequence() {
        if (sequence.join('') === playerSequence.join('')) {
            message.textContent = 'Good!';
            level++;
            setTimeout(() => {
                message.textContent = 'Repeat';
                startGame();
            }, 1000);
        } else {
            message.textContent = 'No...';
            setTimeout(() => {
                message.textContent = 'Repeat';
                playerSequence = [];
                playSequence();
            }, 1000);
        }
    }
});
