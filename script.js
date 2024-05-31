// Gameboard is to be stored in an array
// Players will be stored in objects
// Object will control the flow of the game
// Objective: Minimize global code
// Utilize factories
// 
function Gameboard() {
    const rows = 3
    const columns = 3
    const board = []

    // 2d array representing the game board
    // row 0 represents top row
    // column 0 represents left-most column
    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; i < columns; j++) {
            board[i].push(Cell())
        }
    }

    // renders board for UI
    const getBoard = () => board;

    const placeMarker = (column, row, player) => {
        const availableCells = board.filter((row) =>
            row[column].getValue() === 0).map(row => row[column])

        if (!availableCells.length) return

        board[row][column].addMarker(player)
    }

    const printBoard = () => {
        const boardWithCells = board.map((row) => row.map((cell) => cell.getValue()))

        console.log(boardWithCells)

    }
    return { getBoard, placeMarker, printBoard }
}


// a cell represents one tile on the board and can have one of the following values
// 0: there is no marker in the tile
// 1: player 1 has placed a marker in the tile
// 2: player 2 has placed a marker in the tile
function Cell() {
    let value = 0

    const addMarker = (player) => {
        value = player
    }

    const getValue = () => value
    return {
        addMarker,
        getValue
    }
}

function GameController(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {
    const board = Gameboard()

    const players = [
        {
            name: playerOneName,
            marker: 1
        },
        {
            name: playerTwoName,
            marker: 2
        }
    ]

    let activePlayer = players[0]

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]

        const getActivePlayer = () => activePlayer

        const printNewRound = () => {
            board.printBoard()
            console.log(`${getActivePlayer().name}'s turn.`)
        }

        const playRound = (column, row) => {
            console.log(
                `Placing ${getActivePlayer().name}'s marker on the board...`
            )
            board.placeMarker(column, row, getActivePlayer().marker)
            // check for winner
            // UNDER CONSTRUCTION

            // change player turn and let the player know the game status
            switchPlayerTurn()
            printNewRound()

        }
        // initial play game message
        printNewRound()

        return {
            playRound,
            getActivePlayer
        }
    }
}

const game = GameController()