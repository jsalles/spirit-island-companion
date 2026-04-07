/*
 * Game Session Page — "Living Island" Design
 * Shows current game phase with step-by-step instructions
 * Turn tracker, phase navigation, and end game dialog
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { GAME_PHASES, WIN_CONDITIONS, LOSS_CONDITIONS } from '@/lib/gameData';
import {
  ChevronLeft, ChevronRight, Trophy, Skull, X, SkipForward,
  ChevronDown, ChevronUp, Clock, Zap, Swords, Waves, Moon, Leaf, Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const PHASE_BG = '/images/game-phase-bg.webp';

const PHASE_ICON_MAP: Record<string, typeof Zap> = {
  spirit: Leaf,
  fast: Zap,
  invader: Swords,
  slow: Waves,
  'time-passes': Moon,
};

const PHASE_COLORS: Record<string, string> = {
  spirit: '#4CAF50',
  fast: '#F5C542',
  invader: '#CC3333',
  slow: '#3A7BD5',
  'time-passes': '#9B8EC4',
};

export default function GameSession() {
  const { state, dispatch } = useGame();
  const session = state.currentSession;
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [endResult, setEndResult] = useState<'win' | 'loss' | null>(null);
  const [selectedCondition, setSelectedCondition] = useState('');
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [notes, setNotes] = useState('');

  if (!session) return null;

  const currentPhase = GAME_PHASES[state.currentPhaseIndex];
  const hasEventDeck = session.useEventDeck;
  const phaseColor = PHASE_COLORS[currentPhase.id] || '#5BC0BE';

  const nextPhase = () => {
    if (state.currentPhaseIndex < GAME_PHASES.length - 1) {
      dispatch({ type: 'SET_PHASE', index: state.currentPhaseIndex + 1 });
      setExpandedStep(null);
    } else {
      dispatch({ type: 'NEXT_TURN' });
      setExpandedStep(null);
    }
  };

  const prevPhase = () => {
    if (state.currentPhaseIndex > 0) {
      dispatch({ type: 'SET_PHASE', index: state.currentPhaseIndex - 1 });
      setExpandedStep(null);
    }
  };

  const handleEndGame = () => {
    if (!endResult) return;
    dispatch({
      type: 'END_SESSION',
      result: endResult,
      winCondition: endResult === 'win' ? selectedCondition : undefined,
      lossReason: endResult === 'loss' ? selectedCondition : undefined,
    });
  };

  // Filter steps based on expansion
  const visibleSteps = currentPhase.steps.filter(step => {
    if (!step.isExpansion) return true;
    if (step.expansionId === 'branch-and-claw') return hasEventDeck;
    return true;
  });

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#0b1d0e' }}>
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img src={PHASE_BG} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(11, 29, 14, 0.88)' }} />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-30 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(11, 29, 14, 0.92)', borderColor: 'rgba(91, 192, 190, 0.15)' }}>
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => dispatch({ type: 'CLEAR_SESSION' })}
                className="flex items-center gap-1 text-xs transition-colors"
                style={{ color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                <Home className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: '#D4A843' }} />
                <span className="font-bold text-lg text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Turn {state.currentTurn}
                </span>
              </div>
              {session.adversary && (
                <span className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: 'rgba(204, 51, 51, 0.15)', color: '#CC3333', fontFamily: "'Source Serif 4', serif" }}>
                  vs {session.adversary} Lvl {session.adversaryLevel}
                </span>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEndDialog(true)}
              className="text-xs border-border/50 hover:bg-card"
            >
              End Game
            </Button>
          </div>

          {/* Phase tabs */}
          <div className="flex gap-1 mt-3 overflow-x-auto pb-1">
            {GAME_PHASES.map((phase, i) => {
              const Icon = PHASE_ICON_MAP[phase.id] || Leaf;
              const color = PHASE_COLORS[phase.id] || '#5BC0BE';
              const isActive = i === state.currentPhaseIndex;
              const isPast = i < state.currentPhaseIndex;
              return (
                <button
                  key={phase.id}
                  onClick={() => {
                    dispatch({ type: 'SET_PHASE', index: i });
                    setExpandedStep(null);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all"
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    backgroundColor: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                    border: isActive ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                    color: isActive ? color : isPast ? color + '80' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{phase.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Phase Content */}
      <div className="relative z-10 container py-8 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase.id + state.currentTurn}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Phase Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: phaseColor + '20', color: phaseColor }}
                >
                  {(() => { const Icon = PHASE_ICON_MAP[currentPhase.id] || Leaf; return <Icon className="w-7 h-7" />; })()}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {currentPhase.name}
                  </h1>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>
                    Phase {state.currentPhaseIndex + 1} of {GAME_PHASES.length} — Turn {state.currentTurn}
                  </p>
                </div>
              </div>
              {/* Phase progress dots */}
              <div className="flex gap-1.5 ml-[4.5rem]">
                {GAME_PHASES.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full transition-all duration-500"
                    style={{
                      width: i === state.currentPhaseIndex ? '2rem' : '0.5rem',
                      backgroundColor: i <= state.currentPhaseIndex ? phaseColor : 'rgba(255,255,255,0.1)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {visibleSteps.map((step, i) => {
                const isExpanded = expandedStep === i;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-xl overflow-hidden"
                    style={{
                      backgroundColor: 'rgba(22, 46, 28, 0.6)',
                      border: `1px solid ${isExpanded ? phaseColor + '40' : 'rgba(91, 192, 190, 0.1)'}`,
                    }}
                  >
                    <button
                      onClick={() => setExpandedStep(isExpanded ? null : i)}
                      className="w-full p-4 md:p-5 flex items-start gap-4 text-left"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm"
                        style={{
                          backgroundColor: phaseColor + '20',
                          color: phaseColor,
                          fontFamily: "'Playfair Display', serif",
                        }}
                      >
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {step.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Source Serif 4', serif" }}>
                          {step.description}
                        </p>
                        {step.isExpansion && (
                          <span
                            className="inline-block mt-2 text-[10px] px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: 'rgba(91, 192, 190, 0.1)', color: '#5BC0BE' }}
                          >
                            Expansion Rule
                          </span>
                        )}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && step.details && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 md:px-5 pb-4 md:pb-5 ml-[3.25rem]">
                            <div
                              className="p-4 rounded-lg"
                              style={{
                                backgroundColor: 'rgba(11, 29, 14, 0.5)',
                                border: '1px solid rgba(91, 192, 190, 0.08)',
                              }}
                            >
                              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Source Serif 4', serif" }}>
                                {step.details}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Player Spirits Reference */}
            {session.players.some((p: any) => p.spirit) && (
              <div
                className="mt-8 p-4 rounded-xl"
                style={{
                  backgroundColor: 'rgba(22, 46, 28, 0.4)',
                  border: '1px solid rgba(91, 192, 190, 0.1)',
                }}
              >
                <h3 className="font-semibold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Active Spirits
                </h3>
                <div className="flex flex-wrap gap-3">
                  {session.players.map((p: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                      style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Source Serif 4', serif" }}>
                        {p.spirit || p.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-30 backdrop-blur-md border-t" style={{ backgroundColor: 'rgba(11, 29, 14, 0.95)', borderColor: 'rgba(91, 192, 190, 0.1)' }}>
        <div className="container py-4 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevPhase}
            disabled={state.currentPhaseIndex === 0}
            className="gap-2 border-border/50"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </Button>

          <div className="text-center hidden sm:block">
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Source Serif 4', serif" }}>
              {state.currentPhaseIndex === GAME_PHASES.length - 1 ? 'End of turn' : 'Next'}
            </div>
            <div className="text-sm font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              {state.currentPhaseIndex === GAME_PHASES.length - 1
                ? `Start Turn ${state.currentTurn + 1}`
                : GAME_PHASES[state.currentPhaseIndex + 1]?.name}
            </div>
          </div>

          <Button
            onClick={nextPhase}
            className="gap-2 text-white font-semibold"
            style={{
              backgroundColor: state.currentPhaseIndex === GAME_PHASES.length - 1
                ? '#D4A843'
                : PHASE_COLORS[GAME_PHASES[state.currentPhaseIndex + 1]?.id] || '#5BC0BE',
            }}
          >
            {state.currentPhaseIndex === GAME_PHASES.length - 1 ? (
              <>Next Turn <SkipForward className="w-4 h-4" /></>
            ) : (
              <>Next <ChevronRight className="w-4 h-4" /></>
            )}
          </Button>
        </div>
      </div>

      {/* End Game Dialog */}
      <AnimatePresence>
        {showEndDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl p-6 shadow-2xl"
              style={{
                backgroundColor: 'rgba(22, 46, 28, 0.95)',
                border: '1px solid rgba(91, 192, 190, 0.2)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>End Game</h2>
                <button onClick={() => { setShowEndDialog(false); setEndResult(null); setSelectedCondition(''); }}>
                  <X className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.4)' }} />
                </button>
              </div>

              {/* Win/Loss Selection */}
              {!endResult && (
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setEndResult('win')}
                    className="p-6 rounded-xl text-center transition-all"
                    style={{
                      border: '2px solid rgba(91, 192, 190, 0.3)',
                      backgroundColor: 'rgba(91, 192, 190, 0.05)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(91, 192, 190, 0.6)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(91, 192, 190, 0.3)')}
                  >
                    <Trophy className="w-10 h-10 mx-auto mb-3" style={{ color: '#D4A843' }} />
                    <div className="font-bold text-lg text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Victory!</div>
                    <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>The island is saved</div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setEndResult('loss')}
                    className="p-6 rounded-xl text-center transition-all"
                    style={{
                      border: '2px solid rgba(204, 51, 51, 0.3)',
                      backgroundColor: 'rgba(204, 51, 51, 0.05)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(204, 51, 51, 0.6)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(204, 51, 51, 0.3)')}
                  >
                    <Skull className="w-10 h-10 mx-auto mb-3" style={{ color: '#CC3333' }} />
                    <div className="font-bold text-lg text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Defeat</div>
                    <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>The Invaders prevail</div>
                  </motion.button>
                </div>
              )}

              {/* Condition Selection */}
              {endResult && (
                <div>
                  <button
                    onClick={() => { setEndResult(null); setSelectedCondition(''); }}
                    className="text-sm mb-4 flex items-center gap-1 transition-colors"
                    style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>

                  <h3 className="font-semibold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {endResult === 'win' ? 'How did you win?' : 'What happened?'}
                  </h3>

                  <div className="space-y-2 mb-4">
                    {(endResult === 'win' ? WIN_CONDITIONS : LOSS_CONDITIONS).map(cond => {
                      const isSelected = selectedCondition === cond;
                      const selColor = endResult === 'win' ? '#5BC0BE' : '#CC3333';
                      return (
                        <button
                          key={cond}
                          onClick={() => setSelectedCondition(cond)}
                          className="w-full text-left p-3 rounded-lg text-sm transition-all"
                          style={{
                            fontFamily: "'Source Serif 4', serif",
                            border: `1px solid ${isSelected ? selColor + '60' : 'rgba(255,255,255,0.08)'}`,
                            backgroundColor: isSelected ? selColor + '10' : 'rgba(255,255,255,0.03)',
                            color: isSelected ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
                          }}
                        >
                          {cond}
                        </button>
                      );
                    })}
                  </div>

                  {/* Notes */}
                  <div className="mb-4">
                    <label className="text-xs mb-1 block" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>
                      Session Notes (optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="Any memorable moments or observations..."
                      className="w-full px-3 py-2 rounded-lg text-sm resize-none h-20 focus:outline-none"
                      style={{
                        fontFamily: "'Source Serif 4', serif",
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.8)',
                      }}
                    />
                  </div>

                  <Button
                    onClick={handleEndGame}
                    disabled={!selectedCondition}
                    className="w-full text-white font-semibold disabled:opacity-40"
                    style={{
                      backgroundColor: endResult === 'win' ? '#5BC0BE' : '#CC3333',
                    }}
                  >
                    {endResult === 'win' ? 'Record Victory' : 'Record Defeat'}
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
