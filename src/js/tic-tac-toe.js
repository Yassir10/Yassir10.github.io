const X_CLASS = 'x'
const O_CLASS = 'o'
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board')
const restartButton = document.getElementById("restart-button")


let circleTurn


const selectPlayersNumber = document.getElementById("select-players");
let playersNumber = selectPlayersNumber.options[selectPlayersNumber.selectedIndex].value;

selectPlayersNumber.addEventListener('change', () => {
    playersNumber = selectPlayersNumber.options[selectPlayersNumber.selectedIndex].value;
})

const checkWin = (currentClass) => {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    })
}

const handleClick = (e) => {
    const cell = e.target

    if (playersNumber === "2") {
        const currentClass = circleTurn ? O_CLASS : X_CLASS
        placeMark(cell, currentClass);

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
    return [...cellElements].every(cell => (
        cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    ));
}


const endGame = (draw) => {
    if (draw) {
        winningMessageTextElement.innerText = "Draw"
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} won`
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

    do {
        rand = Math.floor(Math.random() * 9);
    } while(cellElements[rand].classList.contains(X_CLASS) || cellElements[rand].classList.contains(O_CLASS))

    if(rand !== undefined){
        placeMark(cellElements[rand], O_CLASS);
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

    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass();
    winningMessageTextElement.classList.add("hide")
}

restartButton.addEventListener('click', startGame)


startGame()

