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
      className={`relative bg-white border-[3px] border-black rounded-[20px] shadow-[0px_10px_0px_0px_#000000] select-none transition-all duration-200
        /* Desktop (lg: >= 1024px): Vertical card 141px x 160px */
        lg:w-[141px] lg:h-[160px] lg:flex lg:flex-col lg:items-center lg:justify-center lg:pt-4 lg:px-0

        /* Tablet (md: 768px - 1023px): Symmetrical horizontal card 272px x 100px */
        md:w-[272px] md:h-[100px] md:flex md:items-center md:justify-between
        ${isPlayer1 ? 'md:pl-11 md:pr-6' : 'md:pl-6 md:pr-11'}

        /* Mobile (< 768px): Compact horizontal card 142px x 81px */
        w-[142px] h-[81px] flex flex-col items-center justify-center
        ${isPlayer1 ? 'pl-4 pr-1' : 'pl-1 pr-4'}`}
    >
      {/* Avatar Icon:
          - Desktop: Top centered half-overlapping (-top-[27px])
          - Tablet: Outer edge (Player 1 left: -27px, Player 2 right: -27px)
          - Mobile: Outer edge (Player 1 left: -20px, Player 2 right: -20px)
      */}
      <div
        className={`absolute z-10 flex items-center justify-center
          /* Desktop */
          lg:top-[-27px] lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-0
          /* Tablet */
          md:top-1/2 md:-translate-y-1/2 md:translate-x-0
          ${isPlayer1 ? 'md:-left-[27px]' : 'md:-right-[27px]'}
          /* Mobile */
          top-1/2 -translate-y-1/2 translate-x-0
          ${isPlayer1 ? '-left-[20px]' : '-right-[20px]'}
          w-[44px] h-[48px] md:w-[54px] md:h-[59px]`}
      >
        <img
          src={avatarSrc}
          alt={`${name} Avatar`}
          className="w-full h-full object-contain drop-shadow-sm"
        />
      </div>

      {/* 
        Content Layout:
        - Desktop: Column centered (Name 20px, Score 56px)
        - Tablet:
            Player 1: [PLAYER 1 (20px)] on left, [SCORE (56px)] on right
            Player 2: [SCORE (56px)] on left, [PLAYER 2 (20px)] on right
        - Mobile: Column centered with offset for the side avatar
      */}
      {/* Desktop View */}
      <div className="hidden lg:flex flex-col items-center text-center">
        <span className="text-[20px] font-bold text-black uppercase tracking-normal leading-none">
          {name}
        </span>
        <span className="text-[56px] font-bold text-black leading-none mt-2">
          {score}
        </span>
      </div>

      {/* Tablet View (md to lg) */}
      <div className="hidden md:flex lg:hidden w-full items-center justify-between">
        {isPlayer1 ? (
          <>
            <span className="text-[20px] font-bold text-black uppercase tracking-normal">
              {name}
            </span>
            <span className="text-[56px] font-bold text-black leading-none">
              {score}
            </span>
          </>
        ) : (
          <>
            <span className="text-[56px] font-bold text-black leading-none">
              {score}
            </span>
            <span className="text-[20px] font-bold text-black uppercase tracking-normal">
              {name}
            </span>
          </>
        )}
      </div>

      {/* Mobile View (< md) */}
      <div className="flex md:hidden flex-col items-center justify-center text-center w-full">
        <span className="text-[16px] font-bold text-black uppercase tracking-normal leading-tight">
          {name}
        </span>
        <span className="text-[32px] font-bold text-black leading-none mt-0.5">
          {score}
        </span>
      </div>
    </div>
  );
};
