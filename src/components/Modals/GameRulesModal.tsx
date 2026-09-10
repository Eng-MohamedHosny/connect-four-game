import React, { useEffect } from 'react';
import { sounds } from '../../utils/audio';

interface GameRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GameRulesModal: React.FC<GameRulesModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sounds.playClick();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rules-title"
    >
      <div className="relative w-full max-w-[480px] bg-white border-[3px] border-black rounded-[40px] shadow-[0px_10px_0px_0px_#000000] px-6 sm:px-10 pt-8 pb-14 select-none">
        {/* Rules Title */}
        <h2
          id="rules-title"
          className="text-[56px] font-bold text-center text-black uppercase leading-tight tracking-normal mb-6"
        >
          Rules
        </h2>

        {/* Objective */}
        <div className="mb-6">
          <h3 className="text-[20px] font-bold text-[#7945FF] uppercase tracking-wider mb-2">
            Objective
          </h3>
          <p className="text-[16px] font-medium text-black/70 leading-relaxed">
            Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally).
          </p>
        </div>

        {/* How to Play */}
        <div>
          <h3 className="text-[20px] font-bold text-[#7945FF] uppercase tracking-wider mb-3">
            How to Play
          </h3>
          <ol className="space-y-2.5">
            {[
              'Red goes first in the first game.',
              'Players must alternate turns, and only one disc can be dropped in each turn.',
              'The game ends when there is a 4-in-a-row or a stalemate.',
              'The starter of the previous game goes second on the next game.',
            ].map((step, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="text-[16px] font-bold text-black shrink-0 w-4 text-center">
                  {idx + 1}
                </span>
                <span className="text-[16px] font-medium text-black/70 leading-snug">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Checkmark Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          aria-label="Confirm and close rules"
          className="group absolute -bottom-[32px] left-1/2 -translate-x-1/2 w-[64px] h-[64px] rounded-full bg-[#FD6687] border-[3px] border-black shadow-[0px_5px_0px_0px_#000000] hover:border-[#5C2DD5] hover:shadow-[0px_5px_0px_0px_#5C2DD5] transition-all duration-150 flex items-center justify-center cursor-pointer btn-press focus:outline-none focus:ring-4 focus:ring-purple-400"
        >
          <svg
            width="34"
            height="24"
            viewBox="0 0 34 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <polyline
              stroke="#FFFFFF"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="3 13 13 21 31 3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
