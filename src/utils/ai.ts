import { ROWS, COLS } from '../constants';
import { BoardState, Player } from '../types';
import { getLowestEmptyRow, isValidMove, checkWin } from './gameLogic';

const CPU_PLAYER: Player = 'yellow';
const HUMAN_PLAYER: Player = 'red';

function evaluateWindow(window: (Player | null)[], player: Player): number {
  let score = 0;
  const opponent: Player = player === 'yellow' ? 'red' : 'yellow';

  const playerCount = window.filter((cell) => cell === player).length;
  const emptyCount = window.filter((cell) => cell === null).length;
  const opponentCount = window.filter((cell) => cell === opponent).length;

  if (playerCount === 4) {
    score += 10000;
  } else if (playerCount === 3 && emptyCount === 1) {
    score += 100;
  } else if (playerCount === 2 && emptyCount === 2) {
    score += 10;
  }

  if (opponentCount === 3 && emptyCount === 1) {
    score -= 150; // heavily penalize opponent having 3-in-a-row
  } else if (opponentCount === 4) {
    score -= 10000;
  }

  return score;
}

function scorePosition(board: BoardState, player: Player): number {
  let score = 0;

  // Center column preference (index 3)
  const centerArray = [
    board[0][3],
    board[1][3],
    board[2][3],
    board[3][3],
    board[4][3],
    board[5][3],
  ];
  const centerCount = centerArray.filter((c) => c === player).length;
  score += centerCount * 12;

  // Horizontal evaluation
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      const window = [board[r][c], board[r][c + 1], board[r][c + 2], board[r][c + 3]];
      score += evaluateWindow(window, player);
    }
  }

  // Vertical evaluation
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r <= ROWS - 4; r++) {
      const window = [board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c]];
      score += evaluateWindow(window, player);
    }
  }

  // Positive diagonal (\)
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      const window = [
        board[r][c],
        board[r + 1][c + 1],
        board[r + 2][c + 2],
        board[r + 3][c + 3],
      ];
      score += evaluateWindow(window, player);
    }
  }

  // Negative diagonal (/)
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      const window = [
        board[r][c],
        board[r - 1][c + 1],
        board[r - 2][c + 2],
        board[r - 3][c + 3],
      ];
      score += evaluateWindow(window, player);
    }
  }

  return score;
}

function getValidLocations(board: BoardState): number[] {
  // Order columns from center outwards for alpha-beta efficiency: [3, 2, 4, 1, 5, 0, 6]
  const columnOrder = [3, 2, 4, 1, 5, 0, 6];
  return columnOrder.filter((col) => isValidMove(board, col));
}

function minimax(
  board: BoardState,
  depth: number,
  alpha: number,
  beta: number,
  maximizingPlayer: boolean
): { column: number; score: number } {
  const win = checkWin(board);
  const validLocations = getValidLocations(board);
  const isTerminal = win !== null || validLocations.length === 0;

  if (isTerminal) {
    if (win) {
      if (win.winner === CPU_PLAYER) {
        return { column: -1, score: 10000000 };
      } else {
        return { column: -1, score: -10000000 };
      }
    } else {
      return { column: -1, score: 0 }; // Tie
    }
  }

  if (depth === 0) {
    return { column: -1, score: scorePosition(board, CPU_PLAYER) };
  }

  if (maximizingPlayer) {
    let value = -Infinity;
    let bestCol = validLocations[0];

    for (const col of validLocations) {
      const row = getLowestEmptyRow(board, col);
      board[row][col] = CPU_PLAYER;
      const result = minimax(board, depth - 1, alpha, beta, false);
      board[row][col] = null; // undo

      if (result.score > value) {
        value = result.score;
        bestCol = col;
      }
      alpha = Math.max(alpha, value);
      if (alpha >= beta) {
        break; // Alpha-beta cutoff
      }
    }
    return { column: bestCol, score: value };
  } else {
    let value = Infinity;
    let bestCol = validLocations[0];

    for (const col of validLocations) {
      const row = getLowestEmptyRow(board, col);
      board[row][col] = HUMAN_PLAYER;
      const result = minimax(board, depth - 1, alpha, beta, true);
      board[row][col] = null; // undo

      if (result.score < value) {
        value = result.score;
        bestCol = col;
      }
      beta = Math.min(beta, value);
      if (alpha >= beta) {
        break; // Alpha-beta cutoff
      }
    }
    return { column: bestCol, score: value };
  }
}

export function getCpuMove(board: BoardState): number {
  const validLocations = getValidLocations(board);
  if (validLocations.length === 0) return -1;

  // 1. Immediate Win: Can CPU win in one move?
  for (const col of validLocations) {
    const row = getLowestEmptyRow(board, col);
    board[row][col] = CPU_PLAYER;
    const win = checkWin(board);
    board[row][col] = null;
    if (win && win.winner === CPU_PLAYER) {
      return col;
    }
  }

  // 2. Immediate Block: Can opponent win in one move? Block it!
  for (const col of validLocations) {
    const row = getLowestEmptyRow(board, col);
    board[row][col] = HUMAN_PLAYER;
    const win = checkWin(board);
    board[row][col] = null;
    if (win && win.winner === HUMAN_PLAYER) {
      return col;
    }
  }

  // 3. Minimax depth 4 with Alpha-Beta
  const { column } = minimax(board, 4, -Infinity, Infinity, true);
  return column !== -1 ? column : validLocations[0];
}
