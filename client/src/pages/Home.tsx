/*
 * Home Page — "Living Island" Design
 * Deep forest greens, organic shapes, amber spirit glow
 * Hero section with mystical island imagery
 */
import { motion } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { Play, BookOpen, History, Leaf, Sparkles, Users, Shield, Scroll } from 'lucide-react';

const HERO_IMG = '/images/hero-island.webp';
const SPIRIT_IMG = '/images/spirit-gathering.webp';
const FOREST_IMG = '/images/forest-mist.webp';

export default function Home() {
  const { startNewSession, dispatch, state } = useGame();

  const openRulesReference = () => {
    dispatch({ type: 'SET_VIEW', view: 'rules' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0b1d0e' }}>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-end">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Spirit Island"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D0E] via-[#0B1D0E]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1D0E]/60 to-transparent" />
        </div>

        <div className="relative z-20 container pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Leaf className="w-6 h-6" style={{ color: '#5BC0BE' }} />
              <span className="text-lg tracking-[0.25em] uppercase" style={{ color: '#5BC0BE', fontFamily: "'Cormorant Garamond', serif" }}>
                Companion App
              </span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Spirit<br />
              <span style={{ color: '#D4A843' }}>Island</span>
            </h1>
            <p className="text-lg md:text-xl max-w-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Source Serif 4', serif" }}>
              Your guide through the mystical defense of the island.
              Set up games, track sessions, and master every phase of play.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Action Cards */}
      <section className="relative z-20 container -mt-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ActionCard
            icon={<Play className="w-7 h-7" />}
            title="New Game Session"
            description="Select expansions, choose spirits, and walk through the complete setup checklist."
            accentColor="#D4A843"
            onClick={startNewSession}
            delay={0.2}
          />
          <ActionCard
            icon={<BookOpen className="w-7 h-7" />}
            title="Rules Reference"
            description="Quick access to game phases, rules for each step, and expansion-specific changes."
            accentColor="#5BC0BE"
            onClick={openRulesReference}
            delay={0.35}
          />
          <ActionCard
            icon={<Users className="w-7 h-7" />}
            title="Spirit Gallery"
            description="Browse all 37 spirits with detailed profiles, innate powers, and growth options."
            accentColor="#9B8EC4"
            onClick={() => dispatch({ type: 'SET_VIEW', view: 'spirits' })}
            delay={0.5}
          />
          <ActionCard
            icon={<Shield className="w-7 h-7" />}
            title="Adversaries"
            description="Detailed profiles for all 8 colonial powers with level-by-level rules."
            accentColor="#E06C5A"
            onClick={() => dispatch({ type: 'SET_VIEW', view: 'adversaries' })}
            delay={0.65}
          />
          <ActionCard
            icon={<Scroll className="w-7 h-7" />}
            title="Scenarios"
            description="Detailed profiles for all 15 scenarios with rule changes and setup modifications."
            accentColor="#7EC8A0"
            onClick={() => dispatch({ type: 'SET_VIEW', view: 'scenarios' })}
            delay={0.8}
          />
          <ActionCard
            icon={<History className="w-7 h-7" />}
            title="Session History"
            description="Review past games, win/loss records, and session statistics."
            accentColor="#C5A55A"
            onClick={() => dispatch({ type: 'SET_VIEW', view: 'history' })}
            delay={0.95}
          />
        </div>
      </section>

      {/* Spirit Showcase */}
      <section className="relative z-20 pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <img
              src={SPIRIT_IMG}
              alt="Spirits gathering"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D0E] via-[#0B1D0E]/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                37 Spirits Across 6 Expansions
              </h2>
              <p className="max-w-2xl text-lg" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Source Serif 4', serif" }}>
                From the swift Lightning to the ancient Serpent, track every spirit in your collection.
                The companion guides you through setup for any combination of expansions and player counts.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="relative z-20 pb-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden"
            >
              <img src={FOREST_IMG} alt="Mystical forest" className="w-full h-56 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D0E] via-[#0B1D0E]/70 to-[#0B1D0E]/30" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5" style={{ color: '#D4A843' }} />
                  <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Step-by-Step Phases
                  </h3>
                </div>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Source Serif 4', serif" }}>
                  Never forget a step. The companion walks you through Spirit, Fast Power, Invader, Slow Power, and Time Passes phases with detailed explanations.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl p-6 border"
              style={{ backgroundColor: 'rgba(45, 90, 61, 0.15)', borderColor: 'rgba(91, 192, 190, 0.2)' }}
            >
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#5BC0BE' }}>
                What's Tracked
              </h3>
              <div className="space-y-3">
                {[
                  'All 6 expansions with their unique content',
                  'Player count, spirits, and colors',
                  'Adversary with difficulty level',
                  'Scenarios and modifiers',
                  'Blight cards and island boards',
                  'Win/loss conditions and turn count',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4A843' }} />
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Source Serif 4', serif" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      {state.sessionHistory.length > 0 && (
        <section className="relative z-20 pb-24">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Your Journey</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Games Played" value={state.sessionHistory.length} />
              <StatCard label="Victories" value={state.sessionHistory.filter(s => s.result === 'win').length} />
              <StatCard
                label="Spirits Used"
                value={new Set(state.sessionHistory.flatMap(s => s.players.map(p => p.spirit)).filter(Boolean)).size}
              />
              <StatCard
                label="Win Rate"
                value={`${Math.round((state.sessionHistory.filter(s => s.result === 'win').length / Math.max(state.sessionHistory.length, 1)) * 100)}%`}
              />
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative z-20 border-t py-8" style={{ borderColor: 'rgba(91, 192, 190, 0.1)' }}>
        <div className="container text-center">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Source Serif 4', serif" }}>
            Spirit Island is designed by R. Eric Reuss and published by Greater Than Games.
            This is an unofficial fan-made companion app.
          </p>
        </div>
      </footer>
    </div>
  );
}

function ActionCard({
  icon, title, description, accentColor, onClick, delay
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
  onClick: () => void;
  delay: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative text-left p-6 md:p-8 rounded-2xl border overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: 'rgba(11, 29, 14, 0.8)',
        borderColor: 'rgba(91, 192, 190, 0.15)',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = accentColor + '50'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(91, 192, 190, 0.15)'; }}
    >
      <div className="relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
          style={{ backgroundColor: accentColor + '20', color: accentColor }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Source Serif 4', serif" }}>{description}</p>
      </div>
    </motion.button>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-5 rounded-xl border" style={{ backgroundColor: 'rgba(11, 29, 14, 0.6)', borderColor: 'rgba(91, 192, 190, 0.15)' }}>
      <div className="text-3xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: '#D4A843' }}>{value}</div>
      <div className="text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Serif 4', serif" }}>{label}</div>
    </div>
  );
}
