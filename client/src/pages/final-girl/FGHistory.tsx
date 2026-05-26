/**
 * Final Girl Session History — Horror theme
 * With export/share functionality (CSV + shareable links)
 * Displays score and rank for each session
 */
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { useFinalGirl } from '@/contexts/FinalGirlContext';
import type { FGSessionData } from '@/lib/finalGirlData';
import { getRank } from '@/utils/fgScoring';
import { ArrowLeft, Download, Share2, Trophy, XCircle, Calendar, Skull, ChevronDown, Star, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export default function FGHistory() {
  const { state } = useFinalGirl();
  const [, setLocation] = useLocation();
  const [showExportMenu, setShowExportMenu] = useState(false);
  const sessions = state.sessionHistory;

  const stats = useMemo(() => {
    const completed = sessions.filter(s => s.result !== 'in-progress');
    const wins = completed.filter(s => s.result === 'win').length;
    const losses = completed.filter(s => s.result === 'loss').length;
    const killersSet = new Set(completed.map(s => s.killer).filter(Boolean));
    const locationsSet = new Set(completed.map(s => s.location).filter(Boolean));
    const scoredSessions = completed.filter(s => s.score != null && s.score > 0);
    const avgScore = scoredSessions.length > 0
      ? Math.round(scoredSessions.reduce((sum, s) => sum + (s.score || 0), 0) / scoredSessions.length)
      : 0;
    const bestScore = scoredSessions.length > 0
      ? Math.max(...scoredSessions.map(s => s.score || 0))
      : 0;
    return { total: completed.length, wins, losses, killers: killersSet.size, locations: locationsSet.size, avgScore, bestScore };
  }, [sessions]);

  const downloadCSV = () => {
    if (sessions.length === 0) { toast.error('No sessions to export'); return; }
    const headers = ['Date', 'Result', 'Score', 'Rank', 'Killer', 'Location', 'Final Girl', 'Turns', 'Health Remaining', 'Victims Saved', 'Victims Killed', 'Items Used', 'Horror Level', 'Difficulty', 'Notes'];
    const rows = sessions.filter(s => s.result !== 'in-progress').map(s => {
      const rank = s.score ? getRank(s.score) : null;
      return [
        new Date(s.date).toLocaleDateString(),
        s.result,
        s.score?.toString() || '',
        rank?.rank || '',
        s.killer,
        s.location,
        s.finalGirl,
        s.turnCount.toString(),
        s.healthRemaining?.toString() || '',
        s.victimsSaved.toString(),
        s.victimsKilled.toString(),
        s.itemsUsed?.toString() || '',
        s.horrorLevel?.toString() || '',
        s.difficulty,
        `"${(s.notes || '').replace(/"/g, '""')}"`,
      ];
    });
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `final-girl-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV downloaded!');
    setShowExportMenu(false);
  };

  const copyShareLink = async () => {
    if (sessions.length === 0) { toast.error('No sessions to share'); return; }
    try {
      const data = btoa(encodeURIComponent(JSON.stringify(sessions.filter(s => s.result !== 'in-progress'))));
      const url = `${window.location.origin}${window.location.pathname}?fg-share=${data}`;
      await navigator.clipboard.writeText(url);
      toast.success('Share link copied to clipboard!');
    } catch {
      toast.error('Failed to copy link');
    }
    setShowExportMenu(false);
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#0a0505' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b backdrop-blur-xl" style={{ backgroundColor: 'rgba(10, 5, 5, 0.95)', borderColor: 'rgba(220, 38, 38, 0.15)' }}>
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setLocation('/')}
              className="flex items-center gap-2 text-sm"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h1 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Session History
            </h1>
            {/* Export button */}
            <div className="relative z-50">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                style={{ borderColor: 'rgba(220, 38, 38, 0.3)', color: '#dc2626' }}
              >
                <Share2 className="w-3.5 h-3.5" />
                Export
                <ChevronDown className="w-3 h-3" />
              </button>
              {showExportMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border shadow-xl z-[60] overflow-hidden" style={{ backgroundColor: '#1a0a0a', borderColor: 'rgba(220, 38, 38, 0.3)' }}>
                  <button onClick={downloadCSV} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-left hover:bg-white/5 text-white">
                    <Download className="w-4 h-4" style={{ color: '#dc2626' }} /> Download CSV
                  </button>
                  <button onClick={copyShareLink} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-left hover:bg-white/5 text-white">
                    <Share2 className="w-4 h-4" style={{ color: '#dc2626' }} /> Copy Share Link
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container py-6 pb-16">
        {/* Stats */}
        {sessions.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <StatCard label="Total Games" value={stats.total} color="#dc2626" />
            <StatCard label="Survived" value={stats.wins} color="#22c55e" />
            <StatCard label="Best Score" value={stats.bestScore} color="#fbbf24" suffix="pts" />
            <StatCard label="Avg Score" value={stats.avgScore} color="#a855f7" suffix="pts" />
          </div>
        )}

        {/* Sessions List */}
        {sessions.length === 0 ? (
          <div className="text-center py-16">
            <Skull className="w-12 h-12 mx-auto mb-4" style={{ color: 'rgba(220, 38, 38, 0.3)' }} />
            <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              No Sessions Yet
            </h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Complete a game to see your survival record here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.filter(s => s.result !== 'in-progress').map((session, i) => (
              <SessionCard key={session.id} session={session} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function SessionCard({ session, index }: { session: FGSessionData; index: number }) {
  const isWin = session.result === 'win';
  const rankInfo = session.score ? getRank(session.score) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="p-4 rounded-xl border"
      style={{
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderColor: isWin ? 'rgba(34, 197, 94, 0.2)' : 'rgba(220, 38, 38, 0.2)',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {isWin ? (
            <Trophy className="w-5 h-5" style={{ color: '#22c55e' }} />
          ) : (
            <XCircle className="w-5 h-5" style={{ color: '#dc2626' }} />
          )}
          <span className="text-sm font-semibold" style={{ color: isWin ? '#22c55e' : '#dc2626' }}>
            {isWin ? 'Survived' : 'Killed'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Score badge */}
          {rankInfo && session.score && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ backgroundColor: rankInfo.rankColor + '15', border: `1px solid ${rankInfo.rankColor}30` }}>
              <span className="text-xs font-black" style={{ color: rankInfo.rankColor }}>{rankInfo.rank}</span>
              <span className="text-xs font-bold" style={{ color: rankInfo.rankColor }}>{session.score}pts</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <Calendar className="w-3 h-3" />
            {new Date(session.date).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Killer</p>
          <p className="text-sm font-medium text-white">{session.killer?.split(' — ')[0] || '—'}</p>
        </div>
        <div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Location</p>
          <p className="text-sm font-medium text-white">{session.location || '—'}</p>
        </div>
        <div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Final Girl</p>
          <p className="text-sm font-medium text-white">{session.finalGirl || '—'}</p>
        </div>
      </div>
      {/* Additional stats row */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        {session.turnCount > 0 && (
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {session.turnCount} turns
          </span>
        )}
        {session.healthRemaining != null && (
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            ❤️ {session.healthRemaining}/{session.maxHealth || 5}
          </span>
        )}
        {session.victimsSaved > 0 && (
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            🛡️ {session.victimsSaved} saved
          </span>
        )}
        {session.victimsKilled > 0 && (
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            💀 {session.victimsKilled} killed
          </span>
        )}
        {session.difficulty && (
          <span className="text-xs ml-auto capitalize" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {session.difficulty}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function StatCard({ label, value, color, suffix }: { label: string; value: number; color: string; suffix?: string }) {
  return (
    <div className="p-3 rounded-xl border text-center" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: color + '20' }}>
      <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "'Playfair Display', serif", color }}>
        {value}{suffix && <span className="text-xs ml-0.5">{suffix}</span>}
      </div>
      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</div>
    </div>
  );
}
