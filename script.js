const cells = document.querySelectorAll(".cell");
const message = document.querySelector(".message");
const restartBtn = document.querySelector(".restart-btn");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function restartGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.style.backgroundColor = ""; // Remove background color
    });
    message.textContent = `${currentPlayer}'s Turn!`;
}
restartBtn.addEventListener("click", restartGame);

function checkWinner() {
    const winningConditions = [
        [0, 1, 2], // Horizontal winning conditions row 1
        [3, 4, 5], // Horizontal winning conditions row 2
        [6, 7, 8], // Horizontal winning conditions row 3

        [0, 3, 6], // Vertical winning conditions column 1
        [1, 4, 7], // Vertical winning conditions column 2
        [2, 5, 8], // Vertical winning conditions column 3

        [0, 4, 8], // Diagonal winning conditions from top-left to bottom-right
        [2, 4, 6], // Diagonal winning conditions from top-right to bottom-left
    ];

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const cell1 = gameBoard[condition[0]];
        const cell2 = gameBoard[condition[1]];
        const cell3 = gameBoard[condition[2]];

        // Check if all cells in the condition have the same value and are not empty
        if (cell1 !== "" && cell1 === cell2 && cell2 === cell3) {
            return true;
        }
    }

    return false;
}

function isBoardFull() {
    // Check if all cells are filled
    return gameBoard.every((cell) => cell !== "");
}


function handleCellClick(event) {
    const clickedCellIndex = event.target.dataset.cellIndex;
    if (gameBoard[clickedCellIndex] !== "") {
        return; // Cell already filled
    }

    gameBoard[clickedCellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    const clickedCell = event.target;

    if (checkWinner()) {
        message.textContent = `${currentPlayer} Wins!`;
        message.style.color = 'green';
        cells.forEach((cell) => cell.removeEventListener("click", handleCellClick));
        return restartBtn.addEventListener("click", restartGame);
    }

    if (isBoardFull()) {
        message.textContent = "It's a Tie!";
        cells.forEach((cell) => cell.removeEventListener("click", handleCellClick));
        return restartBtn.addEventListener("click", restartGame);
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    clickedCell.style.backgroundColor = currentPlayer === "X" ? "red" : "green";
    message.textContent = `${currentPlayer}'s Turn!`;
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));

