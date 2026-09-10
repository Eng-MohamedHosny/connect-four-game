import React, { useEffect } from 'react';
import { sounds } from '../../utils/audio';

interface PauseModalProps {
  isOpen: boolean;
  onResume: () => void;
  onRestart: () => void;
  onQuit: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  isOpen,
  onResume,
  onRestart,
  onQuit,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sounds.playClick();
        onResume();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onResume]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pause-title"
    >
      <div className="w-full max-w-[335px] md:max-w-[480px] bg-[#7945FF] border-[3px] border-black rounded-[40px] shadow-[0px_10px_0px_0px_#000000] px-5 md:px-10 py-10 md:py-12 select-none flex flex-col items-center gap-6">
        {/* Title */}
        <h2
          id="pause-title"
          className="text-[56px] font-bold text-center text-white uppercase tracking-normal"
        >
          Pause
        </h2>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-5">
          {/* Continue Game */}
          <button
            onClick={() => {
              sounds.playClick();
              onResume();
            }}
            className="w-full h-[72px] bg-white hover:border-[#5C2DD5] hover:shadow-[0px_10px_0px_0px_#5C2DD5] border-[3px] border-black rounded-[20px] shadow-[0px_10px_0px_0px_#000000] text-black text-[20px] md:text-[24px] font-bold uppercase transition-all duration-150 cursor-pointer btn-press focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            Continue Game
          </button>

          {/* Restart */}
          <button
            onClick={() => {
              sounds.playClick();
              onRestart();
            }}
            className="w-full h-[72px] bg-white hover:border-[#5C2DD5] hover:shadow-[0px_10px_0px_0px_#5C2DD5] border-[3px] border-black rounded-[20px] shadow-[0px_10px_0px_0px_#000000] text-black text-[20px] md:text-[24px] font-bold uppercase transition-all duration-150 cursor-pointer btn-press focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            Restart
          </button>

          {/* Quit Game */}
          <button
            onClick={() => {
              sounds.playClick();
              onQuit();
            }}
            className="w-full h-[72px] bg-[#FD6687] hover:border-[#5C2DD5] hover:shadow-[0px_10px_0px_0px_#5C2DD5] border-[3px] border-black rounded-[20px] shadow-[0px_10px_0px_0px_#000000] text-white text-[20px] md:text-[24px] font-bold uppercase transition-all duration-150 cursor-pointer btn-press focus:outline-none focus:ring-4 focus:ring-rose-400"
          >
            Quit Game
          </button>
        </div>
      </div>
    </div>
  );
};
