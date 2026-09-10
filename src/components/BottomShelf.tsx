import React from 'react';
import { GameStatus, WinInfo } from '../types';

interface BottomShelfProps {
  gameStatus: GameStatus;
  winInfo: WinInfo | null;
}

export const BottomShelf: React.FC<BottomShelfProps> = ({ gameStatus, winInfo }) => {
  let bgColor = 'bg-[#5C2DD5]';

  if (gameStatus === 'won' && winInfo) {
    if (winInfo.winner === 'red') {
      bgColor = 'bg-[#FD6687]';
    } else if (winInfo.winner === 'yellow') {
      bgColor = 'bg-[#FFCE67]';
    }
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 w-full h-[236px] md:h-[234px] lg:h-[200px] ${bgColor} rounded-t-[60px] transition-colors duration-500 z-0 pointer-events-none`}
      aria-hidden="true"
    />
  );
};
