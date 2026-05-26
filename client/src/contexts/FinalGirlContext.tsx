import { createContext, useContext, useReducer, useCallback } from 'react';
import { nanoid } from 'nanoid';
import type { FGSessionData } from '@/lib/finalGirlData';

interface FGState {
  currentSession: FGSessionData | null;
  sessionHistory: FGSessionData[];
  setupStep: number;
  setupChecklist: Record<string, boolean>;
  currentPhaseIndex: number;
  currentTurn: number;
  ownedFilms: string[];
}

type FGAction =
  | { type: 'START_NEW_SESSION'; session: Partial<FGSessionData> }
  | { type: 'UPDATE_SESSION'; updates: Partial<FGSessionData> }
  | { type: 'SET_SETUP_STEP'; step: number }
  | { type: 'TOGGLE_CHECKLIST'; itemId: string }
  | { type: 'COMPLETE_SETUP' }
  | { type: 'SET_PHASE'; index: number }
  | { type: 'NEXT_TURN' }
  | { type: 'END_SESSION'; result: 'win' | 'loss'; scoreData?: Partial<FGSessionData> }
  | { type: 'LOAD_HISTORY' }
  | { type: 'CLEAR_SESSION' }
  | { type: 'SET_OWNED_FILMS'; films: string[] }
  | { type: 'IMPORT_SESSIONS'; sessions: FGSessionData[] };

const STORAGE_KEY = 'final-girl-sessions';
const OWNED_FILMS_KEY = 'final-girl-owned-films';

function loadHistory(): FGSessionData[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveHistory(sessions: FGSessionData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function loadOwnedFilms(): string[] {
  try {
    const data = localStorage.getItem(OWNED_FILMS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveOwnedFilms(films: string[]) {
  localStorage.setItem(OWNED_FILMS_KEY, JSON.stringify(films));
}

const initialState: FGState = {
  currentSession: null,
  sessionHistory: loadHistory(),
  setupStep: 0,
  setupChecklist: {},
  currentPhaseIndex: 0,
  currentTurn: 1,
  ownedFilms: loadOwnedFilms(),
};

function fgReducer(state: FGState, action: FGAction): FGState {
  switch (action.type) {
    case 'START_NEW_SESSION': {
      const session: FGSessionData = {
        id: nanoid(),
        date: new Date().toISOString(),
        result: 'in-progress',
        killer: '',
        location: '',
        finalGirl: '',
        turnCount: 0,
        victimsKilled: 0,
        victimsSaved: 0,
        finaleRevealed: false,
        darkPowerRevealed: false,
        notes: '',
        difficulty: 'normal',
        featureFilms: [...state.ownedFilms],
        ...action.session,
      };
      return {
        ...state,
        currentSession: session,
        setupStep: 0,
        setupChecklist: {},
        currentPhaseIndex: 0,
        currentTurn: 1,
      };
    }

    case 'UPDATE_SESSION': {
      if (!state.currentSession) return state;
      return { ...state, currentSession: { ...state.currentSession, ...action.updates } };
    }

    case 'SET_SETUP_STEP':
      return { ...state, setupStep: action.step };

    case 'TOGGLE_CHECKLIST':
      return {
        ...state,
        setupChecklist: {
          ...state.setupChecklist,
          [action.itemId]: !state.setupChecklist[action.itemId],
        },
      };

    case 'COMPLETE_SETUP':
      return { ...state, currentPhaseIndex: 0, currentTurn: 1 };

    case 'SET_PHASE':
      return { ...state, currentPhaseIndex: action.index };

    case 'NEXT_TURN':
      return { ...state, currentTurn: state.currentTurn + 1, currentPhaseIndex: 0 };

    case 'END_SESSION': {
      if (!state.currentSession) return state;
      const ended: FGSessionData = {
        ...state.currentSession,
        result: action.result,
        turnCount: state.currentTurn,
        ...(action.scoreData || {}),
      };
      const history = [ended, ...state.sessionHistory];
      saveHistory(history);
      return {
        ...state,
        currentSession: ended,
        sessionHistory: history,
      };
    }

    case 'LOAD_HISTORY':
      return { ...state, sessionHistory: loadHistory() };

    case 'CLEAR_SESSION':
      return {
        ...state,
        currentSession: null,
        setupStep: 0,
        setupChecklist: {},
        currentPhaseIndex: 0,
        currentTurn: 1,
      };

    case 'SET_OWNED_FILMS': {
      saveOwnedFilms(action.films);
      return { ...state, ownedFilms: action.films };
    }

    case 'IMPORT_SESSIONS': {
      const existingKeys = new Set(
        state.sessionHistory.map(s => `${s.date}-${s.killer}-${s.location}`)
      );
      const newSessions = action.sessions.filter(s => {
        const key = `${s.date}-${s.killer}-${s.location}`;
        return !existingKeys.has(key);
      });
      const merged = [...newSessions, ...state.sessionHistory].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      saveHistory(merged);
      return { ...state, sessionHistory: merged };
    }

    default:
      return state;
  }
}

interface FGContextType {
  state: FGState;
  dispatch: React.Dispatch<FGAction>;
  startNewSession: () => void;
  updateSession: (updates: Partial<FGSessionData>) => void;
}

const FGContext = createContext<FGContextType | null>(null);

export function FinalGirlProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(fgReducer, initialState);

  const startNewSession = useCallback(() => {
    dispatch({ type: 'START_NEW_SESSION', session: {} });
  }, []);

  const updateSession = useCallback((updates: Partial<FGSessionData>) => {
    dispatch({ type: 'UPDATE_SESSION', updates });
  }, []);

  return (
    <FGContext.Provider value={{ state, dispatch, startNewSession, updateSession }}>
      {children}
    </FGContext.Provider>
  );
}

export function useFinalGirl() {
  const ctx = useContext(FGContext);
  if (!ctx) throw new Error('useFinalGirl must be used within FinalGirlProvider');
  return ctx;
}
