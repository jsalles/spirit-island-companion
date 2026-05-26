/**
 * Final Girl App Content — Routes between FG views
 */
import { useFinalGirl } from '@/contexts/FinalGirlContext';
import FGHome from './FGHome';
import FGSetup from './FGSetup';
import FGSession from './FGSession';
import FGHistory from './FGHistory';
import FGRules from './FGRules';
import FGFilms from './FGFilms';

interface FGAppContentProps {
  onBack: () => void;
}

export default function FGAppContent({ onBack }: FGAppContentProps) {
  const { state } = useFinalGirl();

  return (
    <>
      {state.view === 'home' && <FGHome onBack={onBack} />}
      {state.view === 'setup' && <FGSetup />}
      {state.view === 'session' && <FGSession />}
      {state.view === 'history' && <FGHistory />}
      {state.view === 'rules' && <FGRules />}
      {state.view === 'films' && <FGFilms />}
    </>
  );
}
