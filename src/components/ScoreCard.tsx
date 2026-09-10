import React from 'react';
import { ASSETS } from '../constants';
import { GameMode, Player } from '../types';

interface ScoreCardProps {
  player: Player;
  gameMode: GameMode;
  score: number;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ player, gameMode, score }) => {
  const isPlayer1 = player === 'red';

  let name = '';
  let avatarSrc = '';

  if (gameMode === 'cpu') {
    name = isPlayer1 ? 'YOU' : 'CPU';
    avatarSrc = isPlayer1 ? ASSETS.you : ASSETS.cpu;
  } else {
    name = isPlayer1 ? 'PLAYER 1' : 'PLAYER 2';
    avatarSrc = isPlayer1 ? ASSETS.playerOne : ASSETS.playerTwo;
  }

  return (
    <div
      className={`relative bg-white border-[3px] border-black rounded-[20px] shadow-[0px_10px_0px_0px_#000000]
        /* Desktop: Vertical card */
        lg:w-[141px] lg:h-[160px] lg:flex-col lg:justify-center lg:items-center lg:pt-4
        /* Tablet: Horizontal card */
        md:w-[272px] md:h-[100px] md:flex md:items-center md:justify-between md:px-6
        /* Mobile: Compact horizontal card */
        w-[142px] h-[81px] flex flex-col items-center justify-center pt-2
        select-none transition-all duration-200`}
    >
      {/* Avatar Icon */}
      <div
        className={`absolute 
          /* Desktop: Top centered */
          lg:-top-[27px] lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-0
          /* Tablet: Outer edge */
          md:top-1/2 md:-translate-y-1/2 md:translate-x-0 ${isPlayer1 ? 'md:-left-[27px]' : 'md:-right-[27px]'}
          /* Mobile: Top centered */
          -top-[24px] left-1/2 -translate-x-1/2
          w-[54px] h-[59px] z-10 flex items-center justify-center`}
      >
        <img
          src={avatarSrc}
          alt={`${name} Avatar`}
          className="w-[54px] h-[59px] object-contain drop-shadow-sm"
        />
      </div>

      {/* Label and Score Content */}
      <div
        className={`flex 
          lg:flex-col lg:items-center lg:text-center
          md:flex-col ${isPlayer1 ? 'md:items-start md:text-left md:pl-4' : 'md:items-end md:text-right md:pr-4'}
          flex-col items-center text-center`}
      >
        <span className="text-[16px] md:text-[20px] font-bold text-black tracking-wide leading-none uppercase">
          {name}
        </span>
        <span className="text-[32px] md:text-[56px] font-bold text-black leading-none mt-1">
          {score}
        </span>
      </div>
    </div>
  );
};
