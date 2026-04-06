/*
 * Statistics Dashboard — "Living Island" Design
 * Aggregate charts: win rate, spirit performance, adversary breakdown,
 * difficulty progression, element affinity, expansion usage
 */
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SessionData } from '@/lib/gameData';
import { SPIRITS } from '@/lib/gameData';
import {
  Trophy, Skull, TrendingUp, Flame, Shield, BarChart3,
  ChevronDown, ChevronUp, Swords, Zap
} from 'lucide-react';

// ── Element config ──
const ELEMENT_CONFIG: Record<string, { emoji: string; color: string }> = {
  Sun: { emoji: '☀️', color: '#F5C542' },
  Moon: { emoji: '🌙', color: '#C4B5FD' },
  Fire: { emoji: '🔥', color: '#EF4444' },
  Air: { emoji: '💨', color: '#93C5FD' },
  Water: { emoji: '💧', color: '#3B82F6' },
  Earth: { emoji: '⛰️', color: '#A3744F' },
  Plant: { emoji: '🌿', color: '#4ADE80' },
  Animal: { emoji: '🐾', color: '#F59E0B' },
};

// ── Styles ──
const CARD_STYLE: React.CSSProperties = {
  backgroundColor: 'rgba(22, 46, 28, 0.5)',
  border: '1px solid rgba(255,255,255,0.08)',
};
const HEADING: React.CSSProperties = { fontFamily: "'Playfair Display', serif" };
const BODY: React.CSSProperties = { fontFamily: "'Source Serif 4', serif" };
const MUTED: React.CSSProperties = { ...BODY, color: 'rgba(255,255,255,0.4)' };

