/**
 * Landing Page — Game Selector
 * Split-screen design: Spirit Island (mystical/nature) vs Final Girl (horror/dark)
 */
import { motion } from 'framer-motion';
import { Leaf, Skull, ChevronRight } from 'lucide-react';

const LANDING_HERO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663316422635/7or2XBJKrDChpLdNiLsCVc/landing-page-hero-XkK3VTcHqM2uqNB52F44UA.webp';

interface LandingPageProps {
  onSelectGame: (game: 'spirit-island' | 'final-girl') => void;
}

export default function LandingPage({ onSelectGame }: LandingPageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={LANDING_HERO}
          alt="Game Selection"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-30 pt-8 md:pt-12 text-center"
      >
        <h1
          className="text-3xl md:text-4xl font-bold text-white tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Board Game Companion
        </h1>
        <p
          className="mt-2 text-sm md:text-base"
          style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Source Serif 4', serif" }}
        >
          Choose your adventure
        </p>
      </motion.header>

      {/* Game Selection Cards */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 min-h-[calc(100vh-160px)] px-4 md:px-8 py-12">
        {/* Spirit Island Card */}
        <motion.button
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          whileHover={{ scale: 1.03, y: -8 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelectGame('spirit-island')}
          className="group relative w-full md:w-[420px] h-[320px] md:h-[400px] rounded-3xl overflow-hidden border-2 transition-all duration-500"
          style={{ borderColor: 'rgba(91, 192, 190, 0.3)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(91, 192, 190, 0.8)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(91, 192, 190, 0.3)'; }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1D0E] via-[#132b17] to-[#0B1D0E]" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_left,_rgba(91,192,190,0.4),_transparent_60%)]" />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: i % 2 === 0 ? '#5BC0BE' : '#D4A843',
                  left: `${15 + i * 14}%`,
                  bottom: '-10%',
                  opacity: 0.4,
                }}
                animate={{
                  y: [0, -300],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
            <motion.div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
              style={{ backgroundColor: 'rgba(91, 192, 190, 0.15)' }}
              whileHover={{ rotate: 5 }}
            >
              <Leaf className="w-10 h-10" style={{ color: '#5BC0BE' }} />
            </motion.div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Spirit Island
            </h2>
            <p
              className="text-sm md:text-base max-w-xs leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Source Serif 4', serif" }}
            >
              Defend the island as powerful spirits. Cooperative strategy against colonial invaders.
            </p>
            <div
              className="mt-6 flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3"
              style={{ color: '#5BC0BE' }}
            >
              <span>Enter</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Glow effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,_rgba(91,192,190,0.1),_transparent_70%)]" />
        </motion.button>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="hidden md:block w-px h-48 bg-gradient-to-b from-transparent via-white/20 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="md:hidden w-48 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        {/* Final Girl Card */}
        <motion.button
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          whileHover={{ scale: 1.03, y: -8 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelectGame('final-girl')}
          className="group relative w-full md:w-[420px] h-[320px] md:h-[400px] rounded-3xl overflow-hidden border-2 transition-all duration-500"
          style={{ borderColor: 'rgba(220, 38, 38, 0.3)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220, 38, 38, 0.8)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220, 38, 38, 0.3)'; }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a0a] via-[#1f0f0f] to-[#0d0505]" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(220,38,38,0.4),_transparent_60%)]" />

          {/* Blood drip effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 rounded-full"
                style={{
                  backgroundColor: '#dc2626',
                  left: `${20 + i * 15}%`,
                  top: '-5%',
                  height: '30px',
                  opacity: 0.3,
                }}
                animate={{
                  y: [0, 400],
                  opacity: [0.3, 0.6, 0],
                }}
                transition={{
                  duration: 5 + i * 0.7,
                  repeat: Infinity,
                  delay: i * 1.2,
                  ease: 'easeIn',
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
            <motion.div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
              style={{ backgroundColor: 'rgba(220, 38, 38, 0.15)' }}
              whileHover={{ rotate: -5 }}
            >
              <Skull className="w-10 h-10" style={{ color: '#dc2626' }} />
            </motion.div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Final Girl
            </h2>
            <p
              className="text-sm md:text-base max-w-xs leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Source Serif 4', serif" }}
            >
              Survive the horror. Solo game of terror where you are the last one standing against the Killer.
            </p>
            <div
              className="mt-6 flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3"
              style={{ color: '#dc2626' }}
            >
              <span>Enter</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Glow effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,_rgba(220,38,38,0.1),_transparent_70%)]" />
        </motion.button>
      </div>

      {/* Footer */}
      <footer className="relative z-20 pb-6 text-center">
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Source Serif 4', serif" }}>
          Unofficial fan-made companion apps. Not affiliated with the game publishers.
        </p>
      </footer>
    </div>
  );
}
