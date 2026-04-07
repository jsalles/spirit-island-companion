// Adversaries Page — Spirit Island Companion
// Design: Living Island / Organic Nature UI
// Browsable adversary gallery with expandable detail profiles

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Shield, AlertTriangle, Swords, ChevronDown, ChevronUp, X, Skull, TrendingUp, BookOpen, Layers, Filter } from "lucide-react";
import { useGame } from "@/contexts/GameContext";
import { ADVERSARY_DETAILS, getDifficultyColor, getExpansionColor, type AdversaryDetail } from "@/lib/adversaryDetails";
import Particles from "@/components/Particles";

const FOREST_MIST_URL = "/images/forest-mist.webp";

// Expansion filter options
const EXPANSIONS = ["All", "Base Game", "Branch & Claw", "Jagged Earth", "Promo Pack 2", "Nature Incarnate"];

const DIFFICULTY_RANGES = [
  { label: "Low (1-3)", min: 1, max: 3 },
  { label: "Medium (4-6)", min: 4, max: 6 },
  { label: "High (7-9)", min: 7, max: 9 },
  { label: "Extreme (10+)", min: 10, max: 99 },
];

export default function Adversaries() {
  const { dispatch } = useGame();
  const [search, setSearch] = useState("");
  const [expansionFilter, setExpansionFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [difficultyRange, setDifficultyRange] = useState<{ min: number; max: number } | null>(null);
  const [hasLossCondition, setHasLossCondition] = useState<boolean | null>(null);
  const [expandedAdversary, setExpandedAdversary] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Record<string, number>>({});

  const activeFilterCount = [difficultyRange, hasLossCondition].filter(v => v !== null).length;

  const clearAdvancedFilters = () => {
    setDifficultyRange(null);
    setHasLossCondition(null);
  };

  const filtered = useMemo(() => {
    return ADVERSARY_DETAILS.filter((a) => {
      const matchSearch = search === "" ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.flavor.toLowerCase().includes(search.toLowerCase()) ||
        a.escalation.name.toLowerCase().includes(search.toLowerCase());
      const matchExpansion = expansionFilter === "All" || a.expansion === expansionFilter;
      const matchDifficulty = !difficultyRange ||
        a.levels.some(l => l.difficulty >= difficultyRange.min && l.difficulty <= difficultyRange.max);
      const matchLossCondition = hasLossCondition === null ||
        (hasLossCondition ? a.lossCondition !== null : a.lossCondition === null);
      return matchSearch && matchExpansion && matchDifficulty && matchLossCondition;
    });
  }, [search, expansionFilter, difficultyRange, hasLossCondition]);

  const toggleExpand = (id: string) => {
    setExpandedAdversary(prev => prev === id ? null : id);
  };

  const getSelectedLevel = (id: string) => selectedLevel[id] ?? 0;
  const setLevelForAdversary = (id: string, level: number) => {
    setSelectedLevel(prev => ({ ...prev, [id]: level }));
  };

  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(180deg, #0a1a0f 0%, #0d2818 30%, #0a1a0f 100%)" }}>
      <Particles />

      {/* Hero Banner */}
      <div className="relative h-56 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${FOREST_MIST_URL})`, filter: "brightness(0.4) saturate(1.2)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, #0a1a0f 100%)" }} />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6 max-w-6xl mx-auto">
          <button
            onClick={() => dispatch({ type: "SET_VIEW", view: "home" })}
            className="flex items-center gap-2 text-emerald-400/70 hover:text-emerald-300 transition-colors mb-4 w-fit"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back to Home</span>
          </button>
          <h1 className="font-display text-4xl md:text-5xl text-amber-100 tracking-tight">
            Adversaries
          </h1>
          <p className="text-emerald-300/60 mt-2 max-w-xl">
            Detailed profiles for all 8 colonial powers. Browse escalation rules, loss conditions, and level-by-level effects.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500/50" />
            <input
              type="text"
              placeholder="Search adversaries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl text-emerald-100 placeholder:text-emerald-600/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
              style={{ background: "rgba(16, 42, 28, 0.8)", border: "1px solid rgba(52, 211, 153, 0.15)" }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500/50 hover:text-emerald-300"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all shrink-0"
            style={{
              background: showFilters ? "rgba(52, 211, 153, 0.15)" : "rgba(16, 42, 28, 0.8)",
              border: `1px solid ${showFilters ? "rgba(52, 211, 153, 0.3)" : "rgba(52, 211, 153, 0.15)"}`,
              color: showFilters ? "#6ee7b7" : "rgba(167, 199, 183, 0.6)"
            }}
          >
            <Filter size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span
                className="w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold"
                style={{ backgroundColor: "#34d399", color: "#0a1a0f" }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Expansion Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {EXPANSIONS.map((exp) => (
            <button
              key={exp}
              onClick={() => setExpansionFilter(exp)}
              className="px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap"
              style={{
                background: expansionFilter === exp ? "rgba(52, 211, 153, 0.2)" : "rgba(16, 42, 28, 0.5)",
                border: `1px solid ${expansionFilter === exp ? "rgba(52, 211, 153, 0.4)" : "rgba(52, 211, 153, 0.1)"}`,
                color: expansionFilter === exp ? "#6ee7b7" : "rgba(167, 199, 183, 0.6)"
              }}
            >
              {exp}
            </button>
          ))}
        </div>

        {/* Collapsible Advanced Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-6"
            >
              <div
                className="p-4 rounded-xl space-y-4"
                style={{ background: "rgba(16, 42, 28, 0.6)", border: "1px solid rgba(52, 211, 153, 0.1)" }}
              >
                {/* Difficulty Range */}
                <div>
                  <label className="text-xs mb-2 block text-emerald-500/50 uppercase tracking-wider">Difficulty Range</label>
                  <div className="flex flex-wrap gap-2">
                    {DIFFICULTY_RANGES.map((range) => {
                      const isActive = difficultyRange?.min === range.min && difficultyRange?.max === range.max;
                      return (
                        <button
                          key={range.label}
                          onClick={() => setDifficultyRange(isActive ? null : range)}
                          className="text-xs px-3 py-1.5 rounded-lg transition-all"
                          style={{
                            background: isActive ? "rgba(52, 211, 153, 0.15)" : "rgba(255,255,255,0.03)",
                            border: `1px solid ${isActive ? "rgba(52, 211, 153, 0.4)" : "rgba(255,255,255,0.06)"}`,
                            color: isActive ? "#6ee7b7" : "rgba(167, 199, 183, 0.5)"
                          }}
                        >
                          {range.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Loss Condition Toggle */}
                <div>
                  <label className="text-xs mb-2 block text-emerald-500/50 uppercase tracking-wider">Loss Condition</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Has Extra Loss Condition", value: true },
                      { label: "Standard Loss Only", value: false },
                    ].map(({ label, value }) => {
                      const isActive = hasLossCondition === value;
                      return (
                        <button
                          key={label}
                          onClick={() => setHasLossCondition(isActive ? null : value)}
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
                          style={{
                            background: isActive ? (value ? "rgba(239,68,68,0.12)" : "rgba(52,211,153,0.12)") : "rgba(255,255,255,0.03)",
                            border: `1px solid ${isActive ? (value ? "rgba(239,68,68,0.3)" : "rgba(52,211,153,0.3)") : "rgba(255,255,255,0.06)"}`,
                            color: isActive ? (value ? "#f87171" : "#6ee7b7") : "rgba(167, 199, 183, 0.5)"
                          }}
                        >
                          {value && <AlertTriangle size={12} />}
                          {!value && <Shield size={12} />}
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAdvancedFilters}
                    className="flex items-center gap-1 text-xs text-emerald-500/50 hover:text-emerald-300 transition-colors"
                  >
                    <X size={12} /> Clear advanced filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <p className="text-emerald-500/50 text-sm mb-4">
          Showing {filtered.length} of {ADVERSARY_DETAILS.length} adversaries
        </p>

        {/* Adversary Cards */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((adversary, idx) => (
              <AdversaryCard
                key={adversary.id}
                adversary={adversary}
                index={idx}
                isExpanded={expandedAdversary === adversary.id}
                onToggle={() => toggleExpand(adversary.id)}
                selectedLevel={getSelectedLevel(adversary.id)}
                onSelectLevel={(level) => setLevelForAdversary(adversary.id, level)}
              />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Shield size={48} className="mx-auto mb-4 text-emerald-700/40" />
            <p className="text-emerald-500/50 text-lg">No adversaries match your search.</p>
            <button
              onClick={() => { setSearch(""); setExpansionFilter("All"); clearAdvancedFilters(); }}
              className="mt-3 text-emerald-400 hover:text-emerald-300 text-sm underline underline-offset-4"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// --- Adversary Card Component ---
function AdversaryCard({
  adversary,
  index,
  isExpanded,
  onToggle,
  selectedLevel,
  onSelectLevel
}: {
  adversary: AdversaryDetail;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  selectedLevel: number;
  onSelectLevel: (level: number) => void;
}) {
  const maxDifficulty = adversary.levels[adversary.levels.length - 1].difficulty;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(16, 42, 28, 0.9) 0%, rgba(10, 26, 15, 0.95) 100%)",
        border: isExpanded ? "1px solid rgba(52, 211, 153, 0.3)" : "1px solid rgba(52, 211, 153, 0.1)",
        boxShadow: isExpanded ? "0 0 30px rgba(52, 211, 153, 0.08)" : "none"
      }}
    >
      {/* Card Header — Always Visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 md:p-6 flex items-start gap-4 group"
      >
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 mt-1"
          style={{
            background: `linear-gradient(135deg, ${getExpansionColor(adversary.expansion)}22, ${getExpansionColor(adversary.expansion)}08)`,
            border: `1px solid ${getExpansionColor(adversary.expansion)}33`
          }}
        >
          <Swords size={24} style={{ color: getExpansionColor(adversary.expansion) }} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl text-amber-100 group-hover:text-amber-50 transition-colors">
                {adversary.name}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span
                  className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{
                    background: `${getExpansionColor(adversary.expansion)}18`,
                    color: getExpansionColor(adversary.expansion),
                    border: `1px solid ${getExpansionColor(adversary.expansion)}30`
                  }}
                >
                  {adversary.expansion}
                </span>
                <span className="text-emerald-500/40 text-xs">•</span>
                <span className="text-xs text-emerald-400/60">
                  Difficulty {adversary.baseDifficulty} – {maxDifficulty}
                </span>
                {adversary.lossCondition && (
                  <>
                    <span className="text-emerald-500/40 text-xs">•</span>
                    <span className="flex items-center gap-1 text-xs text-red-400/70">
                      <AlertTriangle size={11} />
                      Extra Loss Condition
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="shrink-0 text-emerald-500/40 group-hover:text-emerald-400 transition-colors mt-1">
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>

          {/* Difficulty Bar */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[10px] text-emerald-600/50 uppercase tracking-wider w-8">Diff</span>
            <div className="flex gap-1 flex-1">
              {adversary.levels.map((lvl) => (
                <div
                  key={lvl.level}
                  className="h-2 rounded-full flex-1"
                  style={{
                    background: getDifficultyColor(lvl.difficulty),
                    opacity: 0.7
                  }}
                  title={`Level ${lvl.level}: Difficulty ${lvl.difficulty}`}
                />
              ))}
            </div>
            <span className="text-[10px] text-emerald-600/50 w-4 text-right">{maxDifficulty}</span>
          </div>

          {/* Flavor Text Preview */}
          {!isExpanded && (
            <p className="text-emerald-400/40 text-sm mt-2 line-clamp-1">
              {adversary.flavor}
            </p>
          )}
        </div>
      </button>

      {/* Expanded Detail */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-6 space-y-5">
              {/* Divider */}
              <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(52, 211, 153, 0.2), transparent)" }} />

              {/* Flavor & Strategy */}
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className="p-4 rounded-xl"
                  style={{ background: "rgba(6, 18, 10, 0.5)", border: "1px solid rgba(52, 211, 153, 0.08)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={14} className="text-amber-400/70" />
                    <span className="text-xs text-amber-400/70 uppercase tracking-wider font-medium">Lore</span>
                  </div>
                  <p className="text-emerald-300/60 text-sm leading-relaxed">{adversary.flavor}</p>
                </div>
                <div
                  className="p-4 rounded-xl"
                  style={{ background: "rgba(6, 18, 10, 0.5)", border: "1px solid rgba(52, 211, 153, 0.08)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={14} className="text-emerald-400/70" />
                    <span className="text-xs text-emerald-400/70 uppercase tracking-wider font-medium">Strategy Tips</span>
                  </div>
                  <p className="text-emerald-300/60 text-sm leading-relaxed">{adversary.strategy}</p>
                </div>
              </div>

              {/* Loss Condition */}
              {adversary.lossCondition && (
                <div
                  className="p-4 rounded-xl"
                  style={{ background: "rgba(127, 29, 29, 0.15)", border: "1px solid rgba(248, 113, 113, 0.2)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Skull size={14} className="text-red-400/80" />
                    <span className="text-xs text-red-400/80 uppercase tracking-wider font-medium">Additional Loss Condition</span>
                  </div>
                  <p className="text-red-300/80 font-medium text-sm">{adversary.lossCondition.name}</p>
                  <p className="text-red-300/60 text-sm mt-1">{adversary.lossCondition.description}</p>
                </div>
              )}

              {/* Escalation */}
              <div
                className="p-4 rounded-xl"
                style={{ background: "rgba(120, 53, 15, 0.15)", border: "1px solid rgba(251, 191, 36, 0.2)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={14} className="text-amber-400/80" />
                  <span className="text-xs text-amber-400/80 uppercase tracking-wider font-medium">Escalation</span>
                </div>
                <p className="text-amber-200/80 font-medium text-sm">{adversary.escalation.name}</p>
                <p className="text-amber-200/60 text-sm mt-1">{adversary.escalation.description}</p>
              </div>

              {/* Level Selector */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Layers size={14} className="text-emerald-400/70" />
                  <span className="text-xs text-emerald-400/70 uppercase tracking-wider font-medium">Levels</span>
                </div>

                {/* Level Pills */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {adversary.levels.map((lvl) => (
                    <button
                      key={lvl.level}
                      onClick={() => onSelectLevel(lvl.level === selectedLevel ? 0 : lvl.level)}
                      className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all"
                      style={{
                        background: selectedLevel === lvl.level
                          ? `${getDifficultyColor(lvl.difficulty)}20`
                          : "rgba(16, 42, 28, 0.6)",
                        border: `1px solid ${selectedLevel === lvl.level
                          ? `${getDifficultyColor(lvl.difficulty)}50`
                          : "rgba(52, 211, 153, 0.1)"}`,
                        color: selectedLevel === lvl.level
                          ? getDifficultyColor(lvl.difficulty)
                          : "rgba(167, 199, 183, 0.5)"
                      }}
                    >
                      <span className="font-bold">Lv {lvl.level}</span>
                      <span className="ml-1.5 opacity-60 text-xs">(Diff {lvl.difficulty})</span>
                    </button>
                  ))}
                </div>

                {/* Level Details */}
                {selectedLevel === 0 ? (
                  <LevelOverviewTable adversary={adversary} onSelectLevel={onSelectLevel} />
                ) : (
                  <LevelDetail adversary={adversary} level={selectedLevel} />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- Level Overview Table ---
function LevelOverviewTable({ adversary, onSelectLevel }: { adversary: AdversaryDetail; onSelectLevel: (l: number) => void }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid rgba(52, 211, 153, 0.1)" }}
    >
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: "rgba(6, 18, 10, 0.6)" }}>
            <th className="text-left px-4 py-3 text-emerald-500/60 font-medium text-xs uppercase tracking-wider">Level</th>
            <th className="text-left px-4 py-3 text-emerald-500/60 font-medium text-xs uppercase tracking-wider">Diff</th>
            <th className="text-left px-4 py-3 text-emerald-500/60 font-medium text-xs uppercase tracking-wider">Fear</th>
            <th className="text-left px-4 py-3 text-emerald-500/60 font-medium text-xs uppercase tracking-wider hidden md:table-cell">Effect</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {adversary.levels.map((lvl, i) => (
            <tr
              key={lvl.level}
              className="group cursor-pointer hover:bg-emerald-900/20 transition-colors"
              onClick={() => onSelectLevel(lvl.level)}
              style={{ borderTop: i > 0 ? "1px solid rgba(52, 211, 153, 0.06)" : undefined }}
            >
              <td className="px-4 py-3">
                <span className="font-bold text-amber-100">{lvl.level}</span>
              </td>
              <td className="px-4 py-3">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold"
                  style={{
                    background: `${getDifficultyColor(lvl.difficulty)}18`,
                    color: getDifficultyColor(lvl.difficulty),
                    border: `1px solid ${getDifficultyColor(lvl.difficulty)}30`
                  }}
                >
                  {lvl.difficulty}
                </span>
              </td>
              <td className="px-4 py-3 text-emerald-300/60 text-xs">
                {lvl.fearCards}
              </td>
              <td className="px-4 py-3 text-emerald-300/50 text-xs hidden md:table-cell max-w-xs">
                <span className="text-emerald-200/70 font-medium">{lvl.name}</span>
                <span className="ml-1">— {lvl.effect.slice(0, 80)}{lvl.effect.length > 80 ? "..." : ""}</span>
              </td>
              <td className="px-4 py-3 text-right">
                <span className="text-emerald-500/30 group-hover:text-emerald-400 transition-colors text-xs">
                  View →
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Level Detail View ---
function LevelDetail({ adversary, level }: { adversary: AdversaryDetail; level: number }) {
  // Show cumulative effects up to selected level
  const cumulativeLevels = adversary.levels.filter(l => l.level <= level);
  const currentLevel = adversary.levels.find(l => l.level === level);
  if (!currentLevel) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      {/* Current Level Header */}
      <div
        className="p-4 rounded-xl"
        style={{
          background: `linear-gradient(135deg, ${getDifficultyColor(currentLevel.difficulty)}08, transparent)`,
          border: `1px solid ${getDifficultyColor(currentLevel.difficulty)}25`
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-lg font-bold"
              style={{
                background: `${getDifficultyColor(currentLevel.difficulty)}18`,
                color: getDifficultyColor(currentLevel.difficulty),
                border: `1px solid ${getDifficultyColor(currentLevel.difficulty)}30`
              }}
            >
              {currentLevel.level}
            </span>
            <div>
              <h4 className="text-amber-100 font-display text-lg">{currentLevel.name}</h4>
              <p className="text-emerald-500/50 text-xs">
                Difficulty {currentLevel.difficulty} · Fear Cards: {currentLevel.fearCards}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cumulative Effects */}
      <div className="space-y-2">
        <p className="text-xs text-emerald-500/50 uppercase tracking-wider font-medium px-1">
          Cumulative Effects (Levels 1–{level})
        </p>
        {cumulativeLevels.map((lvl) => (
          <div
            key={lvl.level}
            className="p-4 rounded-xl"
            style={{
              background: lvl.level === level ? "rgba(16, 42, 28, 0.8)" : "rgba(6, 18, 10, 0.4)",
              border: `1px solid ${lvl.level === level ? "rgba(52, 211, 153, 0.15)" : "rgba(52, 211, 153, 0.06)"}`,
              opacity: lvl.level === level ? 1 : 0.75
            }}
          >
            <div className="flex items-start gap-3">
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold shrink-0 mt-0.5"
                style={{
                  background: `${getDifficultyColor(lvl.difficulty)}15`,
                  color: getDifficultyColor(lvl.difficulty),
                  border: `1px solid ${getDifficultyColor(lvl.difficulty)}25`
                }}
              >
                {lvl.level}
              </span>
              <div className="flex-1">
                <p className="text-emerald-200/80 font-medium text-sm">{lvl.name}</p>
                <p className="text-emerald-300/60 text-sm mt-1 leading-relaxed">{lvl.effect}</p>

                {/* Setup Changes */}
                {lvl.setupChanges && (
                  <div className="mt-2 flex items-start gap-2">
                    <span className="text-[10px] text-amber-400/60 uppercase tracking-wider bg-amber-400/10 px-1.5 py-0.5 rounded shrink-0 mt-0.5">Setup</span>
                    <p className="text-amber-300/50 text-xs">{lvl.setupChanges}</p>
                  </div>
                )}

                {/* Deck Changes */}
                {lvl.deckChanges && (
                  <div className="mt-2 flex items-start gap-2">
                    <span className="text-[10px] text-cyan-400/60 uppercase tracking-wider bg-cyan-400/10 px-1.5 py-0.5 rounded shrink-0 mt-0.5">Deck</span>
                    <p className="text-cyan-300/50 text-xs font-mono">{lvl.deckChanges}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
