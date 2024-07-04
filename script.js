let currentPlayer = 'x';
let gameActive = true;
let board = Array(9).fill('');

document.getElementById('resetBtn').addEventListener('click', resetGame);
document.getElementById('newGameBtn').addEventListener('click', resetGame);

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    board = Array(9).fill('');

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (!gameActive || board[index]) return;

    board[index] = currentPlayer;
    event.target.classList.add(currentPlayer);

    if (checkWin()) {
        showResult(`${currentPlayer.toUpperCase()} WINS!`);
        gameActive = false;
    } else if (board.every(cell => cell)) {
        showResult('It\'s a DRAW!');
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        document.getElementById('turn-indicator').textContent = currentPlayer.toUpperCase();
    }
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'x';
    document.getElementById('message').textContent = '';
    document.getElementById('turn-indicator').textContent = currentPlayer.toUpperCase();
    closePopup();
    createBoard();
}

function showResult(message) {
    document.getElementById('resultMessage').textContent = message;
    document.getElementById('resultPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('resultPopup').style.display = 'none';
}

createBoard();
