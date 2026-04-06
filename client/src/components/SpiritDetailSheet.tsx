/**
 * SpiritDetailSheet — Reusable side-sheet showing full spirit profile
 * Design: "Living Island" — organic shapes, element colors, amber accents
 */
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Shield, Eye, Swords, Wrench, ChevronRight } from 'lucide-react';
import { ELEMENT_COLORS, COMPLEXITY_COLORS, type Complexity } from '@/lib/gameData';
import type { SpiritDetail } from '@/lib/spiritDetails';
import { ELEMENT_ICONS } from '@/lib/spiritDetails';

interface SpiritDetailSheetProps {
  spirit: SpiritDetail | null;
  open: boolean;
  onClose: () => void;
}

const POWER_LABELS = [
  { key: 'offense', label: 'Offense', icon: Swords, color: '#E85D3A' },
  { key: 'control', label: 'Control', icon: Shield, color: '#3A7BD5' },
  { key: 'fear', label: 'Fear', icon: Eye, color: '#9B8EC4' },
  { key: 'defense', label: 'Defense', icon: Shield, color: '#4CAF50' },
  { key: 'utility', label: 'Utility', icon: Wrench, color: '#D4A843' },
] as const;

export default function SpiritDetailSheet({ spirit, open, onClose }: SpiritDetailSheetProps) {
  if (!spirit) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xl overflow-y-auto"
            style={{ backgroundColor: '#0d2412', borderLeft: '1px solid rgba(91, 192, 190, 0.15)' }}
          >
            {/* Header with gradient */}
            <div
              className="sticky top-0 z-10 px-6 pt-6 pb-4"
              style={{
                background: `linear-gradient(180deg, ${spirit.themeColor}20 0%, #0d2412 100%)`,
                borderBottom: '1px solid rgba(91, 192, 190, 0.1)',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: spirit.themeColor + '25',
                        color: spirit.themeColor,
                        fontFamily: "'Source Serif 4', serif",
                      }}
                    >
                      {spirit.expansion.replace(/-/g, ' ')}
                    </span>
                    <span
                      className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: COMPLEXITY_COLORS[spirit.complexity as Complexity] + '25',
                        color: COMPLEXITY_COLORS[spirit.complexity as Complexity],
                        fontFamily: "'Source Serif 4', serif",
                      }}
                    >
                      {spirit.complexity}
                    </span>
                  </div>
                  <h2
                    className="text-2xl font-bold text-white leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {spirit.name}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg transition-colors hover:bg-white/10"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Elements */}
              <div className="flex gap-2 flex-wrap">
                {spirit.elements.map((el) => (
                  <span
                    key={el}
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      backgroundColor: (ELEMENT_COLORS[el] || '#888') + '20',
                      color: ELEMENT_COLORS[el] || '#888',
                      fontFamily: "'Source Serif 4', serif",
                    }}
                  >
                    <span>{ELEMENT_ICONS[el]}</span>
                    {el}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-8">
              {/* Lore */}
              <div
                className="text-sm italic leading-relaxed px-4 py-3 rounded-xl"
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: "'Source Serif 4', serif",
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderLeft: `3px solid ${spirit.themeColor}40`,
                }}
              >
                "{spirit.lore}"
              </div>

              {/* Setup */}
              <Section title="Setup" color={spirit.themeColor}>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Source Serif 4', serif" }}
                >
                  {spirit.setup}
                </p>
              </Section>

              {/* Play Style */}
              <Section title="Play Style" color={spirit.themeColor}>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Source Serif 4', serif" }}
                >
                  {spirit.playStyle}
                </p>
              </Section>

              {/* Power Summary */}
              <Section title="Power Summary" color={spirit.themeColor}>
                <div className="grid grid-cols-5 gap-2">
                  {POWER_LABELS.map(({ key, label, color }) => {
                    const val = spirit.powerSummary[key as keyof typeof spirit.powerSummary];
                    return (
                      <div key={key} className="text-center">
                        <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>
                          {label}
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map(i => (
                            <div
                              key={i}
                              className="w-full h-1.5 rounded-full"
                              style={{
                                backgroundColor: i <= val ? color : 'rgba(255,255,255,0.06)',
                                maxWidth: '40px',
                              }}
                            />
                          ))}
                        </div>
                        <div className="text-xs font-bold mt-1" style={{ color, fontFamily: "'Playfair Display', serif" }}>
                          {val}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Section>

              {/* Growth Options */}
              <Section title="Growth Options" color={spirit.themeColor}>
                <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>
                  Choose one growth option each turn
                </p>
                <div className="space-y-3">
                  {spirit.growthOptions.map((opt, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-3"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div className="text-xs font-semibold mb-2" style={{ color: '#D4A843', fontFamily: "'Playfair Display', serif" }}>
                        {opt.label}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {opt.actions.map((action, j) => (
                          <span
                            key={j}
                            className="text-xs px-2.5 py-1 rounded-lg"
                            style={{
                              backgroundColor: 'rgba(91, 192, 190, 0.08)',
                              color: 'rgba(255,255,255,0.7)',
                              fontFamily: "'Source Serif 4', serif",
                              border: '1px solid rgba(91, 192, 190, 0.12)',
                            }}
                          >
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Presence Tracks */}
              <Section title="Presence Tracks" color={spirit.themeColor}>
                <div className="space-y-4">
                  {spirit.presenceTracks.map((track, i) => (
                    <div key={i}>
                      <div className="text-xs font-semibold mb-2" style={{ color: '#D4A843', fontFamily: "'Playfair Display', serif" }}>
                        {track.label}
                      </div>
                      <div className="flex gap-1">
                        {track.values.map((val, j) => (
                          <div
                            key={j}
                            className="flex items-center justify-center rounded-lg text-xs font-bold"
                            style={{
                              width: '36px',
                              height: '36px',
                              backgroundColor: j === 0
                                ? spirit.themeColor + '30'
                                : 'rgba(255,255,255,0.04)',
                              color: j === 0 ? spirit.themeColor : 'rgba(255,255,255,0.6)',
                              border: j === 0
                                ? `1px solid ${spirit.themeColor}50`
                                : '1px solid rgba(255,255,255,0.06)',
                              fontFamily: "'Playfair Display', serif",
                            }}
                          >
                            {val}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Special Rules */}
              <Section title="Special Rules" color={spirit.themeColor}>
                <div className="space-y-3">
                  {spirit.specialRules.map((rule, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-4"
                      style={{
                        backgroundColor: 'rgba(212, 168, 67, 0.06)',
                        border: '1px solid rgba(212, 168, 67, 0.15)',
                      }}
                    >
                      <div className="text-sm font-semibold mb-1" style={{ color: '#D4A843', fontFamily: "'Playfair Display', serif" }}>
                        {rule.name}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Source Serif 4', serif" }}>
                        {rule.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Innate Powers */}
              <Section title="Innate Powers" color={spirit.themeColor}>
                <div className="space-y-4">
                  {spirit.innatePowers.map((power, i) => (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden"
                      style={{
                        border: '1px solid rgba(91, 192, 190, 0.15)',
                        backgroundColor: 'rgba(91, 192, 190, 0.04)',
                      }}
                    >
                      {/* Power Header */}
                      <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(91, 192, 190, 0.1)' }}>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {power.name}
                          </h4>
                          <span
                            className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium"
                            style={{
                              backgroundColor: power.speed === 'Fast' ? 'rgba(245, 197, 66, 0.15)' : 'rgba(58, 123, 213, 0.15)',
                              color: power.speed === 'Fast' ? '#F5C542' : '#3A7BD5',
                              fontFamily: "'Source Serif 4', serif",
                            }}
                          >
                            {power.speed === 'Fast' ? '⚡' : '🌊'} {power.speed}
                          </span>
                        </div>
                        {(power.range || power.target) && (
                          <div className="flex gap-3 text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>
                            {power.range && <span>Range: {power.range}</span>}
                            {power.target && <span>Target: {power.target}</span>}
                          </div>
                        )}
                      </div>

                      {/* Element Thresholds */}
                      <div className="px-4 py-3 space-y-3">
                        {power.levels.map((level, j) => (
                          <div key={j} className="flex gap-3">
                            {/* Element requirements */}
                            <div className="flex gap-1 flex-shrink-0 pt-0.5">
                              {Object.entries(level.elements).map(([el, count]) => (
                                <span
                                  key={el}
                                  className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded"
                                  style={{
                                    backgroundColor: (ELEMENT_COLORS[el] || '#888') + '20',
                                    color: ELEMENT_COLORS[el] || '#888',
                                  }}
                                >
                                  {ELEMENT_ICONS[el]}{count}
                                </span>
                              ))}
                            </div>
                            {/* Effect */}
                            <div className="flex items-start gap-2 flex-1">
                              <ChevronRight className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: spirit.themeColor }} />
                              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Source Serif 4', serif" }}>
                                {level.effect}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Bottom padding */}
              <div className="h-8" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-5 rounded-full" style={{ backgroundColor: color }} />
        <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
