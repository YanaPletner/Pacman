'use strict'

const PACMAN = '🙃'
var gPacman

var gCheckInterval //for the collectsAllFoodCheck function

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: { i: 8, j: 4 },
        onSuper: false,
        deg: 0
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    console.log(gPacman)
}

function movePacman(ev) {

    if (!gGame.isOn) return

    // TODO: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL) return


    if (nextCell === SUPER) {
        if (gPacman.onSuper) {
            return
        }  //so that pacman wouldnt eat another SUPER whil he is on super mode
        else {
            gPacman.onSuper = true
            ghostColorOnSuper()
            updateScore(5)
            pacmanOnSuperMode()
        }
    }

    if (nextCell === CHERRY) {
        updateScore(10)
    }
    // TODO: hitting food? call updateScore
    if (nextCell === FOOD) {
        updateScore(1)
    }
    // TODO: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.onSuper) {
            killGhost(nextLocation)
        } else {
            gameOver()
            return
        }
    }

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    renderCell(gPacman.location, EMPTY)

    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // TODO: update the DOM
    renderCell(gPacman.location, getPacmanHtml(gPacman))
}

function pacmanOnSuperMode() {
    setTimeout(() => {
        gPacman.onSuper = false
        if (gGhosts.length) {
            for (var i = 0; i < gGhosts.length; i++) {
                gGhosts[i].color = gGhostsColor[`${gGhosts[i].id}`]  //replacing back to original ghost colors
            }
        }
        reviveGhosts()
    }, 5000)
}

function getPacmanHtml(pacman) {
    return `<div class="pacman" style="transform: rotate(${pacman.deg}deg)">${PACMAN}</div>`
}

function getNextLocation(eventKeyboard) {
    const nextLocation = { i: gPacman.location.i, j: gPacman.location.j }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            gPacman.deg = 0
            nextLocation.i--
            break;

        case 'ArrowDown':
            gPacman.deg = 180
            nextLocation.i++
            break;

        case 'ArrowLeft':
            gPacman.deg = -90
            nextLocation.j--
            break;

        case 'ArrowRight':
            gPacman.deg = 90
            nextLocation.j++
            break;

        default: return null
    }
    return nextLocation
}


function collectsAllFoodCheck() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === FOOD && gGhosts.currCellContent !== FOOD) {//|| gGhosts[i].currCellContent === FOOD
                return
            }
        }
    }
    victory()
    gameOver()

}

function victory() {
    const victor = document.querySelector('.victor')
    victor.classList.remove('hidden')
}

