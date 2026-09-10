import { useState } from 'react';
import { Screen, GameMode } from './types';
import { useConnectFour } from './hooks/useConnectFour';
import { MainMenu } from './components/MainMenu';
import { Header } from './components/Header';
import { ScoreCard } from './components/ScoreCard';
import { Board } from './components/Board';
import { TurnIndicator } from './components/TurnIndicator';
import { BottomShelf } from './components/BottomShelf';
import { GameRulesModal } from './components/Modals/GameRulesModal';
import { PauseModal } from './components/Modals/PauseModal';

export function App() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isPauseOpen, setIsPauseOpen] = useState(false);

  const {
    board,
    gameMode,
    turn,
    gameStatus,
    winInfo,
    timeLeft,
    scores,
    hoveredCol,
    setHoveredCol,
    lastDropped,
    isCpuThinking,
    playMove,
    resetRound,
    restartGame,
    initGame,
    pauseGame,
    resumeGame,
  } = useConnectFour();

  const handleStartGame = (mode: GameMode) => {
    initGame(mode);
    setScreen('game');
  };

  const handleOpenRules = () => {
    setIsRulesOpen(true);
  };

  const handleCloseRules = () => {
    setIsRulesOpen(false);
  };

  const handleOpenPause = () => {
    pauseGame();
    setIsPauseOpen(true);
  };

  const handleResumeGame = () => {
    resumeGame();
    setIsPauseOpen(false);
  };

  const handleRestartFromMenu = () => {
    restartGame();
    setIsPauseOpen(false);
  };

  const handleQuitGame = () => {
    setIsPauseOpen(false);
    setScreen('menu');
  };

  // Main Menu Screen
  if (screen === 'menu') {
    return (
      <>
        <MainMenu
          onStartGame={handleStartGame}
          onOpenRules={handleOpenRules}
        />
        <GameRulesModal
          isOpen={isRulesOpen}
          onClose={handleCloseRules}
        />
      </>
    );
  }

  // Game Playing Screen
  return (
    <div className="relative min-h-screen w-full bg-[#7945FF] overflow-x-hidden flex flex-col justify-between pb-8 sm:pb-12">
      {/* Background Bottom Shelf (transforms to winning color) */}
      <BottomShelf gameStatus={gameStatus} winInfo={winInfo} />

      {/* Main Game Content */}
      <div className="relative z-10 w-full max-w-[1140px] mx-auto px-4 pt-4 sm:pt-6 flex flex-col items-center">
        {/* Top Header */}
        <div className="w-full max-w-[632px] mb-6 sm:mb-8">
          <Header
            onMenuClick={handleOpenPause}
            onRestartClick={restartGame}
          />
        </div>

        {/* Tablet & Mobile: Score Cards Row (Above Board) */}
        <div className="w-full max-w-[632px] flex lg:hidden items-center justify-between gap-4 mb-8 sm:mb-10 px-2 sm:px-4">
          <ScoreCard
            player="red"
            gameMode={gameMode}
            score={scores.player1}
          />
          <ScoreCard
            player="yellow"
            gameMode={gameMode}
            score={scores.player2}
          />
        </div>

        {/* Desktop Layout: Score Cards flanking the Board */}
        <div className="w-full flex items-center justify-center lg:gap-14">
          {/* Desktop Player 1 Card */}
          <div className="hidden lg:block shrink-0">
            <ScoreCard
              player="red"
              gameMode={gameMode}
              score={scores.player1}
            />
          </div>

          {/* Connect Four Board Container */}
          <div className="flex flex-col items-center">
            <Board
              board={board}
              turn={turn}
              hoveredCol={hoveredCol}
              onHoverCol={setHoveredCol}
              onColumnClick={playMove}
              winningCells={winInfo?.winningCells || []}
              lastDropped={lastDropped}
              isInteractive={gameStatus === 'playing' && !isCpuThinking}
            />

            {/* Turn Indicator Badge or Winner Card */}
            <TurnIndicator
              turn={turn}
              gameMode={gameMode}
              timeLeft={timeLeft}
              gameStatus={gameStatus}
              winInfo={winInfo}
              onPlayAgain={resetRound}
            />
          </div>

          {/* Desktop Player 2 / CPU Card */}
          <div className="hidden lg:block shrink-0">
            <ScoreCard
              player="yellow"
              gameMode={gameMode}
              score={scores.player2}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <GameRulesModal
        isOpen={isRulesOpen}
        onClose={handleCloseRules}
      />

      <PauseModal
        isOpen={isPauseOpen}
        onResume={handleResumeGame}
        onRestart={handleRestartFromMenu}
        onQuit={handleQuitGame}
      />
    </div>
  );
}

export default App;
