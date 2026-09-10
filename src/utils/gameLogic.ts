import { ROWS, COLS } from '../constants';
import { BoardState, WinInfo } from '../types';

export function createEmptyBoard(): BoardState {
  return Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => null));
}

export function getLowestEmptyRow(board: BoardState, col: number): number {
  if (col < 0 || col >= COLS) return -1;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === null) {
      return r;
    }
  }
  return -1;
}

export function isValidMove(board: BoardState, col: number): boolean {
  return col >= 0 && col < COLS && board[0][col] === null;
}

export function checkWin(board: BoardState): WinInfo | null {
  // Horizontal check (ROWS x (COLS - 3))
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      const player = board[r][c];
      if (
        player &&
        player === board[r][c + 1] &&
        player === board[r][c + 2] &&
        player === board[r][c + 3]
      ) {
        return {
          winner: player,
          winningCells: [
            [r, c],
            [r, c + 1],
            [r, c + 2],
            [r, c + 3],
          ],
        };
      }
    }
  }

  // Vertical check ((ROWS - 3) x COLS)
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r <= ROWS - 4; r++) {
      const player = board[r][c];
      if (
        player &&
        player === board[r + 1][c] &&
        player === board[r + 2][c] &&
        player === board[r + 3][c]
      ) {
        return {
          winner: player,
          winningCells: [
            [r, c],
            [r + 1, c],
            [r + 2, c],
            [r + 3, c],
          ],
        };
      }
    }
  }

  // Diagonal (down-right: \ )
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      const player = board[r][c];
      if (
        player &&
        player === board[r + 1][c + 1] &&
        player === board[r + 2][c + 2] &&
        player === board[r + 3][c + 3]
      ) {
        return {
          winner: player,
          winningCells: [
            [r, c],
            [r + 1, c + 1],
            [r + 2, c + 2],
            [r + 3, c + 3],
          ],
        };
      }
    }
  }

  // Diagonal (up-right: / )
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      const player = board[r][c];
      if (
        player &&
        player === board[r - 1][c + 1] &&
        player === board[r - 2][c + 2] &&
        player === board[r - 3][c + 3]
      ) {
        return {
          winner: player,
          winningCells: [
            [r, c],
            [r - 1, c + 1],
            [r - 2, c + 2],
            [r - 3, c + 3],
          ],
        };
      }
    }
  }

  return null;
}

export function isBoardFull(board: BoardState): boolean {
  return board[0].every((cell) => cell !== null);
}
