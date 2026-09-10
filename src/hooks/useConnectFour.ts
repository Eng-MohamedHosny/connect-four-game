import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { BoardState, Coordinate, GameMode, GameStatus, Player, Score, WinInfo } from '../types';
import { createEmptyBoard, getLowestEmptyRow, checkWin, isBoardFull, isValidMove } from '../utils/gameLogic';
import { getCpuMove } from '../utils/ai';
import { TURN_TIME_LIMIT } from '../constants';
import { sounds } from '../utils/audio';

export function useConnectFour() {
  const [board, setBoard] = useState<BoardState>(createEmptyBoard);
  const [gameMode, setGameMode] = useState<GameMode>('player');
  const [startingPlayer, setStartingPlayer] = useState<Player>('red');
  const [turn, setTurn] = useState<Player>('red');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [winInfo, setWinInfo] = useState<WinInfo | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(TURN_TIME_LIMIT);
  const [scores, setScores] = useState<Score>({ player1: 0, player2: 0 });
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [lastDropped, setLastDropped] = useState<{ row: number; col: number } | null>(null);
  const [isCpuThinking, setIsCpuThinking] = useState<boolean>(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Trigger win state
  const handleWin = useCallback((winner: Player, winningCells: Coordinate[] = []) => {
    setWinInfo({ winner, winningCells });
    setGameStatus('won');
    sounds.playWin();

    // Trigger confetti on win
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: winner === 'red' ? ['#FD6687', '#FFCE67', '#5C2DD5'] : ['#FFCE67', '#FD6687', '#5C2DD5'],
      });
    } catch {
      // Ignore confetti error
    }

    setScores((prev) => ({
      player1: winner === 'red' ? prev.player1 + 1 : prev.player1,
      player2: winner === 'yellow' ? prev.player2 + 1 : prev.player2,
    }));
  }, []);

  // Timer countdown
  useEffect(() => {
    if (gameStatus !== 'playing' || isCpuThinking) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time expired! The OTHER player wins
          const otherPlayer: Player = turn === 'red' ? 'yellow' : 'red';
          handleWin(otherPlayer, []);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus, turn, isCpuThinking, handleWin]);

  // Execute a move
  const executeMove = useCallback((col: number, currentPlayer: Player) => {
    if (!isValidMove(board, col)) return false;

    const row = getLowestEmptyRow(board, col);
    if (row === -1) return false;

    sounds.playDrop();
    setLastDropped({ row, col });

    const newBoard = board.map((r, rIdx) =>
      r.map((cell, cIdx) => (rIdx === row && cIdx === col ? currentPlayer : cell))
    );
    setBoard(newBoard);

    // Check for win
    const win = checkWin(newBoard);
    if (win) {
      handleWin(win.winner, win.winningCells);
      return true;
    }

    // Check for draw / stalemate
    if (isBoardFull(newBoard)) {
      setGameStatus('draw');
      return true;
    }

    // Next turn
    const nextPlayer: Player = currentPlayer === 'red' ? 'yellow' : 'red';
    setTurn(nextPlayer);
    setTimeLeft(TURN_TIME_LIMIT);
    return true;
  }, [board, handleWin]);

  // Human player move
  const playMove = useCallback((col: number) => {
    if (gameStatus !== 'playing' || isCpuThinking) return;
    if (gameMode === 'cpu' && turn === 'yellow') return; // Cannot play on CPU's turn

    executeMove(col, turn);
  }, [gameStatus, isCpuThinking, gameMode, turn, executeMove]);

  // CPU turn trigger
  useEffect(() => {
    if (gameMode === 'cpu' && turn === 'yellow' && gameStatus === 'playing') {
      setIsCpuThinking(true);
      const thinkTimer = setTimeout(() => {
        const cpuCol = getCpuMove(board);
        if (cpuCol !== -1) {
          executeMove(cpuCol, 'yellow');
        }
        setIsCpuThinking(false);
      }, 650);

      return () => clearTimeout(thinkTimer);
    }
  }, [gameMode, turn, gameStatus, board, executeMove]);

  // Play again / new round (keeps scores, alternates first starter)
  const resetRound = useCallback(() => {
    const nextStarter: Player = startingPlayer === 'red' ? 'yellow' : 'red';
    setStartingPlayer(nextStarter);
    setTurn(nextStarter);
    setBoard(createEmptyBoard());
    setWinInfo(null);
    setTimeLeft(TURN_TIME_LIMIT);
    setLastDropped(null);
    setGameStatus('playing');
    setIsCpuThinking(false);
  }, [startingPlayer]);

  // Restart game (resets board, scores, and starts fresh)
  const restartGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setScores({ player1: 0, player2: 0 });
    setStartingPlayer('red');
    setTurn('red');
    setWinInfo(null);
    setTimeLeft(TURN_TIME_LIMIT);
    setLastDropped(null);
    setGameStatus('playing');
    setIsCpuThinking(false);
  }, []);

  // Initialize new game session with a mode
  const initGame = useCallback((mode: GameMode) => {
    setGameMode(mode);
    setBoard(createEmptyBoard());
    setScores({ player1: 0, player2: 0 });
    setStartingPlayer('red');
    setTurn('red');
    setWinInfo(null);
    setTimeLeft(TURN_TIME_LIMIT);
    setLastDropped(null);
    setGameStatus('playing');
    setIsCpuThinking(false);
  }, []);

  const pauseGame = useCallback(() => {
    if (gameStatus === 'playing') {
      setGameStatus('paused');
    }
  }, [gameStatus]);

  const resumeGame = useCallback(() => {
    if (gameStatus === 'paused') {
      setGameStatus('playing');
    }
  }, [gameStatus]);

  return {
    board,
    gameMode,
    turn,
    gameStatus,
    winInfo,
    timeLeft,
    scores,
    hoveredCol,
    setHoveredCol,
    lastDropped,
    isCpuThinking,
    playMove,
    resetRound,
    restartGame,
    initGame,
    pauseGame,
    resumeGame,
  };
}
