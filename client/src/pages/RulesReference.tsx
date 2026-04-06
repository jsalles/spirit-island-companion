/*
 * Rules Reference Page — "Living Island" Design
 * Searchable, categorized rules quick-reference
 * Deep forest greens, organic shapes, amber/teal accents
 */
import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import {
  ChevronLeft, Search, X, ChevronDown, ChevronRight,
  Layout, Sparkles, Zap, Swords, Clock, Ghost, Flame,
  Puzzle, Trophy, Package, Lightbulb, BookOpen, ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { RULES_DATA, searchRules, type RuleCategory, type RuleEntry } from '@/lib/rulesData';

// Turtle icon replacement (lucide doesn't have turtle)
function TurtleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 10c-2 0-3.5 1-3.5 2.5S10 15 12 15s3.5-1 3.5-2.5S14 10 12 10z" />
      <path d="M5.5 13.5c-1 0-2-.5-2-1.5s1-2 2.5-2" />
      <path d="M18.5 13.5c1 0 2-.5 2-1.5s-1-2-2.5-2" />
      <path d="M12 10V7" />
      <path d="M9 15l-1.5 2" />
      <path d="M15 15l1.5 2" />
    </svg>
  );
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'layout': <Layout className="w-5 h-5" />,
  'sparkles': <Sparkles className="w-5 h-5" />,
  'zap': <Zap className="w-5 h-5" />,
  'swords': <Swords className="w-5 h-5" />,
  'turtle': <TurtleIcon className="w-5 h-5" />,
  'clock': <Clock className="w-5 h-5" />,
  'ghost': <Ghost className="w-5 h-5" />,
  'flame': <Flame className="w-5 h-5" />,
  'puzzle': <Puzzle className="w-5 h-5" />,
  'trophy': <Trophy className="w-5 h-5" />,
  'package': <Package className="w-5 h-5" />,
  'lightbulb': <Lightbulb className="w-5 h-5" />,
};

const FOREST_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663316422635/7or2XBJKrDChpLdNiLsCVc/forest-mist-Ar4wXohNL7EqThhHghgPB2.webp';

