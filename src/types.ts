export type Player = 'red' | 'yellow';

export type Cell = Player | null;

export type BoardState = Cell[][]; // 6 rows x 7 cols

export type Coordinate = [number, number]; // [row, col]

export type GameMode = 'player' | 'cpu';

export type Screen = 'menu' | 'game';

export type GameStatus = 'playing' | 'paused' | 'won' | 'draw';

export interface WinInfo {
  winner: Player;
  winningCells: Coordinate[];
}

export interface Score {
  player1: number;
  player2: number;
}
