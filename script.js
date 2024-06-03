const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cells = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessage = document.getElementById('winning-message')
const replayBtn = document.getElementById('replay-btn')
const winningMessageText = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

replayBtn.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    }
    )
    setBoardHoverClass()
    winningMessage.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    // Place Marker
    placeMarker(cell, currentClass)

    // check for win
    if (checkWin(currentClass)) {
        endGame(false)
    }
    // check for draw
    else if (isDraw()) {
        endGame(true)
    }
    // switch Turn
    else {
        SwitchTurns()
        setBoardHoverClass()
    }
}

function placeMarker(cell, currentClass) {
    cell.classList.add(currentClass)
}

function SwitchTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = 'Draw!'
    } else {
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessage.classList.add('show')
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
}