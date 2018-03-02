const readline = require('readline')
//const game = require('./game')

const PLAYER_A = 1
const PLAYER_B = 1
const LINE_LENGHT = 5
const COlUM_LENGHT =6
const CELL_EMPTY = 0
const INVALID_CELL =1000
const OUT_OF_BOARD =2000

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
})
//
// const board =[
//     [1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1],
// ]




const board =[
    [0, 0, 0, 1, 0, 1, 0],
    [1, 1, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 1, 0],
]

// const board =[
//     [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
//     [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
//     [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
//     [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
//     [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
//     [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
//     ]

playGame()

function playGame() {
    const state = {
        board: board,
        turn: 0,
    }

    promptNextMove(state)


    function promptNextMove(state) {
        const player = getPlayerForState(state)
        const displayPlayer = getDisplayPlayer(player)
        const question = `${displayPlayer}, prochain coup ? \n`
        //win(0,0,player)
        prompt(question, answer => {
            console.log('commande : ' + answer)
        write(String("\n"))

        boardIsEmpty()
        if (fillboard(answer,player))
        {
        display(board)
        state.turn++
        }
        promptNextMove(state)

    })
    }

    /**
     * Function qui retourne state de la position
     * @param pos
     * @returns {number}
     */
    function  firstEmptyLine(pos){
        if (pos  < 0 || pos > 6) {

            return OUT_OF_BOARD
        }

        for (var i = 5 ; i>=0  ;i--)
        {
            if (board[i][pos] === CELL_EMPTY )
            {
                return  i
            }
        }
        return INVALID_CELL
    }

    /**
     * Function qui  remplit  le board
     * @param pos
     * @param player
     * @returns {boolean}
     */
    function fillboard(pos ,player) {
        var isValidPosition = false
        var  freeline =firstEmptyLine(pos)
       // win(1,1,player)
        if ( freeline  === INVALID_CELL  )
        {
           console.log("Position  impossible Veuillez  en choisir une autre")
        }else if ( freeline  === OUT_OF_BOARD  ){
            console.log("veuillez  choisir  une position  entre 1 et  6")
        }else {
            board[freeline][pos] = player
            if (win (freeline,pos,player)){
                console.log("finish")
            }else{

            isValidPosition= true}
        }

        return isValidPosition
    }
   // win(0,3,player)
    function win   (row, column, player) {
        // Horizontal
        var count = 0
        for (var j = 0; j < 6; j++) {
            count = (board[row][j] == player) ? count + 1 : 0;

            if (count >= 4) {
                console.log(  "player "+ player +" win ")
                return true;
            }
        }
        // Vertical
        var count = 0
        for (var j = 0; j < 5; j++) {
            count = (board[j][column] == player) ? count+1 : 0;
            if (count >= 4) {
                console.log(  "player "+ player +" win ")
                return true;
            }
        }
        // Diagonal
        count = 0;
        var shift = row - column;
        for (var i = Math.max(shift, 0); i < Math.min(row, column + shift); i++) {
            count = (board[i][i - shift] == player) ? count+1 : 0;
            if (count >= 4) {
                console.log(  "player "+ player +" win ")
                return true;
            }
        }
    }


    /**
     * Function qui  verifie   si  le   board  est  vide
     * @returns {Boolean}
     */
    function boardIsEmpty(){
        var boardEmpty = false
        for(var i=0; i<6 ;i++)
        {
        if (firstEmptyLine(i) != INVALID_CELL && firstEmptyLine(i) != OUT_OF_BOARD)
            boardEmpty = true
        }
        return boardEmpty
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

