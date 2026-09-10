import React from 'react';
import { ASSETS } from '../constants';
import { sounds } from '../utils/audio';

interface HeaderProps {
  onMenuClick: () => void;
  onRestartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, onRestartClick }) => {
  return (
    <header className="w-full max-w-[632px] mx-auto flex items-center justify-between px-4 sm:px-0 py-2 sm:py-4">
      {/* Menu Button */}
      <button
        onClick={() => {
          sounds.playClick();
          onMenuClick();
        }}
        aria-label="Open pause menu"
        className="h-[39px] px-5 rounded-full bg-[#5C2DD5] hover:bg-[#FD6687] text-white text-[16px] font-bold uppercase transition-all duration-150 cursor-pointer shadow-sm btn-press focus:outline-none focus:ring-4 focus:ring-white/50"
      >
        Menu
      </button>

      {/* Game Logo */}
      <img
        src={ASSETS.logo}
        alt="Connect Four Logo"
        className="w-[40px] sm:w-[52px] h-[40px] sm:h-[52px] object-contain select-none"
      />

      {/* Restart Button */}
      <button
        onClick={() => {
          sounds.playClick();
          onRestartClick();
        }}
        aria-label="Restart current game"
        className="h-[39px] px-5 rounded-full bg-[#5C2DD5] hover:bg-[#FD6687] text-white text-[16px] font-bold uppercase transition-all duration-150 cursor-pointer shadow-sm btn-press focus:outline-none focus:ring-4 focus:ring-white/50"
      >
        Restart
      </button>
    </header>
  );
};
