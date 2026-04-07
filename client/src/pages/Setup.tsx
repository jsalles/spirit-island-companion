/*
 * Setup Page — "Living Island" Design
 * Multi-step setup wizard: Expansions → Config → Checklist → Start
 */
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import {
  EXPANSIONS, SPIRITS, ADVERSARIES, SCENARIOS, BLIGHT_CARDS, BOARDS,
  SETUP_STEPS, PLAYER_COLORS, COMPLEXITY_COLORS,
  type Complexity
} from '@/lib/gameData';
import { Check, ChevronRight, ChevronLeft, Users, Swords, Map, Scroll, Skull, Leaf, Sparkles, Info, Shuffle, Dice1, Dice3, Dice5, Wand2 } from 'lucide-react';
import {
  randomizeAll, randomizeSpirits, randomizeAdversary, randomizeScenario,
  randomizeBlightCard, randomizeBoards, getDifficultyInfo,
  DIFFICULTY_OPTIONS, type DifficultyTarget
} from '@/lib/randomizer';
import { Button } from '@/components/ui/button';
import SpiritDetailSheet from '@/components/SpiritDetailSheet';
import { getSpiritDetail, type SpiritDetail } from '@/lib/spiritDetails';

const STEPS = ['Expansions', 'Players & Spirits', 'Game Options', 'Setup Checklist'];

const FOREST_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663316422635/7or2XBJKrDChpLdNiLsCVc/forest-mist-Ar4wXohNL7EqThhHghgPB2.webp';

