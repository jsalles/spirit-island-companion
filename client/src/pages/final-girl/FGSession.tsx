/**
 * Final Girl Game Session — Phase-by-phase gameplay tracker
 * Horror theme with blood-red accents
 * Includes end-game scoring calculator
 */
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { useFinalGirl } from '@/contexts/FinalGirlContext';
import { FG_GAME_PHASES } from '@/lib/finalGirlData';
import { calculateFGScore, getScoreDescription, type FGScoreInput, type FGScoreBreakdown } from '@/utils/fgScoring';
import { ArrowLeft, ArrowRight, Skull, Clock, Trophy, XCircle, ChevronDown, ChevronUp, Heart, Users, Zap, Shield, Flame, Star } from 'lucide-react';
import { toast } from 'sonner';

export default function FGSession() {
  const { state, dispatch } = useFinalGirl();
  const [, setLocation] = useLocation();
  const session = state.currentSession;
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [endGameStep, setEndGameStep] = useState<'outcome' | 'scoring' | 'result'>('outcome');
  const [gameResult, setGameResult] = useState<'win' | 'loss' | null>(null);
  const [scoreInput, setScoreInput] = useState<FGScoreInput>({
    result: 'win',
    healthRemaining: 3,
    maxHealth: 5,
    usedFinalHealthToken: false,
    victimsSaved: 3,
    victimsKilled: 2,
    totalVictims: 8,
    turnCount: state.currentTurn,
    itemsUsed: 4,
    horrorLevel: 3,
    difficulty: (session?.difficulty as FGScoreInput['difficulty']) || 'medium',
    finaleRevealed: false,
    darkPowerRevealed: false,
  });
  const [scoreBreakdown, setScoreBreakdown] = useState<FGScoreBreakdown | null>(null);

  useEffect(() => {
    if (!session) setLocation('/', { replace: true });
  }, [session, setLocation]);

  if (!session) return null;

  const currentPhase = FG_GAME_PHASES[state.currentPhaseIndex];

  const handleNextPhase = () => {
    if (state.currentPhaseIndex < FG_GAME_PHASES.length - 1) {
      dispatch({ type: 'SET_PHASE', index: state.currentPhaseIndex + 1 });
    } else {
      dispatch({ type: 'NEXT_TURN' });
    }
  };

  const handlePrevPhase = () => {
    if (state.currentPhaseIndex > 0) {
      dispatch({ type: 'SET_PHASE', index: state.currentPhaseIndex - 1 });
    }
  };

  const toggleStep = (stepId: string) => {
    setExpandedSteps(prev => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const handleOpenEndDialog = () => {
    setEndGameStep('outcome');
    setGameResult(null);
    setScoreBreakdown(null);
    setScoreInput(prev => ({
      ...prev,
      turnCount: state.currentTurn,
      difficulty: (session?.difficulty as FGScoreInput['difficulty']) || 'medium',
    }));
    setShowEndDialog(true);
  };

  const handleSelectOutcome = (result: 'win' | 'loss') => {
    setGameResult(result);
    setScoreInput(prev => ({ ...prev, result }));
    setEndGameStep('scoring');
  };

  const handleCalculateScore = () => {
    const breakdown = calculateFGScore(scoreInput);
    setScoreBreakdown(breakdown);
    setEndGameStep('result');
  };

  const handleFinalizeGame = () => {
    if (!gameResult || !scoreBreakdown) return;
    dispatch({
      type: 'END_SESSION',
      result: gameResult,
      scoreData: {
        score: scoreBreakdown.finalScore,
        scoreRank: scoreBreakdown.rank,
        healthRemaining: scoreInput.healthRemaining,
        maxHealth: scoreInput.maxHealth,
        usedFinalHealthToken: scoreInput.usedFinalHealthToken,
        victimsSaved: scoreInput.victimsSaved,
        victimsKilled: scoreInput.victimsKilled,
        totalVictims: scoreInput.totalVictims,
        itemsUsed: scoreInput.itemsUsed,
        horrorLevel: scoreInput.horrorLevel,
      },
    });
    toast.success(gameResult === 'win'
      ? `You survived! Rank: ${scoreBreakdown.rank} (${scoreBreakdown.finalScore} pts)`
      : `The Killer prevails... Score: ${scoreBreakdown.finalScore} pts`
    );
    setShowEndDialog(false);
    setLocation('/');
  };

  const handleSkipScoring = () => {
    if (!gameResult) return;
    dispatch({ type: 'END_SESSION', result: gameResult });
    toast.success(gameResult === 'win' ? 'You survived! The Final Girl lives!' : 'The Killer prevails... Game Over.');
    setShowEndDialog(false);
    setLocation('/');
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#0a0505' }}>
      {/* Film grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-50" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
      }} />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b backdrop-blur-xl" style={{ backgroundColor: 'rgba(10, 5, 5, 0.95)', borderColor: 'rgba(220, 38, 38, 0.15)' }}>
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4" style={{ color: '#dc2626' }} />
              <span className="text-sm font-medium text-white">Turn {state.currentTurn}</span>
            </div>
            <div className="text-center">
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {session.killer?.split(' — ')[0]} vs {session.finalGirl}
              </p>
            </div>
            <button
              onClick={handleOpenEndDialog}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:bg-red-900/30"
              style={{ borderColor: 'rgba(220, 38, 38, 0.4)', color: '#dc2626' }}
            >
              End Game
            </button>
          </div>

          {/* Phase tabs */}
          <div className="flex gap-1 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            {FG_GAME_PHASES.map((phase, i) => (
              <button
                key={phase.id}
                onClick={() => dispatch({ type: 'SET_PHASE', index: i })}
                className="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
                style={{
                  backgroundColor: i === state.currentPhaseIndex ? '#dc2626' : 'rgba(255,255,255,0.05)',
                  color: i === state.currentPhaseIndex ? 'white' : 'rgba(255,255,255,0.5)',
                }}
              >
                {phase.shortName || phase.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Phase Content */}
      <main className="container py-8 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Phase Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: currentPhase.color + '20' }}>
                  <span className="text-lg">{currentPhase.icon}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {currentPhase.name}
                  </h2>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Phase {state.currentPhaseIndex + 1} of {FG_GAME_PHASES.length}
                  </p>
                </div>
              </div>
              <p className="text-sm mt-3" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Source Serif 4', serif" }}>
                {currentPhase.description}
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {currentPhase.steps.map((step, i) => {
                const stepId = `${currentPhase.id}-${i}`;
                const isExpanded = expandedSteps[stepId];
                return (
                  <motion.div
                    key={stepId}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl border overflow-hidden"
                    style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(220, 38, 38, 0.1)' }}
                  >
                    <button
                      onClick={() => step.detail && toggleStep(stepId)}
                      className="w-full flex items-center gap-3 p-4 text-left"
                    >
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ backgroundColor: currentPhase.color + '20', color: currentPhase.color }}>
                        {i + 1}
                      </div>
                      <span className="text-sm flex-1 text-white">{step.text}</span>
                      {step.detail && (
                        isExpanded ? <ChevronUp className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} /> : <ChevronDown className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
                      )}
                    </button>
                    {step.detail && isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 pl-14"
                      >
                        <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Source Serif 4', serif" }}>
                          {step.detail}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Phase-specific tips */}
            {currentPhase.tip && (
              <div className="mt-6 p-4 rounded-xl border" style={{ backgroundColor: 'rgba(234, 179, 8, 0.05)', borderColor: 'rgba(234, 179, 8, 0.2)' }}>
                <p className="text-xs font-medium mb-1" style={{ color: '#eab308' }}>Tip</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Source Serif 4', serif" }}>
                  {currentPhase.tip}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl" style={{ backgroundColor: 'rgba(10, 5, 5, 0.95)', borderColor: 'rgba(220, 38, 38, 0.15)' }}>
        <div className="container py-4 flex justify-between items-center">
          <button
            onClick={handlePrevPhase}
            disabled={state.currentPhaseIndex === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-30"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Turn {state.currentTurn}
          </span>
          <button
            onClick={handleNextPhase}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:brightness-110"
            style={{ backgroundColor: '#dc2626' }}
          >
            {state.currentPhaseIndex === FG_GAME_PHASES.length - 1 ? 'Next Turn' : 'Next Phase'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* End Game Dialog with Scoring */}
      <AnimatePresence>
        {showEndDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
            onClick={() => setShowEndDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border p-6 my-8 max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: '#1a0a0a', borderColor: 'rgba(220, 38, 38, 0.3)' }}
            >
              {/* Step 1: Outcome */}
              {endGameStep === 'outcome' && (
                <>
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    End Game
                  </h3>
                  <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    How did the horror end?
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => handleSelectOutcome('win')}
                      className="w-full flex items-center gap-3 p-4 rounded-xl border transition-all hover:brightness-110"
                      style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.3)' }}
                    >
                      <Trophy className="w-5 h-5" style={{ color: '#22c55e' }} />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white">Survived!</p>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>The Final Girl killed the Killer</p>
                      </div>
                    </button>
                    <button
                      onClick={() => handleSelectOutcome('loss')}
                      className="w-full flex items-center gap-3 p-4 rounded-xl border transition-all hover:brightness-110"
                      style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderColor: 'rgba(220, 38, 38, 0.3)' }}
                    >
                      <XCircle className="w-5 h-5" style={{ color: '#dc2626' }} />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white">Killed</p>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>The Killer claims another victim</p>
                      </div>
                    </button>
                  </div>
                  <button
                    onClick={() => setShowEndDialog(false)}
                    className="w-full mt-4 py-2 text-sm text-center"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    Cancel
                  </button>
                </>
              )}

              {/* Step 2: Scoring Input */}
              {endGameStep === 'scoring' && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Score Your Game
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full" style={{
                      backgroundColor: gameResult === 'win' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(220, 38, 38, 0.2)',
                      color: gameResult === 'win' ? '#22c55e' : '#dc2626',
                    }}>
                      {gameResult === 'win' ? 'Survived' : 'Killed'}
                    </span>
                  </div>
                  <p className="text-xs mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Enter your game stats to calculate your performance score.
                  </p>

                  <div className="space-y-4">
                    {/* Health */}
                    <ScoreField
                      icon={<Heart className="w-4 h-4" style={{ color: '#ef4444' }} />}
                      label="Health Remaining"
                      sublabel={`of ${scoreInput.maxHealth} max`}
                    >
                      <NumberStepper
                        value={scoreInput.healthRemaining}
                        min={0}
                        max={scoreInput.maxHealth}
                        onChange={v => setScoreInput(p => ({ ...p, healthRemaining: v }))}
                      />
                    </ScoreField>

                    {/* Max Health */}
                    <ScoreField
                      icon={<Shield className="w-4 h-4" style={{ color: '#a855f7' }} />}
                      label="Max Health"
                      sublabel="Starting health"
                    >
                      <NumberStepper
                        value={scoreInput.maxHealth}
                        min={3}
                        max={7}
                        onChange={v => setScoreInput(p => ({ ...p, maxHealth: v, healthRemaining: Math.min(p.healthRemaining, v) }))}
                      />
                    </ScoreField>

                    {/* Final Health Token */}
                    <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                      <div className="flex items-center gap-2">
                        <Skull className="w-4 h-4" style={{ color: '#dc2626' }} />
                        <span className="text-xs text-white">Used Final Health Token?</span>
                      </div>
                      <ToggleButton
                        active={scoreInput.usedFinalHealthToken}
                        onToggle={() => setScoreInput(p => ({ ...p, usedFinalHealthToken: !p.usedFinalHealthToken }))}
                      />
                    </div>

                    {/* Victims Saved */}
                    <ScoreField
                      icon={<Users className="w-4 h-4" style={{ color: '#22c55e' }} />}
                      label="Victims Saved"
                      sublabel=""
                    >
                      <NumberStepper
                        value={scoreInput.victimsSaved}
                        min={0}
                        max={20}
                        onChange={v => setScoreInput(p => ({ ...p, victimsSaved: v }))}
                      />
                    </ScoreField>

                    {/* Victims Killed */}
                    <ScoreField
                      icon={<XCircle className="w-4 h-4" style={{ color: '#ef4444' }} />}
                      label="Victims Killed"
                      sublabel=""
                    >
                      <NumberStepper
                        value={scoreInput.victimsKilled}
                        min={0}
                        max={20}
                        onChange={v => setScoreInput(p => ({ ...p, victimsKilled: v }))}
                      />
                    </ScoreField>

                    {/* Total Victims */}
                    <ScoreField
                      icon={<Users className="w-4 h-4" style={{ color: '#f97316' }} />}
                      label="Total Victims (on board)"
                      sublabel=""
                    >
                      <NumberStepper
                        value={scoreInput.totalVictims}
                        min={0}
                        max={20}
                        onChange={v => setScoreInput(p => ({ ...p, totalVictims: v }))}
                      />
                    </ScoreField>

                    {/* Items Used */}
                    <ScoreField
                      icon={<Zap className="w-4 h-4" style={{ color: '#eab308' }} />}
                      label="Items Used"
                      sublabel="Weapons, tools, etc."
                    >
                      <NumberStepper
                        value={scoreInput.itemsUsed}
                        min={0}
                        max={20}
                        onChange={v => setScoreInput(p => ({ ...p, itemsUsed: v }))}
                      />
                    </ScoreField>

                    {/* Horror Level */}
                    <ScoreField
                      icon={<Flame className="w-4 h-4" style={{ color: '#dc2626' }} />}
                      label="Final Horror Level"
                      sublabel="On the Killer board"
                    >
                      <NumberStepper
                        value={scoreInput.horrorLevel}
                        min={0}
                        max={10}
                        onChange={v => setScoreInput(p => ({ ...p, horrorLevel: v }))}
                      />
                    </ScoreField>

                    {/* Finale Revealed */}
                    <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" style={{ color: '#eab308' }} />
                        <span className="text-xs text-white">Finale Revealed?</span>
                      </div>
                      <ToggleButton
                        active={scoreInput.finaleRevealed}
                        onToggle={() => setScoreInput(p => ({ ...p, finaleRevealed: !p.finaleRevealed }))}
                      />
                    </div>

                    {/* Dark Power Revealed */}
                    <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                      <div className="flex items-center gap-2">
                        <Skull className="w-4 h-4" style={{ color: '#a855f7' }} />
                        <span className="text-xs text-white">Dark Power Revealed?</span>
                      </div>
                      <ToggleButton
                        active={scoreInput.darkPowerRevealed}
                        onToggle={() => setScoreInput(p => ({ ...p, darkPowerRevealed: !p.darkPowerRevealed }))}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleSkipScoring}
                      className="flex-1 py-2.5 rounded-lg text-xs font-medium border transition-all"
                      style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}
                    >
                      Skip Scoring
                    </button>
                    <button
                      onClick={handleCalculateScore}
                      className="flex-1 py-2.5 rounded-lg text-xs font-medium text-white transition-all hover:brightness-110"
                      style={{ backgroundColor: '#dc2626' }}
                    >
                      Calculate Score
                    </button>
                  </div>
                  <button
                    onClick={() => setEndGameStep('outcome')}
                    className="w-full mt-3 py-2 text-xs text-center"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    Back
                  </button>
                </>
              )}

              {/* Step 3: Score Result */}
              {endGameStep === 'result' && scoreBreakdown && (
                <>
                  {/* Rank Display */}
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                      className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center border-2"
                      style={{ borderColor: scoreBreakdown.rankColor, backgroundColor: scoreBreakdown.rankColor + '15' }}
                    >
                      <span className="text-3xl font-black" style={{ color: scoreBreakdown.rankColor, fontFamily: "'Playfair Display', serif" }}>
                        {scoreBreakdown.rank}
                      </span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                      <p className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {scoreBreakdown.rankLabel}
                      </p>
                      <p className="text-3xl font-black mt-1" style={{ color: scoreBreakdown.rankColor }}>
                        {scoreBreakdown.finalScore} pts
                      </p>
                      <p className="text-xs mt-2 max-w-xs mx-auto" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Serif 4', serif" }}>
                        {getScoreDescription(scoreBreakdown.rank)}
                      </p>
                    </motion.div>
                  </div>

                  {/* Breakdown */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-2 mb-6"
                  >
                    <p className="text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>Score Breakdown</p>
                    <BreakdownRow label="Survival Bonus" value={scoreBreakdown.survivalBonus} color="#22c55e" />
                    <BreakdownRow label="Health Remaining" value={scoreBreakdown.healthScore} color="#ef4444" />
                    <BreakdownRow label="Victims Saved" value={scoreBreakdown.victimScore} color="#3b82f6" />
                    <BreakdownRow label="Turn Efficiency" value={scoreBreakdown.turnEfficiency} color="#eab308" />
                    <BreakdownRow label="Resourcefulness" value={scoreBreakdown.resourcefulness} color="#f97316" />
                    <BreakdownRow label="Horror Control" value={scoreBreakdown.horrorControl} color="#a855f7" />
                    <BreakdownRow label="Bonuses" value={scoreBreakdown.bonuses} color="#06b6d4" />
                    <div className="border-t pt-2 mt-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          Raw Total × {scoreBreakdown.difficultyMultiplier}x ({scoreInput.difficulty})
                        </span>
                        <span className="text-sm font-bold" style={{ color: scoreBreakdown.rankColor }}>
                          {scoreBreakdown.finalScore}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Finalize */}
                  <button
                    onClick={handleFinalizeGame}
                    className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: '#dc2626' }}
                  >
                    Save & Return Home
                  </button>
                  <button
                    onClick={() => setEndGameStep('scoring')}
                    className="w-full mt-3 py-2 text-xs text-center"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    Adjust Stats
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Helper Components ──────────────────────────────────────────────────────

function ScoreField({ icon, label, sublabel, children }: { icon: React.ReactNode; label: string; sublabel: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
      <div className="flex items-center gap-2">
        {icon}
        <div>
          <span className="text-xs text-white">{label}</span>
          {sublabel && <span className="text-[10px] ml-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{sublabel}</span>}
        </div>
      </div>
      {children}
    </div>
  );
}

function NumberStepper({ value, min, max, onChange }: { value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold transition-all disabled:opacity-30"
        style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'white' }}
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-bold text-white">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold transition-all disabled:opacity-30"
        style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'white' }}
      >
        +
      </button>
    </div>
  );
}

function ToggleButton({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="w-10 h-5 rounded-full relative transition-all"
      style={{ backgroundColor: active ? '#dc2626' : 'rgba(255,255,255,0.15)' }}
    >
      <div
        className="w-4 h-4 rounded-full absolute top-0.5 transition-all"
        style={{
          backgroundColor: 'white',
          left: active ? '22px' : '2px',
        }}
      />
    </button>
  );
}

function BreakdownRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</span>
      <span className="text-xs font-bold" style={{ color: value > 0 ? color : 'rgba(255,255,255,0.3)' }}>
        {value > 0 ? `+${value}` : value}
      </span>
    </div>
  );
}
