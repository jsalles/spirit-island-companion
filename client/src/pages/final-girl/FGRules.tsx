/**
 * Final Girl Rules Reference — Searchable rules database
 * Horror theme with blood-red accents
 */
import { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { FG_RULES_DATA, FG_RULES_CATEGORIES, searchFGRules, type FGRuleEntry } from '@/lib/finalGirlData';
import { ArrowLeft, Search, X, ChevronDown, ChevronUp } from 'lucide-react';

export default function FGRules() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEntries, setExpandedEntries] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filteredRules = useMemo(() => {
    if (searchQuery.trim()) {
      return searchFGRules(searchQuery);
    }
    if (activeCategory) {
      return FG_RULES_DATA.filter(r => r.category === activeCategory);
    }
    return FG_RULES_DATA;
  }, [searchQuery, activeCategory]);

  const toggleEntry = (id: string) => {
    setExpandedEntries(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToCategory = (cat: string) => {
    setActiveCategory(cat);
    setSearchQuery('');
  };

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
              Rules Reference
            </h1>
            <div className="w-16" />
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setActiveCategory(null); }}
              placeholder="Search rules..."
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border text-sm bg-transparent text-white placeholder:text-white/30 focus:outline-none focus:ring-1"
              style={{ borderColor: 'rgba(220, 38, 38, 0.2)', '--tw-ring-color': '#dc2626' } as React.CSSProperties}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => { setActiveCategory(null); setSearchQuery(''); }}
              className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all"
              style={{
                backgroundColor: !activeCategory ? '#dc2626' : 'rgba(255,255,255,0.05)',
                color: !activeCategory ? 'white' : 'rgba(255,255,255,0.5)',
              }}
            >
              All
            </button>
            {FG_RULES_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => scrollToCategory(cat)}
                className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all"
                style={{
                  backgroundColor: activeCategory === cat ? '#dc2626' : 'rgba(255,255,255,0.05)',
                  color: activeCategory === cat ? 'white' : 'rgba(255,255,255,0.5)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container py-6 pb-16">
        {filteredRules.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>No rules found for "{searchQuery}"</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRules.map((rule, i) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className="rounded-xl border overflow-hidden"
                style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(220, 38, 38, 0.1)' }}
              >
                <button
                  onClick={() => toggleEntry(rule.id)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex-1">
                    <p className="text-xs mb-1" style={{ color: '#dc2626' }}>{rule.category}</p>
                    <h3 className="text-sm font-semibold text-white">{rule.title}</h3>
                  </div>
                  {expandedEntries[rule.id] ? (
                    <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  ) : (
                    <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  )}
                </button>
                {expandedEntries[rule.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-4 pb-4"
                  >
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Source Serif 4', serif" }}>
                      {rule.content}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
