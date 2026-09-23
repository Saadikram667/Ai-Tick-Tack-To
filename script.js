// Game state variables
let choices = {1: " ", 2: " ", 3: " ", 4: " ", 5: " ", 6: " ", 7: " ", 8: " ", 9: " "};
let validValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let gameActive = true;

const statusText = document.getElementById("statusText");
const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("resetBtn");

// 1. Win Check logic directly translated from your Python code
function winCheck(currentChoices) {
    const winningCombos = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    for (let [a, b, c] of winningCombos) {
        if (currentChoices[a] === currentChoices[b] && 
            currentChoices[b] === currentChoices[c] && 
            currentChoices[a] !== " ") {
            return currentChoices[a] === "x" ? "Human" : "Computer";
        }
    }
    return null;
}

// 2. AI Logic directly matching your Python function `Ai_Check_Mark`
function aiCheckMark() {
    if (!gameActive || validValues.length === 0) return;

    // Rule 1: Take the win if available
    for (let i = 1; i <= 9; i++) {
        if (choices[i] === " ") {
            choices[i] = "o";
            if (winCheck(choices) === "Computer") {
                removeFromValid(i);
                updateUI();
                return;
            }
            choices[i] = " ";
        }
    }

    // Rule 2: Block Human win
    for (let i = 1; i <= 9; i++) {
        if (choices[i] === " ") {
            choices[i] = "x";
            if (winCheck(choices) === "Human") {
                choices[i] = "o";
                removeFromValid(i);
                updateUI();
                return;
            }
            choices[i] = " ";
        }
    }

    // Rule 3: Take middle spot if empty
    if (choices[5] === " ") {
        choices[5] = "o";
        removeFromValid(5);
        updateUI();
        return;
    }

    // Rule 4: Pick random position
    let randomIndex = Math.floor(Math.random() * validValues.length);
    let compChoice = validValues[randomIndex];
    choices[compChoice] = "o";
    removeFromValid(compChoice);
    updateUI();
}

function removeFromValid(val) {
    validValues = validValues.filter(item => item !== val);
}

// Handle Human Move
function handleCellClick(event) {
    const cellIndex = parseInt(event.target.getAttribute("data-index"));

    if (choices[cellIndex] !== " " || !gameActive) return;

    // Human player marks spot
    choices[cellIndex] = "x";
    removeFromValid(cellIndex);
    updateUI();

    // Check if Human won
    let winner = winCheck(choices);
    if (winner) {
        statusText.innerText = `You Won! 🎉`;
        gameActive = false;
        return;
    }

    if (validValues.length === 0) {
        statusText.innerText = `It's a Tie! 🤝`;
        gameActive = false;
        return;
    }

    // Computer Turn
    statusText.innerText = "Computer is thinking...";
    setTimeout(() => {
        aiCheckMark();
        
        // Check if Computer won
        winner = winCheck(choices);
        if (winner) {
            statusText.innerText = `Computer Won! 🤖`;
            gameActive = false;
        } else if (validValues.length === 0) {
            statusText.innerText = `It's a Tie! 🤝`;
            gameActive = false;
        } else {
            statusText.innerText = "Your turn! Select a spot (1-9)";
        }
    }, 400);
}

function updateUI() {
    cells.forEach(cell => {
        const index = cell.getAttribute("data-index");
        const val = choices[index];
        cell.innerText = val === " " ? "" : val.toUpperCase();
        cell.className = `cell ${val}`;
    });
}

function resetGame() {
    choices = {1: " ", 2: " ", 3: " ", 4: " ", 5: " ", 6: " ", 7: " ", 8: " ", 9: " "};
    validValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    gameActive = true;
    statusText.innerText = "Your turn! Select a spot (1-9)";
    updateUI();
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);