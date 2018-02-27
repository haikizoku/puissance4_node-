const readline = require('readline')

const CELL_EMPTY = 0
const PLAYER_A = 1
const PLAYER_B = 2

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
})

const board = [
  [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
  [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
  [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
  [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
  [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
  [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
]

playGame()

function playGame() {
  const state = {
    board: board,
    turn: 0,
  }

  promptNextMove(state)



function playNextMove(state) {
  promptNextMove(state)
  // isQuit
  // move = parseMove(cmd)
  // validation = validateMove(move)
  // if (validation.isValid) {
  //   applyMove(state, validation.move)
  // } else {
  //   display()
  //   promptNextMove(state)
  // }
}

function promptNextMove(state) {
  const player = getPlayerForState(state)
  const displayPlayer = getDisplayPlayer(player)
  const question = `${displayPlayer}, prochain coup ? `
  prompt(question, answer => {
    console.log('commande : ' + answer)
    fillboard(answer)
    display(board)
    state.turn++
    promptNextMove(state)

  })
}



  function ValidPosition(pos){
    if(pos > 6 || pos < 0 ){
      console.log("Position impossible veuillez  choisir une position entre 1 et 6")
    }
    if (board[5][pos] != 0 ){
      console.log("position  déjà  prise veuillez  en choisir une autre")
    }
  }


  function fillboard(pos) {
      for(var i=0; i<6; i++) {


          for (var j = 0; j < 5; j++) {
              if (board[i][pos] != 0) {

                  board[5][4] = 'P'

              } else if (board[i][pos] != 5 && board[i][pos - 1] != 'undefined') {

                board[5][4] = 'P'

              } else {

                  console.log("position impossible")
              }
          }
      }
  }


  function getPlayerForState(state) {
    const turn = state.turn
    if (turn % 2 === 0) {
      return PLAYER_A
    } else {
      return PLAYER_B
    }
  }

  function getDisplayPlayer(player) {
    switch (player) {
      case PLAYER_A: return 'Joueur A'
      case PLAYER_B: return 'Joueur B'
      default: throw new Error('Invalid player: ' + player)
    }
  }
}

function prompt(question, callback) {
  rl.question(question, callback)
}

function display(board) {
  board.forEach(row => {
    row.forEach(cell => {
      // write('' + cell)
      write(String(cell))
    })
    write(String("\n"))
  })
}

display(board)
function write(msg) {
  process.stdout.write(msg)
}

// run('> ')
//
// function run(question) {
//   ask()
//
//   function ask() {
//     rl.question(question, onAnswer)
//   }
//
//   function onAnswer(answer) {
//     console.log(answer)
//     ask()
//   }
// }
