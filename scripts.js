let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll(".cell");
const messageElement = document.getElementById("message");

cells.forEach(cell => cell.addEventListener("click", handleCellClick));

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (board[index] !== "" || !gameActive || currentPlayer === "O") {
        return;
    }

    makeMove(cell, index);
    checkResult();
    if (gameActive) {
        currentPlayer = "O";
        messageElement.innerHTML = `Player ${currentPlayer}'s turn`;
        setTimeout(aiMove, 500); 
    }
}

function makeMove(cell, index) {
    board[index] = currentPlayer;
    cell.innerHTML = currentPlayer;
}

function aiMove() {
    let emptyCells = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            emptyCells.push(i);
        }
    }

    if (emptyCells.length === 0) return;

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
    makeMove(cell, randomIndex);
    checkResult();
    if (gameActive) {
        currentPlayer = "X";
        messageElement.innerHTML = `Player ${currentPlayer}'s turn`;
    }
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageElement.innerHTML = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    const roundDraw = !board.includes("");
    if (roundDraw) {
        messageElement.innerHTML = "Draw!";
        gameActive = false;
        return;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    messageElement.innerHTML = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.innerHTML = "");
}
