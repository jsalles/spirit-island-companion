/**
 * Final Girl Films Gallery — Browse all Feature Films
 * Horror theme with individual film cards
 */
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import {
  FEATURE_FILMS, SERIES_LABELS, DIFFICULTY_COLORS, getFinalGirlsByFilm,
  type FeatureFilm, type Series
} from '@/lib/finalGirlData';
import { ArrowLeft, X, Skull, MapPin, User, Heart, Zap, Shield } from 'lucide-react';

export default function FGFilms() {
  const [, setLocation] = useLocation();
  const [selectedFilm, setSelectedFilm] = useState<FeatureFilm | null>(null);
  const [filterSeries, setFilterSeries] = useState<Series | 'all'>('all');

  const filteredFilms = useMemo(() => {
    if (filterSeries === 'all') return FEATURE_FILMS;
    return FEATURE_FILMS.filter(f => f.series === filterSeries);
  }, [filterSeries]);

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#0a0505' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b backdrop-blur-xl" style={{ backgroundColor: 'rgba(10, 5, 5, 0.95)', borderColor: 'rgba(220, 38, 38, 0.15)' }}>
        <div className="container py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setLocation('/')}
              className="flex items-center gap-2 text-sm"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h1 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Feature Films
            </h1>
            <div className="w-16" />
          </div>

          {/* Series filter */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setFilterSeries('all')}
              className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all"
              style={{
                backgroundColor: filterSeries === 'all' ? '#dc2626' : 'rgba(255,255,255,0.05)',
                color: filterSeries === 'all' ? 'white' : 'rgba(255,255,255,0.5)',
              }}
            >
              All Films
            </button>
            {(Object.entries(SERIES_LABELS) as [Series, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilterSeries(key)}
                className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all"
                style={{
                  backgroundColor: filterSeries === key ? '#dc2626' : 'rgba(255,255,255,0.05)',
                  color: filterSeries === key ? 'white' : 'rgba(255,255,255,0.5)',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Films Grid */}
      <main className="container py-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFilms.map((film, i) => (
            <motion.button
              key={film.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedFilm(film)}
              className="text-left p-5 rounded-xl border transition-all"
              style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(220, 38, 38, 0.15)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', color: '#dc2626' }}>
                  {SERIES_LABELS[film.series]}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: DIFFICULTY_COLORS[film.killer.difficulty] + '20', color: DIFFICULTY_COLORS[film.killer.difficulty] }}>
                  {film.killer.difficulty}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {film.name}
              </h3>
              <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Serif 4', serif" }}>
                {film.description}
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Skull className="w-3 h-3" style={{ color: '#dc2626' }} />
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>{film.killer.name} — {film.killer.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3" style={{ color: '#f97316' }} />
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>{film.location.name}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </main>

      {/* Film Detail Modal */}
      <AnimatePresence>
        {selectedFilm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
            onClick={() => setSelectedFilm(null)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border"
              style={{ backgroundColor: '#1a0a0a', borderColor: 'rgba(220, 38, 38, 0.3)' }}
            >
              {/* Modal Header */}
              <div className="sticky top-0 flex items-center justify-between p-4 border-b" style={{ backgroundColor: '#1a0a0a', borderColor: 'rgba(220, 38, 38, 0.15)' }}>
                <div>
                  <span className="text-xs" style={{ color: '#dc2626' }}>{SERIES_LABELS[selectedFilm.series]}</span>
                  <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {selectedFilm.name}
                  </h2>
                </div>
                <button onClick={() => setSelectedFilm(null)} className="p-2 rounded-lg hover:bg-white/5">
                  <X className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.7)' }} />
                </button>
              </div>

              <div className="p-5 space-y-6">
                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Source Serif 4', serif" }}>
                  {selectedFilm.description}
                </p>
                <p className="text-xs italic" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Inspired by: {selectedFilm.horrorInspiration}
                </p>

                {/* Killer */}
                <div className="p-4 rounded-xl border" style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)', borderColor: 'rgba(220, 38, 38, 0.2)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Skull className="w-5 h-5" style={{ color: '#dc2626' }} />
                    <h3 className="text-base font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {selectedFilm.killer.name} — {selectedFilm.killer.title}
                    </h3>
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Source Serif 4', serif" }}>
                    {selectedFilm.killer.description}
                  </p>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center p-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                      <Heart className="w-4 h-4 mx-auto mb-1" style={{ color: '#dc2626' }} />
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Health</p>
                      <p className="text-sm font-bold text-white">{selectedFilm.killer.health}</p>
                    </div>
                    <div className="text-center p-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                      <Zap className="w-4 h-4 mx-auto mb-1" style={{ color: '#eab308' }} />
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Horror</p>
                      <p className="text-sm font-bold text-white">{selectedFilm.killer.startingHorror}</p>
                    </div>
                    <div className="text-center p-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                      <Shield className="w-4 h-4 mx-auto mb-1" style={{ color: DIFFICULTY_COLORS[selectedFilm.killer.difficulty] }} />
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Difficulty</p>
                      <p className="text-sm font-bold capitalize" style={{ color: DIFFICULTY_COLORS[selectedFilm.killer.difficulty] }}>{selectedFilm.killer.difficulty}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(168, 85, 247, 0.05)', borderColor: 'rgba(168, 85, 247, 0.2)' }}>
                    <p className="text-xs font-medium mb-1" style={{ color: '#a855f7' }}>Dark Power</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{selectedFilm.killer.darkPower}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="p-4 rounded-xl border" style={{ backgroundColor: 'rgba(249, 115, 22, 0.05)', borderColor: 'rgba(249, 115, 22, 0.2)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5" style={{ color: '#f97316' }} />
                    <h3 className="text-base font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {selectedFilm.location.name}
                    </h3>
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Source Serif 4', serif" }}>
                    {selectedFilm.location.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="text-center p-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Search Spaces</p>
                      <p className="text-sm font-bold text-white">{selectedFilm.location.searchSpaces}</p>
                    </div>
                    <div className="text-center p-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Exit Spaces</p>
                      <p className="text-sm font-bold text-white">{selectedFilm.location.exitSpaces}</p>
                    </div>
                  </div>
                  {selectedFilm.location.specialRules && (
                    <p className="text-xs italic" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Special: {selectedFilm.location.specialRules}
                    </p>
                  )}
                </div>

                {/* Final Girls */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5" style={{ color: '#a855f7' }} />
                    <h3 className="text-base font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Final Girls
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {getFinalGirlsByFilm(selectedFilm.id).map(fg => (
                      <div key={fg.id} className="p-3 rounded-lg border" style={{ backgroundColor: 'rgba(168, 85, 247, 0.05)', borderColor: 'rgba(168, 85, 247, 0.15)' }}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-white">{fg.name}</h4>
                          <span className="text-xs flex items-center gap-1" style={{ color: '#dc2626' }}>
                            <Heart className="w-3 h-3" /> {fg.health}
                          </span>
                        </div>
                        <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          <span style={{ color: '#eab308' }}>Ultimate:</span> {fg.ultimateAbility}
                        </p>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          <span style={{ color: '#22c55e' }}>Special:</span> {fg.specialAbility}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
