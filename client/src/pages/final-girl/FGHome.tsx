/**
 * Final Girl Home Page — Horror Theme
 * Deep blacks, blood reds, film grain texture
 * VHS horror aesthetic with modern polish
 */
import { motion } from 'framer-motion';
import { useFinalGirl } from '@/contexts/FinalGirlContext';
import { Play, BookOpen, History, Film, Skull, ArrowLeft } from 'lucide-react';

const HERO_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663316422635/7or2XBJKrDChpLdNiLsCVc/fg-hero-banner-PGXy8RrhyWXqSZHd2aqPh2.webp';
const KILLER_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663316422635/7or2XBJKrDChpLdNiLsCVc/fg-killer-collage-C5eXbX5YoxcQwqR45mPdPK.webp';
const SETUP_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663316422635/7or2XBJKrDChpLdNiLsCVc/fg-setup-bg-NSeVrhhAGf3cF4Jt6WZ7iR.webp';

interface FGHomeProps {
  onBack: () => void;
}

export default function FGHome({ onBack }: FGHomeProps) {
  const { startNewSession, dispatch, state } = useFinalGirl();

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0a0505' }}>
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onBack}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10"
        style={{ color: 'rgba(255,255,255,0.7)' }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </motion.button>

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-end">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Final Girl" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0505] via-[#0a0505]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0505]/60 to-transparent" />
          {/* Film grain overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          }} />
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
              <Skull className="w-6 h-6" style={{ color: '#dc2626' }} />
              <span className="text-lg tracking-[0.25em] uppercase" style={{ color: '#dc2626', fontFamily: "'Playfair Display', serif", fontWeight: 500 }}>
                Companion App
              </span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Final<br />
              <span style={{ color: '#dc2626' }}>Girl</span>
            </h1>
            <p className="text-lg md:text-xl max-w-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Source Serif 4', serif" }}>
              Survive the horror. Randomize your Feature Film, track your game,
              and fight to be the last one standing.
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
            description="Select your Feature Films, randomize the Killer and Location, and get a full setup checklist."
            accentColor="#dc2626"
            onClick={startNewSession}
            delay={0.2}
          />
          <ActionCard
            icon={<BookOpen className="w-7 h-7" />}
            title="Rules Reference"
            description="Quick access to turn phases, Horror Rolls, Bloodlust, and all game mechanics."
            accentColor="#f97316"
            onClick={() => dispatch({ type: 'SET_VIEW', view: 'rules' })}
            delay={0.35}
          />
          <ActionCard
            icon={<Film className="w-7 h-7" />}
            title="Feature Films"
            description="Browse all 20 Feature Films with Killers, Locations, and Final Girls from every series."
            accentColor="#a855f7"
            onClick={() => dispatch({ type: 'SET_VIEW', view: 'films' })}
            delay={0.5}
          />
          <ActionCard
            icon={<History className="w-7 h-7" />}
            title="Session History"
            description="Review past games, survival records, and export your history."
            accentColor="#eab308"
            onClick={() => dispatch({ type: 'SET_VIEW', view: 'history' })}
            delay={0.65}
          />
        </div>
      </section>

      {/* Killer Showcase */}
      <section className="relative z-20 pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <img src={KILLER_IMG} alt="Killers" className="w-full h-64 md:h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0505] via-[#0a0505]/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                20 Killers Across 4 Series
              </h2>
              <p className="max-w-2xl text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Source Serif 4', serif" }}>
                From the brutal Hans the Butcher to the terrifying Evomorph, each Killer brings unique mechanics and Dark Powers.
                Mix and match any Killer with any Location for endless replayability.
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
              <img src={SETUP_IMG} alt="Game setup" className="w-full h-56 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0505] via-[#0a0505]/70 to-[#0a0505]/30" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Skull className="w-5 h-5" style={{ color: '#dc2626' }} />
                  <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Guided Gameplay
                  </h3>
                </div>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Source Serif 4', serif" }}>
                  Track every phase: Action, Planning, Killer, Panic, and Upkeep. Never miss a step in the heat of survival.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl p-6 border"
              style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)', borderColor: 'rgba(220, 38, 38, 0.2)' }}
            >
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#dc2626' }}>
                What's Tracked
              </h3>
              <div className="space-y-3">
                {[
                  'All 20 Feature Films across 4 series',
                  'Killer & Location mix-and-match',
                  'Final Girl selection with abilities',
                  'Turn-by-turn phase guidance',
                  'Victims killed & saved tracking',
                  'Win/loss records and session notes',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#dc2626' }} />
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Source Serif 4', serif" }}>
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
            <h2 className="text-2xl font-bold mb-8 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Your Survival Record</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Games Played" value={state.sessionHistory.length} />
              <StatCard label="Survived" value={state.sessionHistory.filter(s => s.result === 'win').length} />
              <StatCard
                label="Killers Faced"
                value={new Set(state.sessionHistory.map(s => s.killer).filter(Boolean)).size}
              />
              <StatCard
                label="Survival Rate"
                value={`${Math.round((state.sessionHistory.filter(s => s.result === 'win').length / Math.max(state.sessionHistory.length, 1)) * 100)}%`}
              />
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative z-20 border-t py-8" style={{ borderColor: 'rgba(220, 38, 38, 0.1)' }}>
        <div className="container text-center">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Source Serif 4', serif" }}>
            Final Girl is designed by Evan Derrick & A.J. Porfirio and published by Van Ryder Games.
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
        backgroundColor: 'rgba(10, 5, 5, 0.8)',
        borderColor: 'rgba(220, 38, 38, 0.15)',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = accentColor + '50'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220, 38, 38, 0.15)'; }}
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
    <div className="p-5 rounded-xl border" style={{ backgroundColor: 'rgba(10, 5, 5, 0.6)', borderColor: 'rgba(220, 38, 38, 0.15)' }}>
      <div className="text-3xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: '#dc2626' }}>{value}</div>
      <div className="text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Serif 4', serif" }}>{label}</div>
    </div>
  );
}
