/**
 * IDEAS AND RULES
 * 
 * rules:
 * each square on ULTIMATE_BOARD is its own smaller ULTIMATE_BOARD
 * when a player plays on a small ULTIMATE_BOARD, the next player will play on the ULTIMATE_BOARD at that position on the big ULTIMATE_BOARD
 *  ex. if player plays bottom left on the middle square, then opponent must play in the bottom left square
 *  
 * when a square is won or drawn the next player may choose the next square to be played on
 * to win, claim victory on 3 alligned squares, or win the most smaller tic tac toe ULTIMATE_BOARDs
 * 
 * 
 * ideas:
 * read/write squares using [-y x] coords 0 - 8, starting from top left
 * must keep track of all ULTIMATE_BOARDs
 * use x % 3 and y % 3 for coords on small ULTIMATE_BOARD, then floor x / 3 and y / 3 for determining which larger ULTIMATE_BOARD
 * during testing, must observe how ties are handled
 * might want to reuse the haswon function to determine if player gets to pick a new square, alternativly look for conditions (ex. opponent chooses a new square, cannot find empty square, or hasWon, or if there is some way to know if you have won/tied/lost before making a move, which would have to be disable-able for the larger squares)
 * will likely need to implement time saving algorithms like alpha-beta pruning, or monte carlo algorithm
 * 
 * 
 * 
 * requirements for optimal:
 * be able to simulate the new rules, especially the rule regarding which small ULTIMATE_BOARD you must play on
 * integrate alpha beta pruning
 * create a function to determine what small square I am restricted to
 * 
 * potentially good enough for bronze:
 * just find a function to determine what small square i am restricted to, then make the best move within that square.
 * 
 * 
 * I am feeling inclined to immediatly convert everything into inputs that make more sense to me, ie instead of [-y x][(0-8) (0-8)] i want to make [board x y][(0-8) (0-2) (0-2)]
 * this would be more efficiant for my visualization/conception, but is less space efficient, takes extra time, and is certantly non-optimal
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
ULTIMATE_BOARD[opponentRow][opponentCol] = opponent;
}

// chose the player's move
let bestMove: number[] = findBestMove(validActionCount);

// make the player's best move
ULTIMATE_BOARD[bestMove[1]][bestMove[2]] = player;

//print player's best move
console.log(`${bestMove[1]} ${bestMove[2]}`);
}

// psudocode
// function findBestMove(ULTIMATE_BOARD):
//     bestMove = NULL
//     for each move in ULTIMATE_BOARD :
//         if current move is better than bestMove
//             bestMove = current move
//     return bestMove
function findBestMove(validActionCount): number[] {
// bestMove = [moveValue, Row, Col];
let bestMove = [-Infinity, -1, -1];

ULTIMATE_BOARD.forEach((row, rowIndex) => {
row.forEach((cell, colIndex) => {
// if the move has been made already move on
if (cell !== '-') return;
// make a move
ULTIMATE_BOARD[rowIndex][colIndex] = player;

// evaluate moves score
let moveVal = minimax(validActionCount - 1, false);

// undo move
ULTIMATE_BOARD[rowIndex][colIndex] = '-';

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
ULTIMATE_BOARD.forEach((row, rowIndex) => {
row.forEach((cell, colIndex) => {
  // check if cell is empty
  if(ULTIMATE_BOARD[rowIndex][colIndex] === '-'){
      // make player's move
      ULTIMATE_BOARD[rowIndex][colIndex] = player;
      // recursively call minimax and find the maximum move
      best = Math.max(best, minimax(depth - 1, false));
      // undo player's move
      ULTIMATE_BOARD[rowIndex][colIndex] = '-';

  }
});
});
return best;
}

// simulate minimizer's move (opponent)
if(!isMax) {
best = Infinity;
// traverse all moves
ULTIMATE_BOARD.forEach((row, rowIndex) => {
row.forEach((cell, colIndex) => {
  // check if cell is empty
  if(ULTIMATE_BOARD[rowIndex][colIndex] === '-'){
      // make opponent's move
      ULTIMATE_BOARD[rowIndex][colIndex] = opponent;
      // recursively call minimax and find the minimum value
      best = Math.min(best, minimax(depth - 1, true));
      // undo opponent's move
      ULTIMATE_BOARD[rowIndex][colIndex] = '-';
  }
});
});
return best;
}
}

function hasWon() {
// Check rows
for (let row = 0; row < 3; row++) {
if (ULTIMATE_BOARD[row][0] === ULTIMATE_BOARD[row][1] && ULTIMATE_BOARD[row][1] === ULTIMATE_BOARD[row][2] && ULTIMATE_BOARD[row][0] !== '-') {
return ULTIMATE_BOARD[row][0] === player ? 10 : -10;
}
}

// Check columns
for (let col = 0; col < 3; col++) {
if (ULTIMATE_BOARD[0][col] === ULTIMATE_BOARD[1][col] && ULTIMATE_BOARD[1][col] === ULTIMATE_BOARD[2][col] && ULTIMATE_BOARD[0][col] !== '-') {
return ULTIMATE_BOARD[0][col] === player ? 10 : -10;
}
}

// Check diagonals
if ((ULTIMATE_BOARD[0][0] === ULTIMATE_BOARD[1][1] && ULTIMATE_BOARD[1][1] === ULTIMATE_BOARD[2][2] && ULTIMATE_BOARD[0][0] !== '-') ||
(ULTIMATE_BOARD[0][2] === ULTIMATE_BOARD[1][1] && ULTIMATE_BOARD[1][1] === ULTIMATE_BOARD[2][0] && ULTIMATE_BOARD[0][2] !== '-')) {
return ULTIMATE_BOARD[1][1] === player ? 10 : -10;
}

// No winner found
return 0;
}

