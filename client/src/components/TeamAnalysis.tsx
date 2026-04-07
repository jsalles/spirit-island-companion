/*
 * Team Analysis Panel — "Living Island" Design
 * Shows role coverage, element coverage, balance grade, and suggestions
 * for the currently selected spirit team
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import {
  analyzeTeam, getBalanceRating, getSpiritRole,
  ROLE_NAMES, ROLE_INFO, type RoleName,
} from '@/lib/randomizer';
import { ELEMENT_ICONS } from '@/lib/spiritDetails';

const ALL_ELEMENTS = ['Sun', 'Moon', 'Fire', 'Air', 'Water', 'Earth', 'Plant', 'Animal'] as const;

interface TeamAnalysisProps {
  spiritNames: string[];
}

export default function TeamAnalysis({ spiritNames }: TeamAnalysisProps) {
  const [expanded, setExpanded] = useState(true);
  const validSpirits = spiritNames.filter(Boolean);

  if (validSpirits.length === 0) return null;

  const analysis = analyzeTeam(validSpirits);
  const rating = getBalanceRating(analysis);
  const spiritRoles = validSpirits.map(name => ({
    name,
    role: getSpiritRole(name),
  }));

  // Max role value for scaling bars
  const maxRoleVal = Math.max(...ROLE_NAMES.map(r => analysis.roleCoverage[r]), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 rounded-xl overflow-hidden"
      style={{
        border: `1px solid ${rating.color}30`,
        backgroundColor: 'rgba(22, 46, 28, 0.5)',
      }}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5" style={{ color: rating.color }} />
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                Team Balance
              </span>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: rating.color + '20',
                  color: rating.color,
                  fontFamily: "'Source Serif 4', serif",
                }}
              >
                {rating.grade} — {rating.label}
              </span>
            </div>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Serif 4', serif" }}>
              {rating.description}
            </p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
        ) : (
          <ChevronDown className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-5">
              {/* Spirit Roles */}
              <div>
                <h4 className="text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Serif 4', serif" }}>
                  Spirit Roles
                </h4>
                <div className="space-y-1.5">
                  {spiritRoles.map(({ name, role }) => (
                    <div key={name} className="flex items-center gap-2 text-xs">
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                        style={{ backgroundColor: role ? ROLE_INFO[role.role].color + '30' : 'rgba(255,255,255,0.05)' }}
                      >
                        {role ? ROLE_INFO[role.role].icon : '?'}
                      </span>
                      <span className="text-white truncate flex-1" style={{ fontFamily: "'Source Serif 4', serif" }}>
                        {name}
                      </span>
                      {role && (
                        <span
                          className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                          style={{
                            backgroundColor: ROLE_INFO[role.role].color + '20',
                            color: ROLE_INFO[role.role].color,
                            fontFamily: "'Source Serif 4', serif",
                          }}
                        >
                          {ROLE_INFO[role.role].label}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Role Coverage Bars */}
              <div>
                <h4 className="text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Serif 4', serif" }}>
                  Role Coverage
                </h4>
                <div className="space-y-2">
                  {ROLE_NAMES.map(role => {
                    const val = analysis.roleCoverage[role];
                    const pct = maxRoleVal > 0 ? (val / maxRoleVal) * 100 : 0;
                    const info = ROLE_INFO[role];
                    const isWeak = analysis.teamWeaknesses.includes(role);
                    const isStrong = analysis.teamStrengths.includes(role);

                    return (
                      <div key={role} className="flex items-center gap-2">
                        <span className="text-sm w-5 text-center">{info.icon}</span>
                        <span
                          className="text-xs w-16 truncate"
                          style={{
                            color: isWeak ? '#E06C5A' : isStrong ? info.color : 'rgba(255,255,255,0.5)',
                            fontFamily: "'Source Serif 4', serif",
                            fontWeight: isStrong ? 600 : 400,
                          }}
                        >
                          {info.label}
                        </span>
                        <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                          <motion.div
                            className="h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            style={{
                              backgroundColor: isWeak ? '#E06C5A' : info.color,
                              opacity: isWeak ? 0.6 : 0.8,
                            }}
                          />
                        </div>
                        <span
                          className="text-xs w-6 text-right font-mono"
                          style={{ color: isWeak ? '#E06C5A' : 'rgba(255,255,255,0.4)' }}
                        >
                          {val}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Element Coverage */}
              <div>
                <h4 className="text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Serif 4', serif" }}>
                  Element Coverage ({analysis.elementCoverage.length}/{ALL_ELEMENTS.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ALL_ELEMENTS.map(el => {
                    const covered = analysis.elementCoverage.includes(el);
                    return (
                      <span
                        key={el}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all"
                        style={{
                          backgroundColor: covered ? 'rgba(91, 192, 190, 0.1)' : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${covered ? 'rgba(91, 192, 190, 0.3)' : 'rgba(255,255,255,0.06)'}`,
                          color: covered ? '#5BC0BE' : 'rgba(255,255,255,0.2)',
                          fontFamily: "'Source Serif 4', serif",
                          opacity: covered ? 1 : 0.5,
                        }}
                      >
                        <span className="text-sm">{ELEMENT_ICONS[el] || el[0]}</span>
                        {el}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              {(analysis.teamStrengths.length > 0 || analysis.teamWeaknesses.length > 0) && (
                <div className="grid grid-cols-2 gap-3">
                  {analysis.teamStrengths.length > 0 && (
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(76, 175, 80, 0.08)', border: '1px solid rgba(76, 175, 80, 0.15)' }}>
                      <h5 className="text-[10px] font-medium mb-1.5" style={{ color: '#4CAF50', fontFamily: "'Source Serif 4', serif" }}>
                        STRENGTHS
                      </h5>
                      <div className="space-y-1">
                        {analysis.teamStrengths.map(role => (
                          <div key={role} className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Source Serif 4', serif" }}>
                            <span className="text-sm">{ROLE_INFO[role].icon}</span>
                            {ROLE_INFO[role].label}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {analysis.teamWeaknesses.length > 0 && (
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(224, 108, 90, 0.08)', border: '1px solid rgba(224, 108, 90, 0.15)' }}>
                      <h5 className="text-[10px] font-medium mb-1.5" style={{ color: '#E06C5A', fontFamily: "'Source Serif 4', serif" }}>
                        WEAKNESSES
                      </h5>
                      <div className="space-y-1">
                        {analysis.teamWeaknesses.map(role => (
                          <div key={role} className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Source Serif 4', serif" }}>
                            <span className="text-sm">{ROLE_INFO[role].icon}</span>
                            {ROLE_INFO[role].label}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Missing Elements Warning */}
              {analysis.missingElements.length > 0 && analysis.missingElements.length <= 4 && (
                <p className="text-xs" style={{ color: 'rgba(212, 168, 67, 0.7)', fontFamily: "'Source Serif 4', serif" }}>
                  Missing elements: {analysis.missingElements.map(e => `${ELEMENT_ICONS[e] || ''} ${e}`).join(', ')}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