// ── Helper: compute stats from sessions ──
function useStats(sessions: SessionData[]) {
  return useMemo(() => {
    const completed = sessions.filter(s => s.result === 'win' || s.result === 'loss');
    const wins = completed.filter(s => s.result === 'win');
    const losses = completed.filter(s => s.result === 'loss');
    const winRate = completed.length > 0 ? (wins.length / completed.length) * 100 : 0;
    const avgTurns = completed.length > 0
      ? completed.reduce((sum, s) => sum + (s.turnCount || 0), 0) / completed.length
      : 0;
    const avgPlayers = completed.length > 0
      ? completed.reduce((sum, s) => sum + s.playerCount, 0) / completed.length
      : 0;

    // Spirit performance
    const spiritMap = new Map<string, { wins: number; losses: number; total: number }>();
    completed.forEach(s => {
      s.players.forEach(p => {
        if (!p.spirit) return;
        const entry = spiritMap.get(p.spirit) || { wins: 0, losses: 0, total: 0 };
        entry.total++;
        if (s.result === 'win') entry.wins++;
        else entry.losses++;
        spiritMap.set(p.spirit, entry);
      });
    });
    const spiritStats = Array.from(spiritMap.entries())
      .map(([name, data]) => ({ name, ...data, winRate: data.total > 0 ? (data.wins / data.total) * 100 : 0 }))
      .sort((a, b) => b.total - a.total);

    // Adversary performance
    const advMap = new Map<string, { wins: number; losses: number; total: number; avgLevel: number; levels: number[] }>();
    completed.forEach(s => {
      if (!s.adversary) return;
      const entry = advMap.get(s.adversary) || { wins: 0, losses: 0, total: 0, avgLevel: 0, levels: [] };
      entry.total++;
      entry.levels.push(s.adversaryLevel);
      if (s.result === 'win') entry.wins++;
      else entry.losses++;
      advMap.set(s.adversary, entry);
    });
    const adversaryStats = Array.from(advMap.entries())
      .map(([name, data]) => ({
        name,
        ...data,
        avgLevel: data.levels.length > 0 ? data.levels.reduce((a, b) => a + b, 0) / data.levels.length : 0,
        winRate: data.total > 0 ? (data.wins / data.total) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total);

    // Difficulty progression (chronological)
    const difficultyTimeline = completed
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((s, i) => ({
        index: i + 1,
        level: s.adversaryLevel,
        adversary: s.adversary || 'None',
        result: s.result || 'unknown',
        date: s.date,
      }));

    // Element affinity
    const elementMap = new Map<string, number>();
    completed.forEach(s => {
      s.players.forEach(p => {
        if (!p.spirit) return;
        const spirit = SPIRITS.find(sp => sp.name === p.spirit);
        if (!spirit) return;
        spirit.elements.forEach(el => {
          elementMap.set(el, (elementMap.get(el) || 0) + 1);
        });
      });
    });
    const elementStats = Array.from(elementMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    const maxElementCount = Math.max(...elementStats.map(e => e.count), 1);

    // Expansion usage
    const expMap = new Map<string, number>();
    completed.forEach(s => {
      s.expansions.forEach(exp => {
        expMap.set(exp, (expMap.get(exp) || 0) + 1);
      });
    });
    const expansionStats = Array.from(expMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Win conditions breakdown
    const winCondMap = new Map<string, number>();
    wins.forEach(s => {
      if (s.winCondition) {
        winCondMap.set(s.winCondition, (winCondMap.get(s.winCondition) || 0) + 1);
      }
    });
    const winConditionStats = Array.from(winCondMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Loss reasons breakdown
    const lossReasonMap = new Map<string, number>();
    losses.forEach(s => {
      if (s.lossReason) {
        lossReasonMap.set(s.lossReason, (lossReasonMap.get(s.lossReason) || 0) + 1);
      }
    });
    const lossReasonStats = Array.from(lossReasonMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return {
      total: completed.length,
      wins: wins.length,
      losses: losses.length,
      winRate,
      avgTurns,
      avgPlayers,
      spiritStats,
      adversaryStats,
      difficultyTimeline,
      elementStats,
      maxElementCount,
      expansionStats,
      winConditionStats,
      lossReasonStats,
    };
  }, [sessions]);
}

// ── Win Rate Ring ──
function WinRateRing({ winRate, wins, losses }: { winRate: number; wins: number; losses: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const winStroke = (winRate / 100) * circumference;
  const lossStroke = circumference - winStroke;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          {/* Background track */}
          <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
          {/* Loss arc */}
          <motion.circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke="#CC3333"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${lossStroke} ${circumference}`}
            strokeDashoffset={-winStroke}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${lossStroke} ${circumference}` }}
            transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
          />
          {/* Win arc */}
          <motion.circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke="#5BC0BE"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${winStroke} ${circumference}`}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${winStroke} ${circumference}` }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-bold text-white"
            style={HEADING}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(winRate)}%
          </motion.span>
          <span className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>Win Rate</span>
        </div>
      </div>
      <div className="flex gap-4 mt-3">
        <div className="flex items-center gap-1.5 text-xs" style={BODY}>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#5BC0BE' }} />
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>{wins} Wins</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={BODY}>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#CC3333' }} />
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>{losses} Losses</span>
        </div>
      </div>
    </div>
  );
}

// ── Horizontal Bar Chart ──
function HorizontalBar({
  label,
  wins,
  losses,
  total,
  maxTotal,
  winRate,
  index,
}: {
  label: string;
  wins: number;
  losses: number;
  total: number;
  maxTotal: number;
  winRate: number;
  index: number;
}) {
  const widthPct = maxTotal > 0 ? (total / maxTotal) * 100 : 0;
  const winPct = total > 0 ? (wins / total) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs truncate max-w-[60%]" style={{ ...BODY, color: 'rgba(255,255,255,0.7)' }}>
          {label}
        </span>
        <span className="text-xs tabular-nums" style={{ ...BODY, color: 'rgba(255,255,255,0.4)' }}>
          {wins}W / {losses}L ({Math.round(winRate)}%)
        </span>
      </div>
      <div className="h-5 rounded-md overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.04)', width: '100%' }}>
        <motion.div
          className="h-full rounded-md flex overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${widthPct}%` }}
          transition={{ duration: 0.8, delay: index * 0.05, ease: 'easeOut' }}
        >
          <div style={{ width: `${winPct}%`, backgroundColor: '#5BC0BE' }} className="h-full" />
          <div style={{ width: `${100 - winPct}%`, backgroundColor: '#CC3333' }} className="h-full" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Difficulty Timeline Chart (SVG line chart) ──
function DifficultyChart({ data }: { data: { index: number; level: number; adversary: string; result: string; date: string }[] }) {
  if (data.length === 0) return null;

  const width = 100;
  const height = 50;
  const padding = { top: 5, right: 5, bottom: 5, left: 5 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const maxLevel = Math.max(...data.map(d => d.level), 6);

  const points = data.map((d, i) => ({
    x: padding.left + (data.length === 1 ? chartW / 2 : (i / (data.length - 1)) * chartW),
    y: padding.top + chartH - (d.level / maxLevel) * chartH,
    ...d,
  }));

  const pathD = points.length > 1
    ? points.reduce((acc, p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`;
        const prev = points[i - 1];
        const cpx1 = prev.x + (p.x - prev.x) * 0.4;
        const cpx2 = p.x - (p.x - prev.x) * 0.4;
        return `${acc} C ${cpx1} ${prev.y}, ${cpx2} ${p.y}, ${p.x} ${p.y}`;
      }, '')
    : '';

  // Gradient area
  const areaD = pathD
    ? `${pathD} L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`
    : '';

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none" style={{ height: '160px' }}>
        <defs>
          <linearGradient id="diffGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4A843" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D4A843" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0, 1, 2, 3, 4, 5, 6].filter(l => l <= maxLevel).map(l => (
          <line
            key={l}
            x1={padding.left}
            y1={padding.top + chartH - (l / maxLevel) * chartH}
            x2={padding.left + chartW}
            y2={padding.top + chartH - (l / maxLevel) * chartH}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.3"
          />
        ))}
        {/* Area fill */}
        {areaD && <path d={areaD} fill="url(#diffGrad)" />}
        {/* Line */}
        {pathD && (
          <motion.path
            d={pathD}
            fill="none"
            stroke="#D4A843"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        )}
        {/* Points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="1.8"
            fill={p.result === 'win' ? '#5BC0BE' : '#CC3333'}
            stroke={p.result === 'win' ? '#5BC0BE' : '#CC3333'}
            strokeWidth="0.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          />
        ))}
      </svg>
      {/* Level labels */}
      <div className="flex justify-between mt-1 px-1">
        <span className="text-[10px]" style={MUTED}>Game 1</span>
        {data.length > 1 && (
          <span className="text-[10px]" style={MUTED}>Game {data.length}</span>
        )}
      </div>
      {/* Level scale */}
      <div className="flex justify-between mt-0.5 px-1">
        <span className="text-[10px]" style={{ ...MUTED, color: 'rgba(255,255,255,0.25)' }}>Lvl 0</span>
        <span className="text-[10px]" style={{ ...MUTED, color: 'rgba(255,255,255,0.25)' }}>Lvl {maxLevel}</span>
      </div>
    </div>
  );
}

// ── Element Radar (custom SVG) ──
function ElementRadar({ data, maxCount }: { data: { name: string; count: number }[]; maxCount: number }) {
  const allElements = ['Sun', 'Moon', 'Fire', 'Air', 'Water', 'Earth', 'Plant', 'Animal'];
  const elementData = allElements.map(el => {
    const found = data.find(d => d.name === el);
    return { name: el, count: found?.count || 0 };
  });

  const cx = 60;
  const cy = 60;
  const maxR = 45;
  const n = elementData.length;

  const getPoint = (index: number, value: number) => {
    const angle = (index / n) * 2 * Math.PI - Math.PI / 2;
    const r = maxCount > 0 ? (value / maxCount) * maxR : 0;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const polygonPoints = elementData
    .map((d, i) => {
      const p = getPoint(i, d.count);
      return `${p.x},${p.y}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 120 120" className="w-48 h-48">
        {/* Grid rings */}
        {[0.25, 0.5, 0.75, 1].map(scale => (
          <polygon
            key={scale}
            points={elementData.map((_, i) => {
              const p = getPoint(i, maxCount * scale);
              return `${p.x},${p.y}`;
            }).join(' ')}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.4"
          />
        ))}
        {/* Axis lines */}
        {elementData.map((_, i) => {
          const p = getPoint(i, maxCount);
          return (
            <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
          );
        })}
        {/* Data polygon */}
        <motion.polygon
          points={polygonPoints}
          fill="rgba(91, 192, 190, 0.15)"
          stroke="#5BC0BE"
          strokeWidth="1"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        {/* Data points */}
        {elementData.map((d, i) => {
          const p = getPoint(i, d.count);
          const cfg = ELEMENT_CONFIG[d.name];
          return (
            <motion.circle
              key={d.name}
              cx={p.x}
              cy={p.y}
              r="3"
              fill={cfg?.color || '#5BC0BE'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
            />
          );
        })}
        {/* Labels */}
        {elementData.map((d, i) => {
          const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
          const labelR = maxR + 12;
          const x = cx + labelR * Math.cos(angle);
          const y = cy + labelR * Math.sin(angle);
          const cfg = ELEMENT_CONFIG[d.name];
          return (
            <text
              key={d.name}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="5"
              fill={cfg?.color || 'rgba(255,255,255,0.5)'}
            >
              {cfg?.emoji || d.name}
            </text>
          );
        })}
      </svg>
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2">
        {elementData.filter(d => d.count > 0).map(d => {
          const cfg = ELEMENT_CONFIG[d.name];
          return (
            <span key={d.name} className="text-[10px] flex items-center gap-1" style={BODY}>
              <span>{cfg?.emoji}</span>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>{d.count}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ── Collapsible Section ──
function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl overflow-hidden" style={CARD_STYLE}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 transition-colors"
        style={{ backgroundColor: open ? 'rgba(255,255,255,0.02)' : 'transparent' }}
      >
        <div className="flex items-center gap-2.5">
          <span style={{ color: '#D4A843' }}>{icon}</span>
          <h3 className="text-sm font-semibold text-white" style={HEADING}>{title}</h3>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
        ) : (
          <ChevronDown className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Dashboard ──
export default function StatsDashboard({ sessions }: { sessions: SessionData[] }) {
  const stats = useStats(sessions);

  if (stats.total === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* ── Overview Row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatTile icon={<BarChart3 className="w-4 h-4" />} label="Total Games" value={stats.total} color="#D4A843" />
        <StatTile icon={<Trophy className="w-4 h-4" />} label="Victories" value={stats.wins} color="#5BC0BE" />
        <StatTile icon={<Skull className="w-4 h-4" />} label="Defeats" value={stats.losses} color="#CC3333" />
        <StatTile icon={<TrendingUp className="w-4 h-4" />} label="Avg Turns" value={stats.avgTurns.toFixed(1)} color="#D4A843" />
      </div>

      {/* ── Win Rate Ring ── */}
      <div className="rounded-xl p-6 flex flex-col items-center" style={CARD_STYLE}>
        <h3 className="text-sm font-semibold text-white mb-4" style={HEADING}>Overall Win Rate</h3>
        <WinRateRing winRate={stats.winRate} wins={stats.wins} losses={stats.losses} />
      </div>

      {/* ── Spirit Performance ── */}
      {stats.spiritStats.length > 0 && (
        <CollapsibleSection title="Spirit Performance" icon={<Zap className="w-4 h-4" />}>
          <div className="space-y-3">
            {stats.spiritStats.map((s, i) => (
              <HorizontalBar
                key={s.name}
                label={s.name}
                wins={s.wins}
                losses={s.losses}
                total={s.total}
                maxTotal={stats.spiritStats[0]?.total || 1}
                winRate={s.winRate}
                index={i}
              />
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* ── Adversary Breakdown ── */}
      {stats.adversaryStats.length > 0 && (
        <CollapsibleSection title="Adversary Breakdown" icon={<Swords className="w-4 h-4" />}>
          <div className="space-y-3">
            {stats.adversaryStats.map((a, i) => (
              <div key={a.name}>
                <HorizontalBar
                  label={a.name}
                  wins={a.wins}
                  losses={a.losses}
                  total={a.total}
                  maxTotal={stats.adversaryStats[0]?.total || 1}
                  winRate={a.winRate}
                  index={i}
                />
                <div className="text-[10px] mt-0.5 pl-1" style={MUTED}>
                  Avg Level: {a.avgLevel.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* ── Difficulty Progression ── */}
      {stats.difficultyTimeline.length > 1 && (
        <CollapsibleSection title="Difficulty Progression" icon={<TrendingUp className="w-4 h-4" />}>
          <p className="text-xs mb-3" style={MUTED}>
            Adversary level over time. Green dots = victories, red dots = defeats.
          </p>
          <DifficultyChart data={stats.difficultyTimeline} />
        </CollapsibleSection>
      )}

      {/* ── Element Affinity ── */}
      {stats.elementStats.length > 0 && (
        <CollapsibleSection title="Element Affinity" icon={<Flame className="w-4 h-4" />}>
          <p className="text-xs mb-3" style={MUTED}>
            Elements from spirits you've played. Larger reach = more games with that element.
          </p>
          <ElementRadar data={stats.elementStats} maxCount={stats.maxElementCount} />
        </CollapsibleSection>
      )}

      {/* ── Win Conditions & Loss Reasons ── */}
      {(stats.winConditionStats.length > 0 || stats.lossReasonStats.length > 0) && (
        <CollapsibleSection title="Outcomes Breakdown" icon={<Shield className="w-4 h-4" />}>
          {stats.winConditionStats.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold mb-2" style={{ ...HEADING, color: '#5BC0BE' }}>Victory Conditions</h4>
              <div className="space-y-1.5">
                {stats.winConditionStats.map((wc, i) => (
                  <motion.div
                    key={wc.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="truncate max-w-[75%]" style={{ ...BODY, color: 'rgba(255,255,255,0.6)' }}>{wc.name}</span>
                    <span className="tabular-nums font-semibold" style={{ color: '#5BC0BE' }}>{wc.count}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          {stats.lossReasonStats.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold mb-2" style={{ ...HEADING, color: '#CC3333' }}>Loss Reasons</h4>
              <div className="space-y-1.5">
                {stats.lossReasonStats.map((lr, i) => (
                  <motion.div
                    key={lr.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="truncate max-w-[75%]" style={{ ...BODY, color: 'rgba(255,255,255,0.6)' }}>{lr.name}</span>
                    <span className="tabular-nums font-semibold" style={{ color: '#CC3333' }}>{lr.count}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CollapsibleSection>
      )}

      {/* ── Expansion Usage ── */}
      {stats.expansionStats.length > 0 && (
        <CollapsibleSection title="Expansion Usage" icon={<BarChart3 className="w-4 h-4" />} defaultOpen={false}>
          <div className="space-y-2">
            {stats.expansionStats.map((exp, i) => {
              const pct = stats.total > 0 ? (exp.count / stats.total) * 100 : 0;
              return (
                <motion.div
                  key={exp.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs capitalize" style={{ ...BODY, color: 'rgba(255,255,255,0.7)' }}>
                      {exp.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </span>
                    <span className="text-xs tabular-nums" style={MUTED}>{exp.count} games ({Math.round(pct)}%)</span>
                  </div>
                  <div className="h-3 rounded-md overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                    <motion.div
                      className="h-full rounded-md"
                      style={{ backgroundColor: '#D4A843' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CollapsibleSection>
      )}
    </motion.div>
  );
}

// ── Stat Tile ──
function StatTile({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 rounded-xl text-center"
      style={CARD_STYLE}
    >
      <div className="flex items-center justify-center mb-1.5" style={{ color }}>
        {icon}
      </div>
      <div className="text-xl font-bold text-white" style={{ ...HEADING, color }}>
        {value}
      </div>
      <div className="text-[10px] mt-0.5" style={MUTED}>{label}</div>
    </motion.div>
  );
}
