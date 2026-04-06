/*
 * History Page — "Living Island" Design
 * Shows past game sessions with win/loss records and statistics dashboard
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import {
  Trophy, Skull, ChevronLeft, Calendar, Users, Clock,
  Trash2, Play, BarChart3, List
} from 'lucide-react';
import type { SessionData } from '@/lib/gameData';
import StatsDashboard from '@/components/StatsDashboard';

const VICTORY_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663316422635/7or2XBJKrDChpLdNiLsCVc/victory-scene-oGukRmkQsiEXcNJnEsVrrj.webp';

const HEADING: React.CSSProperties = { fontFamily: "'Playfair Display', serif" };
const BODY: React.CSSProperties = { fontFamily: "'Source Serif 4', serif" };

export default function History() {
  const { state, dispatch, startNewSession } = useGame();
  const sessions = state.sessionHistory;
  const [tab, setTab] = useState<'stats' | 'sessions'>('stats');

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all session history?')) {
      localStorage.removeItem('spirit-island-sessions');
      dispatch({ type: 'LOAD_HISTORY' });
    }
  };

  const completedSessions = sessions.filter(s => s.result === 'win' || s.result === 'loss');

  return (
    <div className="min-h-screen pb-16" style={{ backgroundColor: '#0b1d0e' }}>
      {/* Header */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src={VICTORY_IMG} alt="" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(11, 29, 14, 1) 0%, rgba(11, 29, 14, 0.7) 50%, transparent 100%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 container pb-6">
          <button
            onClick={() => dispatch({ type: 'SET_VIEW', view: 'home' })}
            className="text-sm mb-3 flex items-center gap-1 transition-colors"
            style={{ color: 'rgba(255,255,255,0.4)', ...BODY }}
          >
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white" style={HEADING}>
            Session History
          </h1>
        </div>
      </div>

      <div className="container mt-6">
        {sessions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'rgba(22, 46, 28, 0.6)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Calendar className="w-8 h-8" style={{ color: 'rgba(255,255,255,0.3)' }} />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2" style={HEADING}>
              No sessions yet
            </h2>
            <p className="mb-6" style={{ color: 'rgba(255,255,255,0.4)', ...BODY }}>
              Start a new game to begin tracking your Spirit Island journey.
            </p>
            <button
              onClick={startNewSession}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: '#5BC0BE', ...BODY }}
            >
              <Play className="w-4 h-4" /> Start New Game
            </button>
          </motion.div>
        ) : (
          <>
            {/* Tab Navigation */}
            <div
              className="flex rounded-xl p-1 mb-6"
              style={{ backgroundColor: 'rgba(22, 46, 28, 0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <button
                onClick={() => setTab('stats')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all"
                style={{
                  ...BODY,
                  backgroundColor: tab === 'stats' ? 'rgba(91, 192, 190, 0.15)' : 'transparent',
                  color: tab === 'stats' ? '#5BC0BE' : 'rgba(255,255,255,0.4)',
                  border: tab === 'stats' ? '1px solid rgba(91, 192, 190, 0.3)' : '1px solid transparent',
                }}
              >
                <BarChart3 className="w-4 h-4" />
                Statistics
              </button>
              <button
                onClick={() => setTab('sessions')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all"
                style={{
                  ...BODY,
                  backgroundColor: tab === 'sessions' ? 'rgba(212, 168, 67, 0.15)' : 'transparent',
                  color: tab === 'sessions' ? '#D4A843' : 'rgba(255,255,255,0.4)',
                  border: tab === 'sessions' ? '1px solid rgba(212, 168, 67, 0.3)' : '1px solid transparent',
                }}
              >
                <List className="w-4 h-4" />
                Sessions ({sessions.length})
              </button>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {tab === 'stats' ? (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <StatsDashboard sessions={completedSessions} />
                </motion.div>
              ) : (
                <motion.div
                  key="sessions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Session List Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-white" style={HEADING}>Past Sessions</h2>
                    <button
                      onClick={clearHistory}
                      className="text-xs flex items-center gap-1 transition-colors hover:opacity-80"
                      style={{ color: 'rgba(255,255,255,0.3)', ...BODY }}
                    >
                      <Trash2 className="w-3 h-3" /> Clear All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {sessions.map((session, i) => (
                      <SessionCard key={session.id} session={session} index={i} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}

function SessionCard({ session, index }: { session: SessionData; index: number }) {
  const isWin = session.result === 'win';
  const date = new Date(session.date);
  const borderColor = isWin ? 'rgba(91, 192, 190, 0.25)' : 'rgba(204, 51, 51, 0.25)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="p-4 rounded-xl"
      style={{ backgroundColor: 'rgba(22, 46, 28, 0.5)', border: `1px solid ${borderColor}` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: isWin ? 'rgba(91, 192, 190, 0.12)' : 'rgba(204, 51, 51, 0.12)' }}
          >
            {isWin ? (
              <Trophy className="w-5 h-5" style={{ color: '#D4A843' }} />
            ) : (
              <Skull className="w-5 h-5" style={{ color: '#CC3333' }} />
            )}
          </div>
          <div>
            <div className="font-semibold text-white" style={HEADING}>
              {isWin ? 'Victory' : 'Defeat'}
            </div>
            <div className="text-xs flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.35)', ...BODY }}>
              <Calendar className="w-3 h-3" />
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              {session.turnCount > 0 && (
                <>
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                  <Clock className="w-3 h-3" />
                  {session.turnCount} turns
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.35)', ...BODY }}>
          <Users className="w-3 h-3" />
          {session.playerCount}
        </div>
      </div>

      {/* Spirits */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {session.players.filter(p => p.spirit).map((p, i) => (
          <span
            key={i}
            className="text-xs px-2 py-0.5 rounded-md"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', ...BODY }}
          >
            {p.spirit}
          </span>
        ))}
      </div>

      {/* Details */}
      <div className="text-xs space-y-0.5" style={BODY}>
        {session.adversary && (
          <div style={{ color: 'rgba(255,255,255,0.4)' }}>vs {session.adversary} (Level {session.adversaryLevel})</div>
        )}
        {session.scenario && <div style={{ color: 'rgba(255,255,255,0.4)' }}>Scenario: {session.scenario}</div>}
        {session.boards.length > 0 && (
          <div style={{ color: 'rgba(255,255,255,0.35)' }}>Boards: {session.boards.join(', ')}</div>
        )}
        {session.winCondition && (
          <div style={{ color: '#5BC0BE' }}>
            {session.winCondition}
          </div>
        )}
        {session.lossReason && (
          <div style={{ color: '#CC3333' }}>
            {session.lossReason}
          </div>
        )}
      </div>
    </motion.div>
  );
}