export default function Setup() {
  const { state, dispatch, updateSession, updatePlayer } = useGame();
  const session = state.currentSession;
  const [activeStep, setActiveStep] = useState(0);
  const [detailSpirit, setDetailSpirit] = useState<SpiritDetail | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [difficultyTarget, setDifficultyTarget] = useState<DifficultyTarget>('any');
  const [randomizeAnimation, setRandomizeAnimation] = useState(false);

  const handleRandomizeAll = () => {
    if (!session) return;
    setRandomizeAnimation(true);
    setTimeout(() => {
      const updates = randomizeAll(session, difficultyTarget);
      updateSession(updates);
      setActiveStep(3); // Jump to checklist
      setRandomizeAnimation(false);
    }, 600);
  };

  const handleRandomizeSpirits = () => {
    if (!session) return;
    const activeExpansions = ['base', ...session.expansions];
    const players = randomizeSpirits(session.playerCount, activeExpansions, session.players);
    updateSession({ players });
  };

  const handleRandomizeOptions = () => {
    if (!session) return;
    const activeExpansions = ['base', ...session.expansions];
    const { adversary, adversaryLevel } = randomizeAdversary(activeExpansions, difficultyTarget);
    const scenario = randomizeScenario(activeExpansions);
    const blightCard = randomizeBlightCard(activeExpansions);
    const boards = randomizeBoards(session.playerCount, activeExpansions);
    const hasEventDeck = session.expansions.includes('branch-and-claw') || session.expansions.includes('jagged-earth');
    updateSession({ adversary, adversaryLevel, scenario, blightCard, boards, useEventDeck: hasEventDeck });
  };

  const openSpiritDetail = (name: string) => {
    const detail = getSpiritDetail(name);
    if (detail) {
      setDetailSpirit(detail);
      setDetailOpen(true);
    }
  };

  if (!session) return null;

  const canProceed = () => {
    switch (activeStep) {
      case 0: return true;
      case 1: return session.players.every(p => p.spirit);
      case 2: return session.boards.length >= session.playerCount;
      case 3: return true;
      default: return true;
    }
  };

  const next = () => {
    if (activeStep < STEPS.length - 1) setActiveStep(activeStep + 1);
  };
  const prev = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  return (
    <div className="min-h-screen pb-32" style={{ backgroundColor: '#0b1d0e' }}>
      {/* Header */}
      <div className="sticky top-0 z-30 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(11, 29, 14, 0.92)', borderColor: 'rgba(91, 192, 190, 0.12)' }}>
        <div className="container py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => dispatch({ type: 'CLEAR_SESSION' })}
              className="text-sm transition-colors flex items-center gap-1"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}
            >
              <ChevronLeft className="w-4 h-4" /> Back to Home
            </button>
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>
              Step {activeStep + 1} of {STEPS.length}
            </span>
          </div>
          {/* Step indicators */}
          <div className="flex gap-2">
            {STEPS.map((step, i) => (
              <button
                key={step}
                onClick={() => setActiveStep(i)}
                className="flex-1 h-1.5 rounded-full transition-all duration-500"
                style={{ backgroundColor: i <= activeStep ? '#5BC0BE' : 'rgba(255,255,255,0.08)' }}
              />
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            {STEPS.map((step, i) => (
              <button
                key={step}
                onClick={() => setActiveStep(i)}
                className="flex-1 text-xs transition-colors"
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  color: i === activeStep ? '#5BC0BE' : 'rgba(255,255,255,0.3)',
                }}
              >
                {step}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mt-8">
        <AnimatePresence mode="wait">
          {activeStep === 0 && (
            <StepWrapper key="expansions">
              <ExpansionStep
                session={session}
                updateSession={updateSession}
                difficultyTarget={difficultyTarget}
                setDifficultyTarget={setDifficultyTarget}
                onRandomizeAll={handleRandomizeAll}
                randomizeAnimation={randomizeAnimation}
              />
            </StepWrapper>
          )}
          {activeStep === 1 && (
            <StepWrapper key="players">
              <PlayersStep
                session={session}
                updateSession={updateSession}
                updatePlayer={updatePlayer}
                onViewSpirit={openSpiritDetail}
                onRandomizeSpirits={handleRandomizeSpirits}
              />
            </StepWrapper>
          )}
          {activeStep === 2 && (
            <StepWrapper key="options">
              <OptionsStep
                session={session}
                updateSession={updateSession}
                onRandomizeOptions={handleRandomizeOptions}
                difficultyTarget={difficultyTarget}
                setDifficultyTarget={setDifficultyTarget}
              />
            </StepWrapper>
          )}
          {activeStep === 3 && (
            <StepWrapper key="checklist">
              <ChecklistStep
                session={session}
                checklist={state.setupChecklist}
                dispatch={dispatch}
              />
            </StepWrapper>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 backdrop-blur-md border-t" style={{ backgroundColor: 'rgba(11, 29, 14, 0.95)', borderColor: 'rgba(91, 192, 190, 0.1)' }}>
        <div className="container py-4 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prev}
            disabled={activeStep === 0}
            className="gap-2 border-border/50"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>

          {activeStep < STEPS.length - 1 ? (
            <Button
              onClick={next}
              disabled={!canProceed()}
              className="gap-2 text-white font-semibold disabled:opacity-40"
              style={{ backgroundColor: '#5BC0BE' }}
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={() => dispatch({ type: 'COMPLETE_SETUP' })}
              className="gap-2 font-semibold"
              style={{ backgroundColor: '#D4A843', color: '#0B1D0E' }}
            >
              <Sparkles className="w-4 h-4" /> Begin Game Session
            </Button>
          )}
        </div>
      </div>

      {/* Spirit Detail Sheet */}
      <SpiritDetailSheet
        spirit={detailSpirit}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}

function StepWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

/* ===== STEP 1: EXPANSIONS ===== */
function ExpansionStep({ session, updateSession, difficultyTarget, setDifficultyTarget, onRandomizeAll, randomizeAnimation }: {
  session: any;
  updateSession: any;
  difficultyTarget: DifficultyTarget;
  setDifficultyTarget: (d: DifficultyTarget) => void;
  onRandomizeAll: () => void;
  randomizeAnimation: boolean;
}) {
  const toggle = (id: string) => {
    const exps = session.expansions.includes(id)
      ? session.expansions.filter((e: string) => e !== id)
      : [...session.expansions, id];
    if (!exps.includes('base')) exps.unshift('base');
    updateSession({ expansions: exps });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Select Your Expansions
      </h2>
      <p className="mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Serif 4', serif" }}>
        Choose which expansions you'll be using for this session. The base game is always included.
      </p>

      {/* Quick Randomize Panel */}
      <motion.div
        className="mb-8 p-5 rounded-xl border overflow-hidden"
        style={{
          backgroundColor: 'rgba(22, 46, 28, 0.5)',
          borderColor: 'rgba(212, 168, 67, 0.25)',
          background: 'linear-gradient(135deg, rgba(22, 46, 28, 0.6) 0%, rgba(45, 35, 15, 0.3) 100%)',
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Wand2 className="w-5 h-5" style={{ color: '#D4A843' }} />
          <h3 className="font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Quick Random Setup</h3>
        </div>
        <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Source Serif 4', serif" }}>
          Select your expansions above, choose a difficulty, and let fate decide the rest.
        </p>

        {/* Difficulty Target */}
        <div className="mb-4">
          <label className="text-xs mb-2 block" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>
            Target Difficulty
          </label>
          <div className="flex gap-2 flex-wrap">
            {DIFFICULTY_OPTIONS.map(opt => {
              const info = getDifficultyInfo(opt);
              const active = difficultyTarget === opt;
              return (
                <button
                  key={opt}
                  onClick={() => setDifficultyTarget(opt)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    backgroundColor: active ? info.color + '25' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${active ? info.color + '60' : 'rgba(255,255,255,0.08)'}`,
                    color: active ? info.color : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {info.label}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] mt-1.5" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Source Serif 4', serif" }}>
            {getDifficultyInfo(difficultyTarget).description}
          </p>
        </div>

        <motion.button
          onClick={onRandomizeAll}
          disabled={randomizeAnimation}
          className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
          style={{
            fontFamily: "'Playfair Display', serif",
            backgroundColor: '#D4A843',
            color: '#0B1D0E',
            opacity: randomizeAnimation ? 0.7 : 1,
          }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          {randomizeAnimation ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: 'linear' }}
            >
              <Shuffle className="w-5 h-5" />
            </motion.div>
          ) : (
            <Shuffle className="w-5 h-5" />
          )}
          {randomizeAnimation ? 'Rolling the dice...' : 'Randomize Everything & Go!'}
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EXPANSIONS.map((exp) => {
          const isBase = exp.id === 'base';
          const selected = isBase || session.expansions.includes(exp.id);
          return (
            <motion.button
              key={exp.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => !isBase && toggle(exp.id)}
              className={`relative text-left p-5 rounded-xl transition-all duration-300 ${isBase ? 'cursor-default' : ''}`}
              style={{
                border: `2px solid ${selected ? 'rgba(91, 192, 190, 0.5)' : 'rgba(255,255,255,0.08)'}`,
                backgroundColor: selected ? 'rgba(91, 192, 190, 0.08)' : 'rgba(22, 46, 28, 0.4)',
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {exp.name}
                    </h3>
                    {isBase && (
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(91, 192, 190, 0.2)', color: '#5BC0BE' }}>
                        Always included
                      </span>
                    )}
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Source Serif 4', serif" }}>
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {exp.spirits.length > 0 && (
                      <span className="px-2 py-1 rounded-md" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Serif 4', serif" }}>
                        {exp.spirits.length} Spirits
                      </span>
                    )}
                    {exp.adversaries.length > 0 && (
                      <span className="px-2 py-1 rounded-md" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Serif 4', serif" }}>
                        {exp.adversaries.length} Adversar{exp.adversaries.length > 1 ? 'ies' : 'y'}
                      </span>
                    )}
                    {exp.scenarios.length > 0 && (
                      <span className="px-2 py-1 rounded-md" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Serif 4', serif" }}>
                        {exp.scenarios.length} Scenarios
                      </span>
                    )}
                    {exp.boards.length > 0 && (
                      <span className="px-2 py-1 rounded-md" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Serif 4', serif" }}>
                        {exp.boards.length} Boards
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ml-3"
                  style={{
                    borderColor: selected ? '#5BC0BE' : 'rgba(255,255,255,0.15)',
                    backgroundColor: selected ? '#5BC0BE' : 'transparent',
                  }}
                >
                  {selected && <Check className="w-4 h-4 text-white" />}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ===== STEP 2: PLAYERS & SPIRITS ===== */
function PlayersStep({ session, updateSession, updatePlayer, onViewSpirit, onRandomizeSpirits }: any) {
  const availableSpirits = useMemo(() => {
    const activeExpansions = ['base', ...session.expansions];
    return SPIRITS.filter(s => activeExpansions.includes(s.expansion));
  }, [session.expansions]);

  const [expandedPlayer, setExpandedPlayer] = useState<number | null>(0);
  const [spiritFilter, setSpiritFilter] = useState('');

  const filteredSpirits = useMemo(() => {
    if (!spiritFilter) return availableSpirits;
    const q = spiritFilter.toLowerCase();
    return availableSpirits.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.complexity.toLowerCase().includes(q) ||
      s.elements.some(e => e.toLowerCase().includes(q))
    );
  }, [availableSpirits, spiritFilter]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Players & Spirits
      </h2>
      <div className="flex items-center justify-between mb-6">
        <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Serif 4', serif" }}>
          Set up each player and choose their spirit.
        </p>
        <motion.button
          onClick={onRandomizeSpirits}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all"
          style={{
            fontFamily: "'Source Serif 4', serif",
            backgroundColor: 'rgba(91, 192, 190, 0.1)',
            border: '1px solid rgba(91, 192, 190, 0.3)',
            color: '#5BC0BE',
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Shuffle className="w-3.5 h-3.5" />
          Random Spirits
        </motion.button>
      </div>

      {/* Player Count */}
      <div className="mb-8">
        <label className="text-sm mb-2 block" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>
          Number of Players
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <button
              key={n}
              onClick={() => updateSession({ playerCount: n })}
              className="w-12 h-12 rounded-xl font-bold text-lg transition-all"
              style={{
                fontFamily: "'Playfair Display', serif",
                backgroundColor: session.playerCount === n ? '#5BC0BE' : 'rgba(22, 46, 28, 0.6)',
                color: session.playerCount === n ? '#fff' : 'rgba(255,255,255,0.4)',
                border: session.playerCount === n ? '1px solid #5BC0BE' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Player Cards */}
      <div className="space-y-4">
        {session.players.map((player: any, i: number) => (
          <motion.div
            key={i}
            layout
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: 'rgba(22, 46, 28, 0.5)',
              border: expandedPlayer === i ? '1px solid rgba(91, 192, 190, 0.3)' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <button
              onClick={() => setExpandedPlayer(expandedPlayer === i ? null : i)}
              className="w-full p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: player.color }} />
                <div className="text-left">
                  <div className="font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{player.name}</div>
                  <div className="text-sm" style={{ color: player.spirit ? '#5BC0BE' : 'rgba(255,255,255,0.3)', fontFamily: "'Source Serif 4', serif" }}>
                    {player.spirit || 'No spirit selected'}
                  </div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${expandedPlayer === i ? 'rotate-90' : ''}`} style={{ color: 'rgba(255,255,255,0.3)' }} />
            </button>

            <AnimatePresence>
              {expandedPlayer === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-4">
                    {/* Player Name */}
                    <div>
                      <label className="text-xs mb-1 block" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>Name</label>
                      <input
                        value={player.name}
                        onChange={e => updatePlayer(i, { name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none"
                        style={{
                          fontFamily: "'Source Serif 4', serif",
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: 'rgba(255,255,255,0.8)',
                        }}
                      />
                    </div>

                    {/* Color */}
                    <div>
                      <label className="text-xs mb-1 block" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>Color</label>
                      <div className="flex gap-2">
                        {PLAYER_COLORS.map(c => (
                          <button
                            key={c.value}
                            onClick={() => updatePlayer(i, { color: c.value })}
                            className="w-8 h-8 rounded-full transition-all"
                            style={{
                              backgroundColor: c.value,
                              border: player.color === c.value ? '2px solid white' : '2px solid transparent',
                              transform: player.color === c.value ? 'scale(1.15)' : 'scale(1)',
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Spirit Selection */}
                    <div>
                      <label className="text-xs mb-2 block" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>Spirit</label>
                      <input
                        value={spiritFilter}
                        onChange={e => setSpiritFilter(e.target.value)}
                        placeholder="Search spirits..."
                        className="w-full px-3 py-2 rounded-lg text-sm mb-2 focus:outline-none"
                        style={{
                          fontFamily: "'Source Serif 4', serif",
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: 'rgba(255,255,255,0.8)',
                        }}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                        {filteredSpirits.map(spirit => {
                          const taken = session.players.some((p: any, idx: number) => idx !== i && p.spirit === spirit.name);
                          const selected = player.spirit === spirit.name;
                          return (
                            <button
                              key={spirit.name}
                              disabled={taken}
                              onClick={() => updatePlayer(i, { spirit: spirit.name })}
                              className="text-left p-3 rounded-lg transition-all text-sm"
                              style={{
                                border: `1px solid ${selected ? 'rgba(91, 192, 190, 0.5)' : 'rgba(255,255,255,0.06)'}`,
                                backgroundColor: selected ? 'rgba(91, 192, 190, 0.1)' : 'rgba(255,255,255,0.02)',
                                opacity: taken ? 0.35 : 1,
                                cursor: taken ? 'not-allowed' : 'pointer',
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="font-medium text-white text-xs leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                  {spirit.name}
                                </div>
                                <span
                                  onClick={(e) => { e.stopPropagation(); onViewSpirit(spirit.name); }}
                                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                                  style={{ color: 'rgba(255,255,255,0.3)' }}
                                  title="View spirit details"
                                >
                                  <Info className="w-3.5 h-3.5" />
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span
                                  className="text-[10px] px-1.5 py-0.5 rounded"
                                  style={{
                                    fontFamily: "'Source Serif 4', serif",
                                    backgroundColor: COMPLEXITY_COLORS[spirit.complexity as Complexity] + '20',
                                    color: COMPLEXITY_COLORS[spirit.complexity as Complexity],
                                  }}
                                >
                                  {spirit.complexity}
                                </span>
                                <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Source Serif 4', serif" }}>
                                  {spirit.elements.join(' · ')}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ===== STEP 3: GAME OPTIONS ===== */
function OptionsStep({ session, updateSession, onRandomizeOptions, difficultyTarget, setDifficultyTarget }: any) {
  const { dispatch } = useGame();
  const activeExpansions = ['base', ...session.expansions];

  const availableAdversaries = ADVERSARIES.filter(a => activeExpansions.includes(a.expansion));
  const availableScenarios = SCENARIOS.filter(s => activeExpansions.includes(s.expansion));
  const availableBlightCards = BLIGHT_CARDS.filter(b => activeExpansions.includes(b.expansion));
  const availableBoards = BOARDS.filter(b => activeExpansions.includes(b.expansion));

  const hasEventDeck = session.expansions.includes('branch-and-claw') || session.expansions.includes('jagged-earth');

  const toggleBoard = (id: string) => {
    const boards = session.boards.includes(id)
      ? session.boards.filter((b: string) => b !== id)
      : [...session.boards, id];
    updateSession({ boards });
  };

  const optionBtnStyle = (selected: boolean) => ({
    border: `1px solid ${selected ? 'rgba(91, 192, 190, 0.5)' : 'rgba(255,255,255,0.06)'}`,
    backgroundColor: selected ? 'rgba(91, 192, 190, 0.1)' : 'rgba(22, 46, 28, 0.4)',
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Game Options
        </h2>
        <div className="flex items-center justify-between mb-2">
          <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Serif 4', serif" }}>
            Configure adversary, scenario, blight card, and island boards.
          </p>
          <motion.button
            onClick={onRandomizeOptions}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all flex-shrink-0"
            style={{
              fontFamily: "'Source Serif 4', serif",
              backgroundColor: 'rgba(91, 192, 190, 0.1)',
              border: '1px solid rgba(91, 192, 190, 0.3)',
              color: '#5BC0BE',
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Shuffle className="w-3.5 h-3.5" />
            Randomize All
          </motion.button>
        </div>

        {/* Difficulty Target for Randomization */}
        <div className="mb-6 p-3 rounded-lg" style={{ backgroundColor: 'rgba(22, 46, 28, 0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <label className="text-xs mb-2 block" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>
            Difficulty Target (for randomization)
          </label>
          <div className="flex gap-2 flex-wrap">
            {DIFFICULTY_OPTIONS.map(opt => {
              const info = getDifficultyInfo(opt);
              const active = difficultyTarget === opt;
              return (
                <button
                  key={opt}
                  onClick={() => setDifficultyTarget(opt)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    backgroundColor: active ? info.color + '25' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${active ? info.color + '60' : 'rgba(255,255,255,0.08)'}`,
                    color: active ? info.color : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {info.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Adversary */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Swords className="w-5 h-5" style={{ color: '#CC3333' }} />
          <h3 className="font-semibold text-lg text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Adversary</h3>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Source Serif 4', serif" }}>(optional)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={() => updateSession({ adversary: null, adversaryLevel: 0 })}
            className="text-left p-3 rounded-lg transition-all text-sm"
            style={optionBtnStyle(!session.adversary)}
          >
            <span className="font-medium text-white" style={{ fontFamily: "'Playfair Display', serif" }}>No Adversary</span>
          </button>
          {availableAdversaries.map(adv => (
            <button
              key={adv.name}
              onClick={() => updateSession({ adversary: adv.name })}
              className="text-left p-3 rounded-lg transition-all text-sm"
              style={optionBtnStyle(session.adversary === adv.name)}
            >
              <div className="font-medium text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{adv.name}</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>{adv.description}</div>
            </button>
          ))}
        </div>

        {session.adversary && (
          <div className="mt-3">
            <label className="text-xs mb-1 block" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>Adversary Level</label>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5, 6].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => updateSession({ adversaryLevel: lvl })}
                  className="w-10 h-10 rounded-lg font-bold transition-all"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    backgroundColor: session.adversaryLevel === lvl ? '#CC3333' : 'rgba(22, 46, 28, 0.6)',
                    color: session.adversaryLevel === lvl ? '#fff' : 'rgba(255,255,255,0.4)',
                    border: session.adversaryLevel === lvl ? '1px solid #CC3333' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', view: 'adversaries' })}
              className="mt-2 flex items-center gap-1 text-xs transition-colors"
              style={{ color: '#E06C5A', fontFamily: "'Source Serif 4', serif" }}
            >
              <Info className="w-3 h-3" />
              View full adversary details
            </button>
          </div>
        )}
      </div>

      {/* Scenario */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Scroll className="w-5 h-5" style={{ color: '#C5A55A' }} />
          <h3 className="font-semibold text-lg text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Scenario</h3>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Source Serif 4', serif" }}>(optional)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={() => updateSession({ scenario: null })}
            className="text-left p-3 rounded-lg transition-all text-sm"
            style={optionBtnStyle(!session.scenario)}
          >
            <span className="font-medium text-white" style={{ fontFamily: "'Playfair Display', serif" }}>No Scenario</span>
          </button>
          {availableScenarios.map(sc => (
            <button
              key={sc.name}
              onClick={() => updateSession({ scenario: sc.name })}
              className="text-left p-3 rounded-lg transition-all text-sm"
              style={optionBtnStyle(session.scenario === sc.name)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{sc.name}</span>
                <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}>
                  Diff: {sc.difficulty}
                </span>
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>{sc.description}</div>
            </button>
          ))}
        </div>
        <button
          onClick={() => dispatch({ type: 'SET_VIEW', view: 'scenarios' })}
          className="flex items-center gap-1 mt-3 text-xs transition-colors"
          style={{ color: 'rgba(126,200,160,0.6)', fontFamily: "'Source Serif 4', serif" }}
          onMouseEnter={e => (e.currentTarget.style.color = '#7EC8A0')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(126,200,160,0.6)')}
        >
          <Info size={12} />
          View full scenario details
        </button>
      </div>

      {/* Blight Card */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Skull className="w-5 h-5" style={{ color: '#6B4F3A' }} />
          <h3 className="font-semibold text-lg text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Blight Card</h3>
        </div>
        <select
          value={session.blightCard || ''}
          onChange={e => updateSession({ blightCard: e.target.value || null })}
          className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none"
          style={{
            fontFamily: "'Source Serif 4', serif",
            backgroundColor: 'rgba(22, 46, 28, 0.6)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          <option value="">Random (don't peek!)</option>
          {availableBlightCards.map(bc => (
            <option key={bc.name} value={bc.name}>{bc.name} ({bc.blightPerPlayer}/player)</option>
          ))}
        </select>
      </div>

      {/* Island Boards */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Map className="w-5 h-5" style={{ color: '#4CAF50' }} />
          <h3 className="font-semibold text-lg text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Island Boards</h3>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Source Serif 4', serif" }}>
            (select {session.playerCount} board{session.playerCount > 1 ? 's' : ''})
          </span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <label className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Serif 4', serif" }}>
            <input
              type="checkbox"
              checked={session.useThematicBoards}
              onChange={e => updateSession({ useThematicBoards: e.target.checked })}
              className="rounded"
            />
            Use Thematic Boards
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {availableBoards.map(board => {
            const selected = session.boards.includes(board.id);
            const warningPair = selected && session.boards.length <= 4 &&
              board.avoidPairingWith && session.boards.includes(board.avoidPairingWith);
            return (
              <button
                key={board.id}
                onClick={() => toggleBoard(board.id)}
                className="p-3 rounded-lg transition-all text-center"
                style={{
                  border: `2px solid ${selected ? (warningPair ? '#D4A843' : '#5BC0BE') : 'rgba(255,255,255,0.06)'}`,
                  backgroundColor: selected ? (warningPair ? 'rgba(212, 168, 67, 0.1)' : 'rgba(91, 192, 190, 0.1)') : 'rgba(22, 46, 28, 0.4)',
                }}
              >
                <div className="font-bold text-xl text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{board.id}</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>
                  {session.useThematicBoards ? board.thematicName : board.name}
                </div>
                {warningPair && (
                  <div className="text-[10px] mt-1" style={{ color: '#D4A843', fontFamily: "'Source Serif 4', serif" }}>
                    Avoid with {board.avoidPairingWith}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Event Deck Toggle */}
      {hasEventDeck && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="w-5 h-5" style={{ color: '#5BC0BE' }} />
            <h3 className="font-semibold text-lg text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Event Deck</h3>
          </div>
          <label
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{ backgroundColor: 'rgba(22, 46, 28, 0.4)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <input
              type="checkbox"
              checked={session.useEventDeck}
              onChange={e => updateSession({ useEventDeck: e.target.checked })}
              className="rounded"
            />
            <div>
              <div className="text-sm text-white" style={{ fontFamily: "'Source Serif 4', serif" }}>Use Event Deck</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Source Serif 4', serif" }}>
                Recommended with Branch & Claw or Jagged Earth
              </div>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}

/* ===== STEP 4: SETUP CHECKLIST ===== */
function ChecklistStep({ session, checklist, dispatch }: any) {
  const activeExpansions = ['base', ...session.expansions];

  const filteredSteps = SETUP_STEPS.map(group => ({
    ...group,
    items: group.items.filter(item => item.always || (item.expansion && activeExpansions.includes(item.expansion)))
  }));

  const totalItems = filteredSteps.reduce((sum, g) => sum + g.items.length, 0);
  const checkedItems = Object.values(checklist).filter(Boolean).length;
  const progress = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Setup Checklist
      </h2>
      <p className="mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Serif 4', serif" }}>
        Walk through each step to set up your game. Check off items as you complete them.
      </p>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>
            {checkedItems} of {totalItems} complete
          </span>
          <span className="text-sm font-bold" style={{ color: '#5BC0BE', fontFamily: "'Playfair Display', serif" }}>
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #5BC0BE, #D4A843)' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Session Summary */}
      <div className="mb-8 p-4 rounded-xl" style={{ backgroundColor: 'rgba(22, 46, 28, 0.5)', border: '1px solid rgba(91, 192, 190, 0.15)' }}>
        <h3 className="font-semibold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Session Summary</h3>
        <div className="grid grid-cols-2 gap-3 text-sm" style={{ fontFamily: "'Source Serif 4', serif" }}>
          <div>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>Players:</span>{' '}
            <span className="text-white">{session.playerCount}</span>
          </div>
          <div>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>Boards:</span>{' '}
            <span className="text-white">{session.boards.join(', ') || 'None'}</span>
          </div>
          <div>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>Adversary:</span>{' '}
            <span className="text-white">{session.adversary ? `${session.adversary} (Lvl ${session.adversaryLevel})` : 'None'}</span>
          </div>
          <div>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>Scenario:</span>{' '}
            <span className="text-white">{session.scenario || 'None'}</span>
          </div>
          {session.players.map((p: any, i: number) => (
            <div key={i} className="col-span-2">
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>{p.name}:</span>{' '}
              <span style={{ color: p.spirit ? '#5BC0BE' : 'rgba(255,255,255,0.3)' }}>{p.spirit || 'No spirit'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist Groups */}
      <div className="space-y-6">
        {filteredSteps.map((group) => (
          <div key={group.id}>
            <h3 className="font-semibold text-lg text-white mb-3 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#5BC0BE' }} />
              {group.title}
            </h3>
            <div className="space-y-2">
              {group.items.map((item) => {
                const checked = !!checklist[item.id];
                return (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => dispatch({ type: 'TOGGLE_CHECKLIST', itemId: item.id })}
                    className="w-full text-left p-3 rounded-lg transition-all flex items-start gap-3"
                    style={{
                      border: `1px solid ${checked ? 'rgba(91, 192, 190, 0.25)' : 'rgba(255,255,255,0.06)'}`,
                      backgroundColor: checked ? 'rgba(91, 192, 190, 0.05)' : 'rgba(22, 46, 28, 0.3)',
                    }}
                  >
                    <div
                      className="mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all"
                      style={{
                        borderColor: checked ? '#5BC0BE' : 'rgba(255,255,255,0.15)',
                        backgroundColor: checked ? '#5BC0BE' : 'transparent',
                      }}
                    >
                      {checked && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                      <span
                        className="text-sm transition-all"
                        style={{
                          fontFamily: "'Source Serif 4', serif",
                          color: checked ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.8)',
                          textDecoration: checked ? 'line-through' : 'none',
                        }}
                      >
                        {item.text}
                      </span>
                      {!item.always && item.expansion && (
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(91, 192, 190, 0.1)', color: '#5BC0BE' }}>
                          {EXPANSIONS.find(e => e.id === item.expansion)?.name}
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
