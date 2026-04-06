// Scenarios page — Spirit Island Companion
// Design: Living Island / Organic Nature UI
// Browsable scenario gallery with expandable detail profiles

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Search, ChevronDown, ChevronUp, X,
  Scroll, AlertTriangle, Settings, Trophy, Skull,
  Lightbulb, BookOpen, Tag, Sparkles, Shield
} from "lucide-react";
import { useGame } from "@/contexts/GameContext";
import {
  SCENARIO_DETAILS,
  getScenarioExpansionColor,
  getDifficultyColor,
  type ScenarioDetail
} from "@/lib/scenarioDetails";
import Particles from "@/components/Particles";

const GAME_PHASE_BG = "https://manus-storage.s3.us-east-1.amazonaws.com/e7b94e06-a015-4ac6-b00c-4b11a9cdb7b5/game-phase-bg.png";

const EXPANSIONS = ["All", "Base Game", "Branch & Claw", "Jagged Earth", "Feather & Flame", "Nature Incarnate"];

function DifficultyBadge({ difficulty, note }: { difficulty: string; note?: string }) {
  const color = getDifficultyColor(difficulty);
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold"
        style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
      >
        Difficulty {difficulty}
      </span>
      {note && (
        <span className="text-xs text-emerald-400/50 italic max-w-[200px] truncate" title={note}>
          {note}
        </span>
      )}
    </div>
  );
}

function ExpansionBadge({ label, expansion }: { label: string; expansion: string }) {
  const color = getScenarioExpansionColor(expansion);
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
      style={{ background: `${color}22`, color, border: `1px solid ${color}33` }}
    >
      {label}
    </span>
  );
}

function SectionHeader({ icon: Icon, title, color = "#4ade80" }: { icon: typeof AlertTriangle; title: string; color?: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon size={16} style={{ color }} />
      <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color }}>{title}</h4>
    </div>
  );
}

