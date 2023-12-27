'use strict'

const GHOST = '&#9781'
const ghostNum = 2
var gGhosts = []
const gGhostsColor = [] //to save the original color before eating SUPER

var gId = 0
var gGhostsInterval
var gDeadGhosts = []

function createGhosts(board) {
    if (gGame.playAgain) return

    for (var i = 0; i < ghostNum; i++) {
        createGhost(board)
    }
    gGhostsInterval = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    const ghost = {
        id: gId++,
        location: { i: 3, j: 3 },
        currCellContent: FOOD,
        color: getRandomColor(),
        superColor: 'Turquoise',
        onSuper: false,
    }

    gGhosts.push(ghost)
    gGhostsColor[`${ghost.id}`] = ghost.color
    board[ghost.location.i][ghost.location.j] = GHOST
}

console.log(gGhostsColor)
function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i])
    }
}

function moveGhost(ghost) {
    // TODO: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL || nextCell === GHOST) return

    // TODO: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) {
            return
        } else {
            gameOver()
            return
        }
    }

    if (nextCell === GHOST) return

    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    renderCell(ghost.location, ghost.currCellContent)
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = GHOST

    renderCell(ghost.location, getGhostHTML(ghost))

}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color};"->${GHOST}</span>`
}

function ghostColorOnSuper() {
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = gGhosts[i].superColor
        gGhosts[i].onSuper = true
    }

}

function killGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currLocation = gGhosts[i].location
        if (currLocation.i === location.i && currLocation.j === location.j) {
            const deadGhost = gGhosts.splice(i, 1)[0]
            gDeadGhosts.push(deadGhost)
            console.log(gDeadGhosts)

            console.log(gGhostsColor[0], gGhostsColor[1])
        }
    }
}
console.log(gGhosts)
function reviveGhosts() {
    for (var i = 0; i < gDeadGhosts.length; i++) {
        const currghost = gDeadGhosts[i]
        gGhosts.push(currghost)
        currghost.color = gGhostsColor[`${currghost.id}`]  //replacing back to original ghost colors
        currghost.onSuper = false

    }
    gDeadGhosts = []
}
