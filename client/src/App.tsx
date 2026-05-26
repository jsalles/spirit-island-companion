import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GameProvider, useGame } from "./contexts/GameContext";
import { FinalGirlProvider } from "./contexts/FinalGirlContext";
import Particles from "./components/Particles";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Setup from "./pages/Setup";
import GameSession from "./pages/GameSession";
import History from './pages/History';
import RulesReference from './pages/RulesReference';
import Spirits from './pages/Spirits';
import Adversaries from './pages/Adversaries';
import Scenarios from './pages/Scenarios';
import FGAppContent from './pages/final-girl/FGAppContent';

type ActiveGame = 'none' | 'spirit-island' | 'final-girl';

const GAME_STORAGE_KEY = 'active-game-selection';

function SpiritIslandContent({ onBack }: { onBack: () => void }) {
  const { state } = useGame();

  return (
    <>
      <Particles count={25} />
      {state.view === 'home' && <Home onBack={onBack} />}
      {state.view === 'setup' && <Setup />}
      {state.view === 'session' && <GameSession />}
      {state.view === 'history' && <History />}
      {state.view === 'rules' && <RulesReference />}
      {state.view === 'spirits' && <Spirits />}
      {state.view === 'adversaries' && <Adversaries />}
      {state.view === 'scenarios' && <Scenarios />}
    </>
  );
}

function App() {
  const [activeGame, setActiveGame] = useState<ActiveGame>(() => {
    const saved = localStorage.getItem(GAME_STORAGE_KEY);
    return (saved as ActiveGame) || 'none';
  });

  useEffect(() => {
    localStorage.setItem(GAME_STORAGE_KEY, activeGame);
  }, [activeGame]);

  const handleSelectGame = (game: 'spirit-island' | 'final-girl') => {
    setActiveGame(game);
  };

  const handleBackToLanding = () => {
    setActiveGame('none');
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          {activeGame === 'none' && (
            <LandingPage onSelectGame={handleSelectGame} />
          )}
          {activeGame === 'spirit-island' && (
            <GameProvider>
              <SpiritIslandContent onBack={handleBackToLanding} />
            </GameProvider>
          )}
          {activeGame === 'final-girl' && (
            <FinalGirlProvider>
              <FGAppContent onBack={handleBackToLanding} />
            </FinalGirlProvider>
          )}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
