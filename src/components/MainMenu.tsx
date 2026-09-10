import React from 'react';
import { ASSETS } from '../constants';
import { GameMode } from '../types';
import { sounds } from '../utils/audio';

interface MainMenuProps {
  onStartGame: (mode: GameMode) => void;
  onOpenRules: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, onOpenRules }) => {
  return (
    <div className="min-h-screen w-full bg-[#5C2DD5] flex items-center justify-center p-4">
      <main className="w-full max-w-[335px] md:max-w-[480px] bg-[#7945FF] border-[3px] border-black rounded-[40px] shadow-[0px_10px_0px_0px_#000000] px-5 md:px-10 py-14 md:py-16 select-none flex flex-col items-center">
        {/* Logo */}
        <div className="mb-14 md:mb-16">
          <img
            src={ASSETS.logo}
            alt="Connect Four Logo"
            className="w-[52px] h-[52px] object-contain drop-shadow-sm"
          />
        </div>

        {/* Buttons List */}
        <div className="w-full flex flex-col gap-6">
          {/* Play vs CPU (Bonus) */}
          <button
            onClick={() => {
              sounds.playClick();
              onStartGame('cpu');
            }}
            className="w-full h-[72px] bg-[#FD6687] hover:border-[#5C2DD5] hover:shadow-[0px_10px_0px_0px_#5C2DD5] border-[3px] border-black rounded-[20px] shadow-[0px_10px_0px_0px_#000000] px-5 flex items-center justify-between transition-all duration-150 cursor-pointer btn-press group focus:outline-none focus:ring-4 focus:ring-rose-400"
          >
            <span className="text-[20px] md:text-[24px] font-bold text-white uppercase tracking-normal">
              Play vs CPU
            </span>
            <img
              src={ASSETS.playerVsCpu}
              alt=""
              className="w-[82px] h-[46px] object-contain shrink-0"
              aria-hidden="true"
            />
          </button>

          {/* Play vs Player */}
          <button
            onClick={() => {
              sounds.playClick();
              onStartGame('player');
            }}
            className="w-full h-[72px] bg-[#FFCE67] hover:border-[#5C2DD5] hover:shadow-[0px_10px_0px_0px_#5C2DD5] border-[3px] border-black rounded-[20px] shadow-[0px_10px_0px_0px_#000000] px-5 flex items-center justify-between transition-all duration-150 cursor-pointer btn-press group focus:outline-none focus:ring-4 focus:ring-amber-300"
          >
            <span className="text-[20px] md:text-[24px] font-bold text-black uppercase tracking-normal">
              Play vs Player
            </span>
            <img
              src={ASSETS.playerVsPlayer}
              alt=""
              className="w-[82px] h-[46px] object-contain shrink-0"
              aria-hidden="true"
            />
          </button>

          {/* Game Rules */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenRules();
            }}
            className="w-full h-[72px] bg-white hover:border-[#5C2DD5] hover:shadow-[0px_10px_0px_0px_#5C2DD5] border-[3px] border-black rounded-[20px] shadow-[0px_10px_0px_0px_#000000] px-5 flex items-center justify-between transition-all duration-150 cursor-pointer btn-press group focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            <span className="text-[20px] md:text-[24px] font-bold text-black uppercase tracking-normal">
              Game Rules
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};
