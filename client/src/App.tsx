import { Route, Switch, Redirect } from 'wouter';
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GameProvider } from "./contexts/GameContext";
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
import FGHome from './pages/final-girl/FGHome';
import FGSetup from './pages/final-girl/FGSetup';
import FGSession from './pages/final-girl/FGSession';
import FGHistory from './pages/final-girl/FGHistory';
import FGRules from './pages/final-girl/FGRules';
import FGFilms from './pages/final-girl/FGFilms';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Switch>
            <Route path="/landing" component={LandingPage} />

            <Route path="/spirit-island" nest>
              <GameProvider>
                <Particles count={25} />
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/setup" component={Setup} />
                  <Route path="/session" component={GameSession} />
                  <Route path="/history" component={History} />
                  <Route path="/rules" component={RulesReference} />
                  <Route path="/spirits" component={Spirits} />
                  <Route path="/adversaries" component={Adversaries} />
                  <Route path="/scenarios" component={Scenarios} />
                  <Route component={NotFound} />
                </Switch>
              </GameProvider>
            </Route>

            <Route path="/final-girl" nest>
              <FinalGirlProvider>
                <Switch>
                  <Route path="/" component={FGHome} />
                  <Route path="/setup" component={FGSetup} />
                  <Route path="/session" component={FGSession} />
                  <Route path="/history" component={FGHistory} />
                  <Route path="/rules" component={FGRules} />
                  <Route path="/films" component={FGFilms} />
                  <Route component={NotFound} />
                </Switch>
              </FinalGirlProvider>
            </Route>

            <Route path="/"><Redirect to="/landing" /></Route>
            <Route component={NotFound} />
          </Switch>
          <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
