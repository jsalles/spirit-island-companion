import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { nanoid } from 'nanoid';
import type { SessionData, PlayerData } from '@/lib/gameData';

type GameView = 'home' | 'setup' | 'session' | 'history' | 'rules' | 'spirits' | 'adversaries';

interface GameState {
  view: GameView;
  currentSession: SessionData | null;
  sessionHistory: SessionData[];
  setupStep: number;
  setupChecklist: Record<string, boolean>;
  currentPhaseIndex: number;
  currentTurn: number;
}

type GameAction =
  | { type: 'SET_VIEW'; view: GameView }
  | { type: 'START_NEW_SESSION'; session: Partial<SessionData> }
  | { type: 'UPDATE_SESSION'; updates: Partial<SessionData> }
  | { type: 'SET_SETUP_STEP'; step: number }
  | { type: 'TOGGLE_CHECKLIST'; itemId: string }
  | { type: 'COMPLETE_SETUP' }
  | { type: 'SET_PHASE'; index: number }
  | { type: 'NEXT_TURN' }
  | { type: 'END_SESSION'; result: 'win' | 'loss'; winCondition?: string; lossReason?: string }
  | { type: 'LOAD_HISTORY' }
  | { type: 'CLEAR_SESSION' };

const STORAGE_KEY = 'spirit-island-sessions';

function loadHistory(): SessionData[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveHistory(sessions: SessionData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

const initialState: GameState = {
  view: 'home',
  currentSession: null,
  sessionHistory: loadHistory(),
  setupStep: 0,
  setupChecklist: {},
  currentPhaseIndex: 0,
  currentTurn: 1,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, view: action.view };

    case 'START_NEW_SESSION': {
      const session: SessionData = {
        id: nanoid(),
        date: new Date().toISOString(),
        expansions: [],
        playerCount: 1,
        players: [{ name: 'Player 1', spirit: '', color: '#4CAF50' }],
        adversary: null,
        adversaryLevel: 0,
        scenario: null,
        blightCard: null,
        boards: [],
        useThematicBoards: false,
        useEventDeck: false,
        result: 'in-progress',
        winCondition: null,
        lossReason: null,
        notes: '',
        turnCount: 0,
        ...action.session,
      };
      return {
        ...state,
        currentSession: session,
        view: 'setup',
        setupStep: 0,
        setupChecklist: {},
        currentPhaseIndex: 0,
        currentTurn: 1,
      };
    }

    case 'UPDATE_SESSION': {
      if (!state.currentSession) return state;
      const updated = { ...state.currentSession, ...action.updates };
      // Adjust players array when playerCount changes
      if (action.updates.playerCount !== undefined) {
        const count = action.updates.playerCount;
        const existing = updated.players;
        if (count > existing.length) {
          const colors = ['#4CAF50', '#3A7BD5', '#E85D3A', '#F5C542', '#9B8EC4', '#E0E0E0'];
          for (let i = existing.length; i < count; i++) {
            existing.push({ name: `Player ${i + 1}`, spirit: '', color: colors[i] || '#4CAF50' });
          }
        } else if (count < existing.length) {
          existing.length = count;
        }
        updated.players = [...existing];
      }
      return { ...state, currentSession: updated };
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
      return {
        ...state,
        view: 'session',
        currentPhaseIndex: 0,
        currentTurn: 1,
      };

    case 'SET_PHASE':
      return { ...state, currentPhaseIndex: action.index };

    case 'NEXT_TURN':
      return {
        ...state,
        currentTurn: state.currentTurn + 1,
        currentPhaseIndex: 0,
      };

    case 'END_SESSION': {
      if (!state.currentSession) return state;
      const ended: SessionData = {
        ...state.currentSession,
        result: action.result,
        winCondition: action.winCondition || null,
        lossReason: action.lossReason || null,
        turnCount: state.currentTurn,
      };
      const history = [ended, ...state.sessionHistory];
      saveHistory(history);
      return {
        ...state,
        currentSession: ended,
        sessionHistory: history,
        view: 'home',
      };
    }

    case 'LOAD_HISTORY':
      return { ...state, sessionHistory: loadHistory() };

    case 'CLEAR_SESSION':
      return {
        ...state,
        currentSession: null,
        view: 'home',
        setupStep: 0,
        setupChecklist: {},
        currentPhaseIndex: 0,
        currentTurn: 1,
      };

    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  startNewSession: () => void;
  updateSession: (updates: Partial<SessionData>) => void;
  updatePlayer: (index: number, updates: Partial<PlayerData>) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startNewSession = useCallback(() => {
    dispatch({ type: 'START_NEW_SESSION', session: {} });
  }, []);

  const updateSession = useCallback((updates: Partial<SessionData>) => {
    dispatch({ type: 'UPDATE_SESSION', updates });
  }, []);

  const updatePlayer = useCallback((index: number, updates: Partial<PlayerData>) => {
    if (!state.currentSession) return;
    const players = [...state.currentSession.players];
    players[index] = { ...players[index], ...updates };
    dispatch({ type: 'UPDATE_SESSION', updates: { players } });
  }, [state.currentSession]);

  return (
    <GameContext.Provider value={{ state, dispatch, startNewSession, updateSession, updatePlayer }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
