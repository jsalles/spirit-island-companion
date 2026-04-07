/**
 * Spirits Gallery Page — "Living Island" Design
 * Browsable, searchable collection of all 37 spirits with detail sheets
 */
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { ELEMENT_COLORS, COMPLEXITY_COLORS, EXPANSIONS, type Complexity } from '@/lib/gameData';
import { SPIRIT_DETAILS, ELEMENT_ICONS, getSpiritDetail, type SpiritDetail, type Element } from '@/lib/spiritDetails';
import SpiritDetailSheet from '@/components/SpiritDetailSheet';
import { Search, ChevronLeft, Filter, X } from 'lucide-react';

const FOREST_IMG = '/images/forest-mist.webp';

const ALL_ELEMENTS: Element[] = ['Sun', 'Moon', 'Fire', 'Air', 'Water', 'Earth', 'Plant', 'Animal'];
const ALL_COMPLEXITIES: Complexity[] = ['Low', 'Moderate', 'High', 'Very High'];

export default function Spirits() {
  const { dispatch } = useGame();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpansion, setSelectedExpansion] = useState<string | null>(null);
  const [selectedComplexity, setSelectedComplexity] = useState<Complexity | null>(null);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSpirit, setSelectedSpirit] = useState<SpiritDetail | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filteredSpirits = useMemo(() => {
    let result = [...SPIRIT_DETAILS];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.elements.some(e => e.toLowerCase().includes(q)) ||
        s.complexity.toLowerCase().includes(q) ||
        s.playStyle.toLowerCase().includes(q) ||
        s.specialRules.some(r => r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q))
      );
    }

    if (selectedExpansion) {
      result = result.filter(s => s.expansion === selectedExpansion);
    }
    if (selectedComplexity) {
      result = result.filter(s => s.complexity === selectedComplexity);
    }
    if (selectedElement) {
      result = result.filter(s => s.elements.includes(selectedElement));
    }

    return result;
  }, [searchQuery, selectedExpansion, selectedComplexity, selectedElement]);

  const activeFilterCount = [selectedExpansion, selectedComplexity, selectedElement].filter(Boolean).length;

  const openSpirit = (spirit: SpiritDetail) => {
    setSelectedSpirit(spirit);
    setSheetOpen(true);
  };

  const clearFilters = () => {
    setSelectedExpansion(null);
    setSelectedComplexity(null);
    setSelectedElement(null);
  };

  return (
    <div className="min-h-screen pb-16" style={{ backgroundColor: '#0b1d0e' }}>
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={FOREST_IMG} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1D0E]/50 via-[#0B1D0E]/80 to-[#0B1D0E]" />
        </div>
        <div className="relative z-10 container pt-8 pb-12">
          <button
            onClick={() => dispatch({ type: 'SET_VIEW', view: 'home' })}
            className="text-sm transition-colors flex items-center gap-1 mb-6"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}
          >
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Spirit <span style={{ color: '#D4A843' }}>Gallery</span>
            </h1>
            <p
              className="text-lg max-w-2xl"
              style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Source Serif 4', serif" }}
            >
              Explore all {SPIRIT_DETAILS.length} spirits across every expansion. View their growth options,
              innate powers, special rules, and element affinities.
            </p>
          </motion.div>

          {/* Search */}
          <div className="mt-8 flex gap-3">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search spirits by name, element, complexity, or ability..."
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(91, 192, 190, 0.15)',
                  color: 'rgba(255,255,255,0.85)',
                }}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                fontFamily: "'Source Serif 4', serif",
                backgroundColor: showFilters ? 'rgba(91, 192, 190, 0.15)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${showFilters ? 'rgba(91, 192, 190, 0.3)' : 'rgba(255,255,255,0.08)'}`,
                color: showFilters ? '#5BC0BE' : 'rgba(255,255,255,0.6)',
              }}
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span
                  className="w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold"
                  style={{ backgroundColor: '#5BC0BE', color: '#0B1D0E' }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-4 rounded-xl space-y-4" style={{ backgroundColor: 'rgba(22, 46, 28, 0.5)', border: '1px solid rgba(91, 192, 190, 0.1)' }}>
                  {/* Expansion Filter */}
                  <div>
                    <label className="text-xs mb-2 block" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>
                      Expansion
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {EXPANSIONS.map(exp => (
                        <button
                          key={exp.id}
                          onClick={() => setSelectedExpansion(selectedExpansion === exp.id ? null : exp.id)}
                          className="text-xs px-3 py-1.5 rounded-lg transition-all"
                          style={{
                            fontFamily: "'Source Serif 4', serif",
                            backgroundColor: selectedExpansion === exp.id ? 'rgba(91, 192, 190, 0.15)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${selectedExpansion === exp.id ? 'rgba(91, 192, 190, 0.4)' : 'rgba(255,255,255,0.06)'}`,
                            color: selectedExpansion === exp.id ? '#5BC0BE' : 'rgba(255,255,255,0.5)',
                          }}
                        >
                          {exp.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Complexity Filter */}
                  <div>
                    <label className="text-xs mb-2 block" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>
                      Complexity
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ALL_COMPLEXITIES.map(c => (
                        <button
                          key={c}
                          onClick={() => setSelectedComplexity(selectedComplexity === c ? null : c)}
                          className="text-xs px-3 py-1.5 rounded-lg transition-all"
                          style={{
                            fontFamily: "'Source Serif 4', serif",
                            backgroundColor: selectedComplexity === c ? COMPLEXITY_COLORS[c] + '20' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${selectedComplexity === c ? COMPLEXITY_COLORS[c] + '60' : 'rgba(255,255,255,0.06)'}`,
                            color: selectedComplexity === c ? COMPLEXITY_COLORS[c] : 'rgba(255,255,255,0.5)',
                          }}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Element Filter */}
                  <div>
                    <label className="text-xs mb-2 block" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>
                      Element
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ALL_ELEMENTS.map(el => (
                        <button
                          key={el}
                          onClick={() => setSelectedElement(selectedElement === el ? null : el)}
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
                          style={{
                            fontFamily: "'Source Serif 4', serif",
                            backgroundColor: selectedElement === el ? (ELEMENT_COLORS[el] || '#888') + '20' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${selectedElement === el ? (ELEMENT_COLORS[el] || '#888') + '60' : 'rgba(255,255,255,0.06)'}`,
                            color: selectedElement === el ? ELEMENT_COLORS[el] : 'rgba(255,255,255,0.5)',
                          }}
                        >
                          <span>{ELEMENT_ICONS[el]}</span> {el}
                        </button>
                      ))}
                    </div>
                  </div>

                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1 text-xs transition-colors"
                      style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}
                    >
                      <X className="w-3 h-3" /> Clear all filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results Count */}
      <div className="container mb-6">
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>
          Showing {filteredSpirits.length} of {SPIRIT_DETAILS.length} spirits
        </p>
      </div>

      {/* Spirit Grid */}
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSpirits.map((spirit, i) => (
              <motion.button
                key={spirit.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openSpirit(spirit)}
                className="text-left rounded-xl overflow-hidden transition-all group"
                style={{
                  backgroundColor: 'rgba(22, 46, 28, 0.4)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Color accent bar */}
                <div className="h-1" style={{ backgroundColor: spirit.themeColor }} />

                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3
                        className="text-sm font-bold text-white leading-tight mb-1 group-hover:text-[#5BC0BE] transition-colors"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {spirit.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded font-medium"
                          style={{
                            backgroundColor: COMPLEXITY_COLORS[spirit.complexity] + '20',
                            color: COMPLEXITY_COLORS[spirit.complexity],
                            fontFamily: "'Source Serif 4', serif",
                          }}
                        >
                          {spirit.complexity}
                        </span>
                        <span
                          className="text-[9px] uppercase tracking-wider"
                          style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Source Serif 4', serif" }}
                        >
                          {spirit.expansion.replace(/-/g, ' ')}
                        </span>
                      </div>
                    </div>
                    {/* Element dots */}
                    <div className="flex gap-1 flex-shrink-0 ml-2">
                      {spirit.elements.map(el => (
                        <div
                          key={el}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                          style={{ backgroundColor: (ELEMENT_COLORS[el] || '#888') + '20' }}
                          title={el}
                        >
                          {ELEMENT_ICONS[el]}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Play style preview */}
                  <p
                    className="text-xs leading-relaxed line-clamp-2 mb-3"
                    style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Source Serif 4', serif" }}
                  >
                    {spirit.playStyle}
                  </p>

                  {/* Power bars mini */}
                  <div className="flex gap-3">
                    {[
                      { key: 'offense', label: 'OFF', color: '#E85D3A' },
                      { key: 'control', label: 'CTL', color: '#3A7BD5' },
                      { key: 'fear', label: 'FER', color: '#9B8EC4' },
                      { key: 'defense', label: 'DEF', color: '#4CAF50' },
                      { key: 'utility', label: 'UTL', color: '#D4A843' },
                    ].map(({ key, label, color }) => {
                      const val = spirit.powerSummary[key as keyof typeof spirit.powerSummary];
                      return (
                        <div key={key} className="flex-1">
                          <div className="text-[8px] uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: "'Source Serif 4', serif" }}>
                            {label}
                          </div>
                          <div className="h-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ width: `${(val / 5) * 100}%`, backgroundColor: color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredSpirits.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-4xl mb-4">🌿</div>
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              No spirits found
            </h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>
              Try adjusting your search or filters.
            </p>
            <button
              onClick={() => { setSearchQuery(''); clearFilters(); }}
              className="mt-4 text-sm px-4 py-2 rounded-lg transition-colors"
              style={{ color: '#5BC0BE', backgroundColor: 'rgba(91, 192, 190, 0.1)', fontFamily: "'Source Serif 4', serif" }}
            >
              Clear all
            </button>
          </motion.div>
        )}
      </div>

      {/* Spirit Detail Sheet */}
      <SpiritDetailSheet
        spirit={selectedSpirit}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </div>
  );
}