export default function RulesReference() {
  const { dispatch } = useGame();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set());
  const searchInputRef = useRef<HTMLInputElement>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const searchResults = useMemo(() => searchRules(searchQuery), [searchQuery]);
  const isSearching = searchQuery.trim().length > 0;

  // Focus search on Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setSearchQuery('');
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const toggleEntry = (id: string) => {
    setExpandedEntries(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    setSearchQuery('');
    categoryRefs.current[catId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navigateToEntry = (entryId: string, categoryId: string) => {
    setSearchQuery('');
    setActiveCategory(categoryId);
    setExpandedEntries(prev => new Set(prev).add(entryId));
    // Small delay to let the category render, then scroll
    setTimeout(() => {
      const el = document.getElementById(`rule-${entryId}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const regex = new RegExp(`(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      terms.some(t => part.toLowerCase() === t)
        ? <mark key={i} className="bg-transparent font-semibold" style={{ color: '#D4A843' }}>{part}</mark>
        : part
    );
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#0b1d0e' }}>
      {/* Header with background image */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={FOREST_IMG} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1D0E]/50 via-[#0B1D0E]/80 to-[#0B1D0E]" />
        </div>

        <div className="relative z-10 container pt-6 pb-12">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => dispatch({ type: 'SET_VIEW', view: 'home' })}
            className="flex items-center gap-2 mb-8 text-sm transition-colors"
            style={{ color: 'rgba(255,255,255,0.6)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#5BC0BE')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            onClick={() => dispatch({ type: 'SET_VIEW', view: 'spirits' })}
            className="flex items-center gap-1 text-sm transition-colors ml-4"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}
            onMouseEnter={e => (e.currentTarget.style.color = '#9B8EC4')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
          >
            Spirit Gallery <ArrowRight className="w-3 h-3" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            onClick={() => dispatch({ type: 'SET_VIEW', view: 'adversaries' })}
            className="flex items-center gap-1 text-sm transition-colors ml-4"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}
            onMouseEnter={e => (e.currentTarget.style.color = '#E06C5A')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
          >
            Adversaries <ArrowRight className="w-3 h-3" />
          </motion.button>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="w-7 h-7" style={{ color: '#5BC0BE' }} />
              <span className="text-sm tracking-[0.2em] uppercase" style={{ color: '#5BC0BE', fontFamily: "'Cormorant Garamond', serif" }}>
                Quick Reference
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Rules <span style={{ color: '#D4A843' }}>Reference</span>
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Source Serif 4', serif" }}>
              Search any game mechanic, browse by category, or look up specific rules.
              Everything you need to know about Spirit Island in one place.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 relative max-w-2xl"
          >
            <div
              className="relative flex items-center rounded-xl border transition-all duration-300 overflow-hidden"
              style={{
                backgroundColor: 'rgba(11, 29, 14, 0.8)',
                borderColor: searchQuery ? '#5BC0BE' : 'rgba(91, 192, 190, 0.2)',
                boxShadow: searchQuery ? '0 0 20px rgba(91, 192, 190, 0.15)' : 'none',
              }}
            >
              <Search className="w-5 h-5 ml-4 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search rules... (e.g., Ravage, Dahan, Fear Cards, Blight Cascade)"
                className="w-full px-4 py-4 bg-transparent text-white placeholder:text-white/30 focus:outline-none"
                style={{ fontFamily: "'Source Serif 4', serif" }}
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); searchInputRef.current?.focus(); }}
                  className="mr-3 p-1 rounded-md transition-colors"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div
                className="hidden md:flex items-center mr-4 px-2 py-1 rounded text-xs"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }}
              >
                ⌘K
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search Results */}
      <AnimatePresence mode="wait">
        {isSearching && (
          <motion.div
            key="search-results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="container pb-16"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Serif 4', serif" }}>
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for
              </span>
              <span className="text-sm font-semibold" style={{ color: '#5BC0BE', fontFamily: "'Source Serif 4', serif" }}>
                "{searchQuery}"
              </span>
            </div>

            {searchResults.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(91, 192, 190, 0.1)' }}
                >
                  <Search className="w-7 h-7" style={{ color: 'rgba(91, 192, 190, 0.4)' }} />
                </div>
                <p className="text-lg mb-2" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Playfair Display', serif" }}>
                  No rules found
                </p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Source Serif 4', serif" }}>
                  Try different keywords like "ravage," "fear," "blight," or "defend"
                </p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {searchResults.map((entry, i) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <SearchResultCard
                      entry={entry}
                      query={searchQuery}
                      highlightText={highlightText}
                      onNavigate={() => navigateToEntry(entry.id, entry.categoryId)}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Navigation + Content */}
      {!isSearching && (
        <div className="container pb-20">
          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <div className="flex flex-wrap gap-2">
              {RULES_DATA.map((cat, i) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                  onClick={() => scrollToCategory(cat.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-all duration-200"
                  style={{
                    backgroundColor: activeCategory === cat.id ? cat.color + '20' : 'rgba(11, 29, 14, 0.6)',
                    borderColor: activeCategory === cat.id ? cat.color + '50' : 'rgba(91, 192, 190, 0.12)',
                    color: activeCategory === cat.id ? cat.color : 'rgba(255,255,255,0.6)',
                    fontFamily: "'Source Serif 4', serif",
                  }}
                  onMouseEnter={e => {
                    if (activeCategory !== cat.id) {
                      (e.currentTarget as HTMLElement).style.borderColor = cat.color + '40';
                      (e.currentTarget as HTMLElement).style.color = cat.color;
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeCategory !== cat.id) {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(91, 192, 190, 0.12)';
                      (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                    }
                  }}
                >
                  <span style={{ color: cat.color }}>{CATEGORY_ICONS[cat.icon]}</span>
                  {cat.title}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* All Categories */}
          <div className="space-y-12">
            {RULES_DATA.map((category, catIndex) => (
              <motion.div
                key={category.id}
                ref={el => { categoryRefs.current[category.id] = el; }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: catIndex * 0.05 }}
                className="scroll-mt-24"
              >
                <CategorySection
                  category={category}
                  expandedEntries={expandedEntries}
                  onToggleEntry={toggleEntry}
                  onNavigateToEntry={navigateToEntry}
                />
              </motion.div>
            ))}
          </div>
        </div>
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

/* ─── Search Result Card ─── */
function SearchResultCard({
  entry,
  query,
  highlightText,
  onNavigate,
}: {
  entry: RuleEntry & { categoryId: string; categoryTitle: string; categoryColor: string };
  query: string;
  highlightText: (text: string, query: string) => React.ReactNode;
  onNavigate: () => void;
}) {
  // Truncate content for preview
  const previewLength = 200;
  const preview = entry.content.length > previewLength
    ? entry.content.substring(0, previewLength) + '...'
    : entry.content;

  return (
    <button
      onClick={onNavigate}
      className="w-full text-left p-5 rounded-xl border transition-all duration-200 group"
      style={{
        backgroundColor: 'rgba(11, 29, 14, 0.6)',
        borderColor: 'rgba(91, 192, 190, 0.1)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = entry.categoryColor + '40';
        (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(11, 29, 14, 0.8)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(91, 192, 190, 0.1)';
        (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(11, 29, 14, 0.6)';
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{
                backgroundColor: entry.categoryColor + '15',
                color: entry.categoryColor,
                fontFamily: "'Source Serif 4', serif",
              }}
            >
              {entry.categoryTitle}
            </span>
            {entry.expansion && (
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{
                  backgroundColor: 'rgba(212, 168, 67, 0.1)',
                  color: '#D4A843',
                  fontFamily: "'Source Serif 4', serif",
                }}
              >
                {entry.expansion}
              </span>
            )}
          </div>
          <h3
            className="text-lg font-semibold text-white mb-1.5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {highlightText(entry.title, query)}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Serif 4', serif" }}
          >
            {highlightText(preview, query)}
          </p>
        </div>
        <ArrowRight
          className="w-5 h-5 flex-shrink-0 mt-1 transition-transform group-hover:translate-x-1"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        />
      </div>
    </button>
  );
}

/* ─── Category Section ─── */
function CategorySection({
  category,
  expandedEntries,
  onToggleEntry,
  onNavigateToEntry,
}: {
  category: RuleCategory;
  expandedEntries: Set<string>;
  onToggleEntry: (id: string) => void;
  onNavigateToEntry: (entryId: string, categoryId: string) => void;
}) {
  return (
    <div>
      {/* Category Header */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: category.color + '15', color: category.color }}
        >
          {CATEGORY_ICONS[category.icon]}
        </div>
        <div>
          <h2
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {category.title}
          </h2>
          <p
            className="text-sm mt-0.5"
            style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Source Serif 4', serif" }}
          >
            {category.description}
          </p>
        </div>
      </div>

      {/* Entries */}
      <div className="space-y-2 ml-0 md:ml-14">
        {category.entries.map(entry => (
          <RuleEntryCard
            key={entry.id}
            entry={entry}
            category={category}
            isExpanded={expandedEntries.has(entry.id)}
            onToggle={() => onToggleEntry(entry.id)}
            onNavigateToEntry={onNavigateToEntry}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Rule Entry Card ─── */
function RuleEntryCard({
  entry,
  category,
  isExpanded,
  onToggle,
  onNavigateToEntry,
}: {
  entry: RuleEntry;
  category: RuleCategory;
  isExpanded: boolean;
  onToggle: () => void;
  onNavigateToEntry: (entryId: string, categoryId: string) => void;
}) {
  // Find related entry titles
  const relatedEntries = useMemo(() => {
    if (!entry.related) return [];
    return entry.related.map(relId => {
      for (const cat of RULES_DATA) {
        const found = cat.entries.find(e => e.id === relId);
        if (found) return { ...found, categoryId: cat.id, categoryTitle: cat.title };
      }
      return null;
    }).filter(Boolean) as (RuleEntry & { categoryId: string; categoryTitle: string })[];
  }, [entry.related]);

  return (
    <div
      id={`rule-${entry.id}`}
      className="rounded-xl border overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: isExpanded ? 'rgba(11, 29, 14, 0.8)' : 'rgba(11, 29, 14, 0.4)',
        borderColor: isExpanded ? category.color + '30' : 'rgba(91, 192, 190, 0.08)',
      }}
    >
      {/* Header (always visible) */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left transition-colors group"
        onMouseEnter={e => {
          if (!isExpanded) (e.currentTarget.parentElement as HTMLElement).style.borderColor = category.color + '25';
        }}
        onMouseLeave={e => {
          if (!isExpanded) (e.currentTarget.parentElement as HTMLElement).style.borderColor = 'rgba(91, 192, 190, 0.08)';
        }}
      >
        <div className="flex items-center gap-3 flex-1">
          <h3
            className="text-base font-semibold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {entry.title}
          </h3>
          {entry.expansion && (
            <span
              className="hidden sm:inline-block px-2 py-0.5 rounded-full text-xs flex-shrink-0"
              style={{
                backgroundColor: 'rgba(212, 168, 67, 0.1)',
                color: '#D4A843',
                fontFamily: "'Source Serif 4', serif",
              }}
            >
              {entry.expansion}
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }} />
        </motion.div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-5 pb-5">
              {/* Divider */}
              <div className="h-px mb-4" style={{ backgroundColor: category.color + '15' }} />

              {/* Content */}
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Source Serif 4', serif" }}
              >
                {entry.content}
              </p>

              {/* Tip */}
              {entry.tip && (
                <div
                  className="flex gap-3 p-3.5 rounded-lg mb-4"
                  style={{ backgroundColor: 'rgba(212, 168, 67, 0.08)', borderLeft: '3px solid #D4A843' }}
                >
                  <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#D4A843' }} />
                  <p
                    className="text-sm"
                    style={{ color: 'rgba(212, 168, 67, 0.85)', fontFamily: "'Source Serif 4', serif" }}
                  >
                    {entry.tip}
                  </p>
                </div>
              )}

              {/* Keywords */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {entry.keywords.slice(0, 8).map(kw => (
                  <span
                    key={kw}
                    className="px-2 py-0.5 rounded text-xs"
                    style={{
                      backgroundColor: 'rgba(91, 192, 190, 0.08)',
                      color: 'rgba(91, 192, 190, 0.6)',
                      fontFamily: "'Source Serif 4', serif",
                    }}
                  >
                    {kw}
                  </span>
                ))}
              </div>

              {/* Related entries */}
              {relatedEntries.length > 0 && (
                <div>
                  <p
                    className="text-xs mb-2 uppercase tracking-wider"
                    style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Source Serif 4', serif" }}
                  >
                    Related Rules
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {relatedEntries.map(rel => (
                      <button
                        key={rel.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToEntry(rel.id, rel.categoryId);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all duration-200"
                        style={{
                          backgroundColor: 'rgba(91, 192, 190, 0.05)',
                          borderColor: 'rgba(91, 192, 190, 0.12)',
                          color: 'rgba(255,255,255,0.6)',
                          fontFamily: "'Source Serif 4', serif",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = '#5BC0BE50';
                          (e.currentTarget as HTMLElement).style.color = '#5BC0BE';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(91, 192, 190, 0.12)';
                          (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                        }}
                      >
                        <ExternalLink className="w-3 h-3" />
                        {rel.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
