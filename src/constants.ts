export const ROWS = 6;
export const COLS = 7;
export const TURN_TIME_LIMIT = 30; // 30 seconds

export const COLORS = {
  darkPurple: '#5C2DD5',
  purple: '#7945FF',
  red: '#FD6687',
  yellow: '#FFCE67',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const ASSETS = {
  logo: '/assets/images/logo.svg',
  playerVsPlayer: '/assets/images/player-vs-player.svg',
  playerVsCpu: '/assets/images/player-vs-cpu.svg',
  checkIcon: '/assets/images/icon-check.svg',
  playerOne: '/assets/images/player-one.svg',
  playerTwo: '/assets/images/player-two.svg',
  you: '/assets/images/you.svg',
  cpu: '/assets/images/cpu.svg',
  boardBlackLarge: '/assets/images/board-layer-black-large.svg',
  boardWhiteLarge: '/assets/images/board-layer-white-large.svg',
  boardBlackSmall: '/assets/images/board-layer-black-small.svg',
  boardWhiteSmall: '/assets/images/board-layer-white-small.svg',
  markerRed: '/assets/images/marker-red.svg',
  markerYellow: '/assets/images/marker-yellow.svg',
  turnBgRed: '/assets/images/turn-background-red.svg',
  turnBgYellow: '/assets/images/turn-background-yellow.svg',
} as const;
