const X_CLASS = 'x'
const O_CLASS = 'o'
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

const winningMessageTextElement = document.querySelector('[data-winning-message-text]'),
    cellElements = document.querySelectorAll('[data-cell]'),
    board = document.getElementById('board'),
    restartButton = document.getElementById("restart-button");

let isDifficult = false;

const setDifficulty = (level) => {
    if(level === "hard"){
        document.getElementById('easy').style.backgroundColor = "var(--blue)";
        document.getElementById('hard').style.backgroundColor = "var(--blue)";
        isDifficult = true
    } else {
        document.getElementById('easy').style.backgroundColor = "var(--blue)";
        document.getElementById('hard').style.backgroundColor = "white";
        isDifficult = false;
    }
}

let boardArr = ["", "", "", "", "", "", "", "", ""], circleTurn


const selectPlayersNumber = document.getElementById("select-players");
let playersNumber = selectPlayersNumber.options[selectPlayersNumber.selectedIndex].value;

selectPlayersNumber.addEventListener('change', () => {
    playersNumber = selectPlayersNumber.options[selectPlayersNumber.selectedIndex].value;
})



const checkWin = (currentClass) => {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return boardArr[index] === currentClass;
        });
    })
}

const handleClick = (e) => {
    const cell = e.target

    if (playersNumber === "2") {
        const currentClass = circleTurn ? O_CLASS : X_CLASS
        placeMark(cell, currentClass);
        boardArr[e.target.id] = currentClass;

        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setBoardHoverClass()
        }
    } else {
        let currentClass;

        if (!circleTurn) {
            currentClass = X_CLASS
            placeMark(cell, X_CLASS)
            boardArr[e.target.id] = currentClass;
        }

        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setBoardHoverClass()
        }

    }
}


const isDraw = () => {
    return [...boardArr].every(cell => (
        cell === "x" || cell === "o"
    ));

}


const endGame = (draw) => {
    if (draw) {
        winningMessageTextElement.innerText = "Draw"
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "I" : "You"} won`
    }
    winningMessageTextElement.classList.remove("hide")

}

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass)
}

const swapTurns = function () {
    circleTurn = !circleTurn
    if (playersNumber === "1" && circleTurn) {
        automaticPlay()
    }
}


const setBoardHoverClass = () => {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (circleTurn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

const automaticPlay = () => {
    const currentClass = O_CLASS
    let rand

    if (!isDifficult) {
        do {
            rand = Math.floor(Math.random() * 9);
        } while (cellElements[rand].classList.contains(X_CLASS) || cellElements[rand].classList.contains(O_CLASS))

        if (rand !== undefined) {
            placeMark(cellElements[rand], O_CLASS);
        }
    } else {
        bestMove();
    }

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass()
    }
}

const startGame = () => {
    circleTurn = false

    for (let i = 0; i < boardArr.length; i++) {
        let cell = cellElements[i];
        boardArr[i] = "";
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.addEventListener('click', handleClick, {once: true})
    }
    setBoardHoverClass();
    winningMessageTextElement.classList.add("hide")
}

restartButton.addEventListener('click', startGame)


startGame()

const bestMove = () => {
    let bestScore = -Infinity, move;
    for (let i = 0; i < 9; i++) {
        if (boardArr[i] === '') {
            boardArr[i] = 'o'
            let score = minimax(boardArr, 0, false);
            boardArr[i] = ''
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    boardArr[move] = 'o'
    placeMark(cellElements[move], O_CLASS);
}

let scores = {
    X: -1,
    O: 1,
    tie: 0
};

function minimax(boardArr, depth, isMaximizing) {
    if (checkWin(X_CLASS)) {
        return scores["X"];
    }
    if (checkWin(O_CLASS)) {
        return scores["O"];
    }
    if (isDraw()) {
        return scores["tie"];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (boardArr[i] === '') {
                boardArr[i] = 'o'
                let score = minimax(boardArr, depth + 1, false);
                boardArr[i] = ''
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            // Is the spot available?
            if (boardArr[i] === '') {
                boardArr[i] = 'x'
                let score = minimax(boardArr, depth + 1, true);
                boardArr[i] = ''
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

