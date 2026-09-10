import React from 'react';
import { ASSETS } from '../constants';
import { Player } from '../types';

interface ColumnMarkerProps {
  hoveredCol: number | null;
  turn: Player;
  isDesktopOrTablet: boolean;
}

export const ColumnMarker: React.FC<ColumnMarkerProps> = ({
  hoveredCol,
  turn,
  isDesktopOrTablet,
}) => {
  if (hoveredCol === null || hoveredCol < 0 || hoveredCol > 6) {
    return null;
  }

  // Column center offsets:
  // Large board (632px wide):
  // X centers: 52, 140, 228, 316, 404, 492, 580.
  // Marker width is 38px, so center aligns at center - 19px:
  // col * 88 + 52 - 19 = col * 88 + 33px.
  //
  // Small board (335px wide):
  // X centers: 27.5, 74.1, 120.7, 167.3, 214.0, 260.6, 307.2
  // Center - 19px:
  const leftPos = isDesktopOrTablet
    ? hoveredCol * 88 + 33
    : hoveredCol * 46.6 + 8.5;

  const markerSrc = turn === 'red' ? ASSETS.markerRed : ASSETS.markerYellow;

  return (
    <div
      className="absolute -top-[38px] z-30 pointer-events-none transition-all duration-150 ease-out hidden md:block"
      style={{
        left: `${leftPos}px`,
      }}
      aria-hidden="true"
    >
      <img
        src={markerSrc}
        alt="Active column marker"
        className="w-[38px] h-[36px] object-contain animate-bounce-marker"
      />
    </div>
  );
};
