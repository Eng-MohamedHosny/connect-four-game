import React from 'react';
import { ASSETS } from '../constants';
import { GameMode, GameStatus, Player, WinInfo } from '../types';
import { sounds } from '../utils/audio';

interface TurnIndicatorProps {
  turn: Player;
  gameMode: GameMode;
  timeLeft: number;
  gameStatus: GameStatus;
  winInfo: WinInfo | null;
  onPlayAgain: () => void;
}

export const TurnIndicator: React.FC<TurnIndicatorProps> = ({
  turn,
  gameMode,
  timeLeft,
  gameStatus,
  winInfo,
  onPlayAgain,
}) => {
  // If game is won or ended in draw
  if (gameStatus === 'won' || gameStatus === 'draw') {
    let winnerName = '';
    if (gameStatus === 'draw') {
      winnerName = 'STALEMATE';
    } else if (winInfo) {
      if (gameMode === 'cpu') {
        winnerName = winInfo.winner === 'red' ? 'YOU' : 'CPU';
      } else {
        winnerName = winInfo.winner === 'red' ? 'PLAYER 1' : 'PLAYER 2';
      }
    }

    return (
      <div className="relative -mt-[45px] sm:-mt-[55px] z-40 flex flex-col items-center">
        <div className="w-[285px] bg-white border-[3px] border-black rounded-[20px] shadow-[0px_10px_0px_0px_#000000] px-8 py-4 flex flex-col items-center justify-center text-center select-none animate-scale-up">
          <span className="text-[16px] font-bold text-black uppercase tracking-wider">
            {winnerName}
          </span>
          <span className="text-[56px] font-bold text-black uppercase leading-tight -mt-1 mb-2">
            {gameStatus === 'draw' ? 'DRAW' : 'WINS'}
          </span>
          <button
            onClick={() => {
              sounds.playClick();
              onPlayAgain();
            }}
            className="h-[39px] px-5 rounded-full bg-[#5C2DD5] hover:bg-[#FD6687] text-white text-[16px] font-bold uppercase transition-all duration-150 cursor-pointer shadow-sm btn-press focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  // Active playing turn badge
  const isRed = turn === 'red';
  let turnLabel = '';
  if (gameMode === 'cpu') {
    turnLabel = isRed ? "YOUR TURN" : "CPU'S TURN";
  } else {
    turnLabel = isRed ? "PLAYER 1'S TURN" : "PLAYER 2'S TURN";
  }

  const bgSvg = isRed ? ASSETS.turnBgRed : ASSETS.turnBgYellow;
  const textColor = isRed ? 'text-white' : 'text-black';

  return (
    <div className="relative -mt-[35px] sm:-mt-[45px] z-40 flex flex-col items-center select-none pointer-events-none">
      <div className="relative w-[191px] h-[150px] sm:w-[197px] sm:h-[165px] flex flex-col items-center justify-center pt-8">
        {/* Background SVG */}
        <img
          src={bgSvg}
          alt=""
          className="absolute inset-0 w-full h-full object-contain -z-10 drop-shadow-sm"
          aria-hidden="true"
        />

        {/* Turn Label */}
        <span
          className={`text-[14px] sm:text-[16px] font-bold uppercase tracking-wider ${textColor} leading-tight`}
        >
          {turnLabel}
        </span>

        {/* Countdown Timer */}
        <span
          className={`text-[44px] sm:text-[56px] font-bold ${textColor} leading-none mt-1`}
        >
          {timeLeft}s
        </span>
      </div>
    </div>
  );
};
