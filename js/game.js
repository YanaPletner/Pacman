'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const EMPTY = ' '
const SUPER = '&#x4f'
const CHERRY = '🍒'

var gGame = {
    score: 0,
    isOn: false,
    playAgain: false,
    isCherry: false
}
var gBoard
var addCherryInterval

function init() {
    console.log('hello')
    gBoard = buildBoard()

    createPacman(gBoard)
    createGhosts(gBoard)
    gGame.isOn = true
    renderBoard(gBoard, '.board-container')
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hidden')
    const victor = document.querySelector('.victor')
    victor.classList.add('hidden')
    addCherryInterval = setInterval(addCherry, 8000)
    gCheckInterval = setInterval(collectsAllFoodCheck, 100)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([]) // board[i] = []

        for (var j = 0; j < size; j++) {
            if (i === 1 && j === 1 || i === 1 && j === size - 2 || i === size - 2 && j === 1 || i === size - 2 && j === size - 2) {
                board[i][j] = SUPER
            } else board[i][j] = FOOD


            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    return board
}

function updateScore(diff) {
    const elScore = document.querySelector('h2 span')

    // Model
    gGame.score += diff
    // DOM
    elScore.innerText = gGame.score
}

function gameOver() { //when eats all FOOD or meets a GHOST
    // console.log('Game Over')
    gGame.isOn = false
    gGhostsInterval = false

    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hidden')
}

function playAgain() { //when the button is clicked
    gGame.playAgain = true
    init()
}

function addCherry() {
    const i = getRandomIntInclusive(0, gBoard.length - 1)
    const j = getRandomIntInclusive(0, gBoard[i].length - 1)
    const cherry = {
        location: { i, j },
    }

    if (!gGame.isOn) return
    if (gBoard[i][j] === GHOST || gBoard[i][j] === WALL || gBoard[i][j] === SUPER || gBoard[i][j] === PACMAN) return
    if (gBoard[i][j] !== CHERRY && !gGame.isCherry) {
        gBoard[i][j] = CHERRY
        gGame.isCherry = true
        renderCell(cherry.location, CHERRY)
    }

    setTimeout(() => {
        if (gBoard[i][j] !== CHERRY) return
        gGame.isCherry = false
        gBoard[i][j] = FOOD
        renderCell(cherry.location, FOOD)
    }, 7000)
}
