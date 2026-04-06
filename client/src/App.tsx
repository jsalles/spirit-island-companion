import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GameProvider, useGame } from "./contexts/GameContext";
import Particles from "./components/Particles";
import Home from "./pages/Home";
import Setup from "./pages/Setup";
import GameSession from "./pages/GameSession";
import History from './pages/History';
import RulesReference from './pages/RulesReference';

function AppContent() {
  const { state } = useGame();

  return (
    <>
      <Particles count={25} />
      {state.view === 'home' && <Home />}
      {state.view === 'setup' && <Setup />}
      {state.view === 'session' && <GameSession />}
      {state.view === 'history' && <History />}
      {state.view === 'rules' && <RulesReference />}
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <GameProvider>
            <AppContent />
          </GameProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
