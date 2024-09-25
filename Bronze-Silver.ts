/**
 * IDEAS AND RULES
 * 
 * rules:
 * each square on board is its own smaller board
 * when a player plays on a small board, the next player will play on the board at that position on the big board
 *  ex. if player plays bottom left on the middle square, then opponent must play in the bottom left square
 *  
 * when a square is won or drawn the next player may choose the next square to be played on
 * to win, claim victory on 3 alligned squares, or win the most smaller tic tac toe boards
 * 
 * 
 * ideas:
 * read/write squares using [-y x] coords 0 - 8, starting from top left
 * must keep track of all boards
 * use x % 3 and y % 3 for coords on small board, then floor x / 3 and y / 3 for determining which larger board
 * during testing, must observe how ties are handled
 * might want to reuse the haswon function to determine if player gets to pick a new square, alternativly look for conditions (ex. opponent chooses a new square, cannot find empty square, or hasWon, or if there is some way to know if you have won/tied/lost before making a move, which would have to be disable-able for the larger squares)
 * will likely need to implement time saving algorithms like alpha-beta pruning, or monte carlo algorithm
 * 
 * 
 * 
 * requirements for optimal:
 * be able to simulate the new rules, especially the rule regarding which small board you must play on
 * integrate alpha beta pruning
 * create a function to determine what small square I am restricted to
 * 
 * potentially good enough for bronze:
 * just find a function to determine what small square i am restricted to, then make the best move within that square.
 * 
 * 
 **/

const ULTIMATE_BOARD = [
  [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']],
  [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']],
  [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']],
  [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']],
  [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']],
  [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']],
  [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']],
  [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']],
  [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]
];

let player = 'x', opponent = 'o';
// game loop
while (true) {
var inputs: string[] = readline().split(' ');
const opponentRow: number = parseInt(inputs[0]);
const opponentCol: number = parseInt(inputs[1]);
const validActionCount: number = parseInt(readline());
for (let i = 0; i < validActionCount; i++) {
var inputs: string[] = readline().split(' ');
const row: number = parseInt(inputs[0]);
const col: number = parseInt(inputs[1]);
}
// Write an action using console.log()
// To debug: console.error('Debug messages...');

// if it is not the first turn, make the opponent's move
if(opponentRow !== -1){
BOARD[opponentRow][opponentCol] = opponent;
}

// chose the player's move
let bestMove: number[] = findBestMove(validActionCount);

// make the player's best move
BOARD[bestMove[1]][bestMove[2]] = player;

//print player's best move
console.log(`${bestMove[1]} ${bestMove[2]}`);
}

// psudocode
// function findBestMove(board):
//     bestMove = NULL
//     for each move in board :
//         if current move is better than bestMove
//             bestMove = current move
//     return bestMove
function findBestMove(validActionCount): number[] {
// bestMove = [moveValue, Row, Col];
let bestMove = [-Infinity, -1, -1];

BOARD.forEach((row, rowIndex) => {
row.forEach((cell, colIndex) => {
// if the move has been made already move on
if (cell !== '-') return;
// make a move
BOARD[rowIndex][colIndex] = player;

// evaluate moves score
let moveVal = minimax(validActionCount - 1, false);

// undo move
BOARD[rowIndex][colIndex] = '-';

//update bestMove
if (bestMove[0] < moveVal) {
  bestMove = [moveVal, rowIndex, colIndex];
}
});
});
return bestMove;
}


// psudocode for minimax algorithm
// function minimax(node, depth, maximizingPlayer) is
//     if depth = 0 or node is a terminal node then
//         return the heuristic value of node
//     if maximizingPlayer then
//         value := −∞
//         for each child of node do
//             value := max(value, minimax(child, depth − 1, FALSE))
//         return value
//     else (* minimizing player *)
//         value := +∞
//         for each child of node do
//             value := min(value, minimax(child, depth − 1, TRUE))
//         return value
function minimax(depth, isMax): number{
let score: number = hasWon();

// if maximizer or minimizer has won the game return their score
if(score === 10 || score === -10) return score;

// if there are no moves left it is a tie
if(depth <= 0) return 0;

let best: number;
// simulate maximizer's move (player)
if (isMax) {
best = -Infinity;
// traverse all cells
BOARD.forEach((row, rowIndex) => {
row.forEach((cell, colIndex) => {
  // check if cell is empty
  if(BOARD[rowIndex][colIndex] === '-'){
      // make player's move
      BOARD[rowIndex][colIndex] = player;
      // recursively call minimax and find the maximum move
      best = Math.max(best, minimax(depth - 1, false));
      // undo player's move
      BOARD[rowIndex][colIndex] = '-';

  }
});
});
return best;
}

// simulate minimizer's move (opponent)
if(!isMax) {
best = Infinity;
// traverse all moves
BOARD.forEach((row, rowIndex) => {
row.forEach((cell, colIndex) => {
  // check if cell is empty
  if(BOARD[rowIndex][colIndex] === '-'){
      // make opponent's move
      BOARD[rowIndex][colIndex] = opponent;
      // recursively call minimax and find the minimum value
      best = Math.min(best, minimax(depth - 1, true));
      // undo opponent's move
      BOARD[rowIndex][colIndex] = '-';
  }
});
});
return best;
}
}

function hasWon() {
// Check rows
for (let row = 0; row < 3; row++) {
if (BOARD[row][0] === BOARD[row][1] && BOARD[row][1] === BOARD[row][2] && BOARD[row][0] !== '-') {
return BOARD[row][0] === player ? 10 : -10;
}
}

// Check columns
for (let col = 0; col < 3; col++) {
if (BOARD[0][col] === BOARD[1][col] && BOARD[1][col] === BOARD[2][col] && BOARD[0][col] !== '-') {
return BOARD[0][col] === player ? 10 : -10;
}
}

// Check diagonals
if ((BOARD[0][0] === BOARD[1][1] && BOARD[1][1] === BOARD[2][2] && BOARD[0][0] !== '-') ||
(BOARD[0][2] === BOARD[1][1] && BOARD[1][1] === BOARD[2][0] && BOARD[0][2] !== '-')) {
return BOARD[1][1] === player ? 10 : -10;
}

// No winner found
return 0;
}

