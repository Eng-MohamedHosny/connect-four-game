import React, { useRef } from 'react';
import { ASSETS, COLS } from '../constants';
import { BoardState, Coordinate, Player } from '../types';
import { ColumnMarker } from './ColumnMarker';

interface BoardProps {
  board: BoardState;
  turn: Player;
  hoveredCol: number | null;
  onHoverCol: (col: number | null) => void;
  onColumnClick: (col: number) => void;
  winningCells: Coordinate[];
  lastDropped: { row: number; col: number } | null;
  isInteractive: boolean;
}

export const Board: React.FC<BoardProps> = ({
  board,
  turn,
  hoveredCol,
  onHoverCol,
  onColumnClick,
  winningCells,
  lastDropped,
  isInteractive,
}) => {
  const boardRef = useRef<HTMLDivElement>(null);

  const isWinningCell = (r: number, c: number) => {
    return winningCells.some(([winR, winC]) => winR === r && winC === c);
  };

  return (
    <div className="relative mx-auto flex flex-col items-center select-none" ref={boardRef}>
      {/* 
        ============================================================
        DESKTOP & TABLET BOARD (>= 768px: 632px x 584px)
        ============================================================
      */}
      <div className="hidden md:block relative w-[632px] h-[584px]">
        {/* Hover Column Marker */}
        {isInteractive && (
          <ColumnMarker
            hoveredCol={hoveredCol}
            turn={turn}
            isDesktopOrTablet={true}
          />
        )}

        {/* 1. Back Layer: Black board base with drop shadow */}
        <img
          src={ASSETS.boardBlackLarge}
          alt=""
          className="absolute top-0 left-0 w-[632px] h-[594px] pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* 2. Middle Layer: Discs (70x75 SVG with 64px disc) */}
        <div className="absolute top-0 left-0 w-[632px] h-[584px] z-10 pointer-events-none">
          {board.map((rowArr, rIdx) =>
            rowArr.map((cell, cIdx) => {
              if (!cell) return null;

              const isWinning = isWinningCell(rIdx, cIdx);
              const isLatest = lastDropped?.row === rIdx && lastDropped?.col === cIdx;
              const discSrc = cell === 'red' ? '/assets/images/counter-red-large.svg' : '/assets/images/counter-yellow-large.svg';

              // Centers: x = 52 + c * 88, y = 52 + r * 88
              // Disc SVG size: 70 x 75 (cx=35, cy=35).
              // Position top-left of disc: left = (52 - 35) + c * 88 = 17 + c * 88
              // top = (52 - 35) + r * 88 = 17 + r * 88
              const left = 17 + cIdx * 88;
              const top = 17 + rIdx * 88;

              return (
                <div
                  key={`disc-${rIdx}-${cIdx}`}
                  className={`absolute w-[70px] h-[75px] ${isLatest ? 'animate-drop' : ''}`}
                  style={{ left: `${left}px`, top: `${top}px` }}
                >
                  <img
                    src={discSrc}
                    alt=""
                    className="w-full h-full object-contain"
                    aria-hidden="true"
                  />

                  {/* Winning Disc White Ring Indicator */}
                  {isWinning && (
                    <div className="absolute top-[18px] left-[18px] w-[34px] h-[34px] rounded-full border-[6px] border-white z-20 pointer-events-none" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* 3. Front Layer: White Board with circular cutouts */}
        <img
          src={ASSETS.boardWhiteLarge}
          alt="Connect Four Board"
          className="absolute top-0 left-0 w-[632px] h-[584px] pointer-events-none z-20"
          aria-hidden="true"
        />

        {/* 4. Top Interactive Layer: 7 Column Hitboxes */}
        <div className="absolute top-0 left-0 w-[632px] h-[584px] z-30 flex">
          {Array.from({ length: COLS }).map((_, colIdx) => (
            <button
              key={`col-lg-${colIdx}`}
              disabled={!isInteractive}
              onClick={() => onColumnClick(colIdx)}
              onMouseEnter={() => onHoverCol(colIdx)}
              onMouseLeave={() => onHoverCol(null)}
              onFocus={() => onHoverCol(colIdx)}
              onBlur={() => onHoverCol(null)}
              aria-label={`Drop disc in column ${colIdx + 1}`}
              className="w-[88px] h-full cursor-pointer focus:outline-none disabled:cursor-not-allowed group"
            />
          ))}
        </div>
      </div>

      {/* 
        ============================================================
        MOBILE BOARD (< 768px: 335px x 310px)
        ============================================================
      */}
      <div className="md:hidden relative w-[335px] h-[310px]">
        {/* 1. Back Layer: Black board base */}
        <img
          src={ASSETS.boardBlackSmall}
          alt=""
          className="absolute top-0 left-0 w-[335px] h-[316px] pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* 2. Middle Layer: Small Discs */}
        <div className="absolute top-0 left-0 w-[335px] h-[310px] z-10 pointer-events-none">
          {board.map((rowArr, rIdx) =>
            rowArr.map((cell, cIdx) => {
              if (!cell) return null;

              const isWinning = isWinningCell(rIdx, cIdx);
              const isLatest = lastDropped?.row === rIdx && lastDropped?.col === cIdx;
              const discSrc = cell === 'red' ? '/assets/images/counter-red-small.svg' : '/assets/images/counter-yellow-small.svg';

              // Centers in 335x310 small board:
              // Centers: x = 27.5 + c * 46.65, y = 27.5 + r * 46.7
              // Disc SVG size: 41 x 44 (cx=20.5, cy=20.5)
              // top-left: left = (27.5 - 20.5) + c * 46.65 = 7 + c * 46.65
              // top = (27.5 - 20.5) + r * 46.7 = 7 + r * 46.7
              const left = 7 + cIdx * 46.65;
              const top = 7 + rIdx * 46.7;

              return (
                <div
                  key={`disc-sm-${rIdx}-${cIdx}`}
                  className={`absolute w-[41px] h-[44px] ${isLatest ? 'animate-drop' : ''}`}
                  style={{ left: `${left}px`, top: `${top}px` }}
                >
                  <img
                    src={discSrc}
                    alt=""
                    className="w-full h-full object-contain"
                    aria-hidden="true"
                  />

                  {/* Winning Disc White Ring Indicator */}
                  {isWinning && (
                    <div className="absolute top-[12px] left-[10px] w-[20px] h-[20px] rounded-full border-[4px] border-white z-20 pointer-events-none" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* 3. Front Layer: White Board Small */}
        <img
          src={ASSETS.boardWhiteSmall}
          alt="Connect Four Board"
          className="absolute top-0 left-0 w-[335px] h-[310px] pointer-events-none z-20"
          aria-hidden="true"
        />

        {/* 4. Top Interactive Layer: 7 Column Hitboxes */}
        <div className="absolute top-0 left-0 w-[335px] h-[310px] z-30 flex">
          {Array.from({ length: COLS }).map((_, colIdx) => (
            <button
              key={`col-sm-${colIdx}`}
              disabled={!isInteractive}
              onClick={() => onColumnClick(colIdx)}
              aria-label={`Drop disc in column ${colIdx + 1}`}
              className="w-[46.65px] h-full cursor-pointer focus:outline-none disabled:cursor-not-allowed"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