function ScenarioCard({ scenario }: { scenario: ScenarioDetail }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Collapsed Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left rounded-xl border transition-all duration-300"
        style={{
          background: expanded
            ? "linear-gradient(135deg, rgba(16,40,24,0.95) 0%, rgba(10,26,15,0.98) 100%)"
            : "rgba(16,40,24,0.6)",
          borderColor: expanded ? "rgba(74,222,128,0.3)" : "rgba(74,222,128,0.1)",
        }}
      >
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  background: `linear-gradient(135deg, ${getScenarioExpansionColor(scenario.expansion)}22, ${getScenarioExpansionColor(scenario.expansion)}11)`,
                  border: `1px solid ${getScenarioExpansionColor(scenario.expansion)}33`
                }}
              >
                <Scroll size={22} style={{ color: getScenarioExpansionColor(scenario.expansion) }} />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-serif text-emerald-100 mb-1.5">{scenario.name}</h3>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <ExpansionBadge label={scenario.expansionLabel} expansion={scenario.expansion} />
                  <DifficultyBadge difficulty={scenario.difficulty} />
                  {scenario.victoryChanges && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
                      style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.2)" }}>
                      <Trophy size={10} /> Alt Victory
                    </span>
                  )}
                  {scenario.lossChanges && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
                      style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
                      <Skull size={10} /> Alt Loss
                    </span>
                  )}
                </div>
                <p className="text-sm text-emerald-300/50 line-clamp-2">{scenario.overview}</p>
              </div>
            </div>

            <div className="shrink-0 mt-2">
              {expanded ? (
                <ChevronUp size={20} className="text-emerald-400/50" />
              ) : (
                <ChevronDown size={20} className="text-emerald-400/50" />
              )}
            </div>
          </div>
        </div>
      </button>

      {/* Expanded Detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-6 pt-2 rounded-b-xl border-x border-b space-y-6"
              style={{
                background: "linear-gradient(180deg, rgba(16,40,24,0.95) 0%, rgba(10,26,15,0.98) 100%)",
                borderColor: "rgba(74,222,128,0.15)"
              }}
            >
              {/* Flavor Text */}
              <div
                className="p-4 rounded-lg italic text-sm leading-relaxed"
                style={{
                  background: "rgba(74,222,128,0.05)",
                  borderLeft: "3px solid rgba(74,222,128,0.3)",
                  color: "rgba(167,199,183,0.8)"
                }}
              >
                "{scenario.flavorText}"
              </div>

              {/* Overview & Strategy in two columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className="p-4 rounded-lg"
                  style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.1)" }}
                >
                  <SectionHeader icon={BookOpen} title="Overview" color="#4ade80" />
                  <p className="text-sm text-emerald-200/70 leading-relaxed">{scenario.overview}</p>
                </div>
                <div
                  className="p-4 rounded-lg"
                  style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.1)" }}
                >
                  <SectionHeader icon={Lightbulb} title="Strategy Tips" color="#fbbf24" />
                  <p className="text-sm text-amber-200/70 leading-relaxed">{scenario.strategyTips}</p>
                </div>
              </div>

              {/* Rule Changes */}
              <div>
                <SectionHeader icon={Sparkles} title="Rule Changes" color="#a78bfa" />
                <div className="space-y-3">
                  {scenario.ruleChanges.map((rule, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg"
                      style={{ background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.12)" }}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                          style={{ background: "rgba(167,139,250,0.2)", color: "#a78bfa" }}
                        >
                          {i + 1}
                        </span>
                        <div>
                          <h5 className="text-sm font-semibold text-violet-300 mb-1">{rule.title}</h5>
                          <p className="text-sm text-emerald-200/60 leading-relaxed">{rule.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Setup Changes */}
              {scenario.setupChanges.length > 0 && (
                <div>
                  <SectionHeader icon={Settings} title="Setup Changes" color="#06b6d4" />
                  <div className="space-y-2">
                    {scenario.setupChanges.map((change, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-lg"
                        style={{ background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.12)" }}
                      >
                        <span
                          className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-xs font-bold shrink-0"
                          style={{ background: "rgba(6,182,212,0.2)", color: "#06b6d4" }}
                        >
                          SETUP
                        </span>
                        <p className="text-sm text-emerald-200/60 leading-relaxed">{change}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Victory & Loss Changes */}
              {(scenario.victoryChanges || scenario.lossChanges) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scenario.victoryChanges && (
                    <div
                      className="p-4 rounded-lg"
                      style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)" }}
                    >
                      <SectionHeader icon={Trophy} title="Victory Condition Changes" color="#fbbf24" />
                      <p className="text-sm text-amber-200/70 leading-relaxed">{scenario.victoryChanges}</p>
                    </div>
                  )}
                  {scenario.lossChanges && (
                    <div
                      className="p-4 rounded-lg"
                      style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}
                    >
                      <SectionHeader icon={Skull} title="Loss Condition Changes" color="#ef4444" />
                      <p className="text-sm text-red-200/70 leading-relaxed">{scenario.lossChanges}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Notable Interactions */}
              {(scenario.notablyEasierFor.length > 0 || scenario.notablyHarderFor.length > 0) && (
                <div>
                  <SectionHeader icon={Shield} title="Notable Interactions" color="#94a3b8" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scenario.notablyEasierFor.length > 0 && (
                      <div
                        className="p-4 rounded-lg"
                        style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.1)" }}
                      >
                        <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Notably Easier For</h5>
                        <ul className="space-y-1.5">
                          {scenario.notablyEasierFor.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-emerald-200/60">
                              <span className="text-emerald-400 mt-1 shrink-0">+</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {scenario.notablyHarderFor.length > 0 && (
                      <div
                        className="p-4 rounded-lg"
                        style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)" }}
                      >
                        <h5 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">Notably Harder For</h5>
                        <ul className="space-y-1.5">
                          {scenario.notablyHarderFor.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-red-200/60">
                              <span className="text-red-400 mt-1 shrink-0">−</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {scenario.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                    style={{ background: "rgba(74,222,128,0.08)", color: "rgba(74,222,128,0.5)", border: "1px solid rgba(74,222,128,0.1)" }}
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Scenarios() {
  const { dispatch } = useGame();
  const [search, setSearch] = useState("");
  const [expansionFilter, setExpansionFilter] = useState("All");

  const expansionMap: Record<string, string> = {
    "Base Game": "base",
    "Branch & Claw": "branch-and-claw",
    "Jagged Earth": "jagged-earth",
    "Feather & Flame": "feather-and-flame",
    "Nature Incarnate": "nature-incarnate",
  };

  const filtered = useMemo(() => {
    return SCENARIO_DETAILS.filter((s) => {
      const q = search.toLowerCase();
      const matchSearch = search === "" ||
        s.name.toLowerCase().includes(q) ||
        s.overview.toLowerCase().includes(q) ||
        s.tags.some(t => t.includes(q)) ||
        s.ruleChanges.some(r => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)) ||
        s.strategyTips.toLowerCase().includes(q);
      const matchExpansion = expansionFilter === "All" || s.expansion === expansionMap[expansionFilter];
      return matchSearch && matchExpansion;
    });
  }, [search, expansionFilter]);

  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(180deg, #0a1a0f 0%, #0d2818 30%, #0a1a0f 100%)" }}>
      <Particles />

      {/* Hero Banner */}
      <div className="relative h-56 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${GAME_PHASE_BG})`, filter: "brightness(0.35) saturate(1.3)" }}
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
          <h1 className="text-4xl md:text-5xl font-serif text-emerald-50">Scenarios</h1>
          <p className="text-emerald-300/50 mt-2 max-w-xl text-sm">
            Detailed profiles for all 15 scenarios. Browse rule changes, setup modifications, and victory/loss condition alterations.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400/40" />
            <input
              type="text"
              placeholder="Search scenarios..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-xl text-sm text-emerald-100 placeholder:text-emerald-400/30 outline-none transition-all"
              style={{
                background: "rgba(16,40,24,0.7)",
                border: "1px solid rgba(74,222,128,0.15)",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400/40 hover:text-emerald-300"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Expansion Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {EXPANSIONS.map((exp) => (
              <button
                key={exp}
                onClick={() => setExpansionFilter(exp)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: expansionFilter === exp ? "rgba(74,222,128,0.2)" : "rgba(74,222,128,0.05)",
                  color: expansionFilter === exp ? "#4ade80" : "rgba(74,222,128,0.4)",
                  border: `1px solid ${expansionFilter === exp ? "rgba(74,222,128,0.3)" : "rgba(74,222,128,0.1)"}`,
                }}
              >
                {exp}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-xs text-emerald-400/40 mb-4">
          Showing {filtered.length} of {SCENARIO_DETAILS.length} scenarios
        </p>

        {/* Scenario Cards */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((scenario) => (
              <ScenarioCard key={scenario.id} scenario={scenario} />
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Scroll size={48} className="mx-auto mb-4 text-emerald-400/20" />
              <p className="text-emerald-400/40 text-sm">No scenarios match your search.</p>
              <button
                onClick={() => { setSearch(""); setExpansionFilter("All"); }}
                className="mt-3 text-xs text-emerald-400/60 hover:text-emerald-300 underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
