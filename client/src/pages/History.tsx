/*
 * History Page — "Living Island" Design
 * Shows past game sessions with win/loss records, statistics dashboard,
 * and export/share functionality (CSV download, shareable links, per-session sharing)
 */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import {
  Trophy, Skull, ChevronLeft, Calendar, Users, Clock,
  Trash2, Play, BarChart3, List, Download, Share2, Link2,
  Copy, Check, X, FileDown, FileText, Upload
} from 'lucide-react';
import type { SessionData } from '@/lib/gameData';
import StatsDashboard from '@/components/StatsDashboard';
import {
  downloadCSV,
  buildShareURL,
  buildSingleSessionShareURL,
  parseShareFromURL,
  copyToClipboard,
  sessionToText,
} from '@/utils/exportHistory';
import { toast } from 'sonner';

const VICTORY_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663316422635/7or2XBJKrDChpLdNiLsCVc/victory-scene-oGukRmkQsiEXcNJnEsVrrj.webp';

const HEADING: React.CSSProperties = { fontFamily: "'Playfair Display', serif" };
const BODY: React.CSSProperties = { fontFamily: "'Source Serif 4', serif" };

export default function History() {
  const { state, dispatch, startNewSession } = useGame();
  const sessions = state.sessionHistory;
  const [tab, setTab] = useState<'stats' | 'sessions'>('stats');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [importBanner, setImportBanner] = useState<SessionData[] | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // Check for shared sessions in URL on mount
  useEffect(() => {
    const shared = parseShareFromURL();
    if (shared && shared.length > 0) {
      setImportBanner(shared);
      // Clean the URL without reloading
      const url = new URL(window.location.href);
      url.searchParams.delete('shared');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  // Close export menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (exportMenuRef.current && !exportMenuRef.current.contains(e.target as Node)) {
        setShowExportMenu(false);
      }
    }
    if (showExportMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showExportMenu]);

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all session history?')) {
      localStorage.removeItem('spirit-island-sessions');
      dispatch({ type: 'LOAD_HISTORY' });
    }
  };

  const handleImport = () => {
    if (importBanner) {
      dispatch({ type: 'IMPORT_SESSIONS', sessions: importBanner });
      toast.success(`Imported ${importBanner.length} session${importBanner.length > 1 ? 's' : ''} successfully`);
      setImportBanner(null);
      setTab('sessions');
    }
  };

  const handleDismissImport = () => {
    setImportBanner(null);
  };

  const handleCopyAllLink = async () => {
    const completedSessions = sessions.filter(s => s.result === 'win' || s.result === 'loss');
    if (completedSessions.length === 0) {
      toast.error('No completed sessions to share');
      return;
    }
    const url = buildShareURL(completedSessions);
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopiedAll(true);
      toast.success('Share link copied to clipboard');
      setTimeout(() => setCopiedAll(false), 2000);
    } else {
      toast.error('Failed to copy link');
    }
    setShowExportMenu(false);
  };

  const handleDownloadCSV = () => {
    const completedSessions = sessions.filter(s => s.result === 'win' || s.result === 'loss');
    if (completedSessions.length === 0) {
      toast.error('No completed sessions to export');
      return;
    }
    downloadCSV(completedSessions);
    toast.success('CSV file downloaded');
    setShowExportMenu(false);
  };

  const completedSessions = sessions.filter(s => s.result === 'win' || s.result === 'loss');

  return (
    <div className="min-h-screen pb-16" style={{ backgroundColor: '#0b1d0e' }}>
      {/* Header */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src={VICTORY_IMG} alt="" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(11, 29, 14, 1) 0%, rgba(11, 29, 14, 0.7) 50%, transparent 100%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 container pb-6">
          <button
            onClick={() => dispatch({ type: 'SET_VIEW', view: 'home' })}
            className="text-sm mb-3 flex items-center gap-1 transition-colors"
            style={{ color: 'rgba(255,255,255,0.4)', ...BODY }}
          >
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white" style={HEADING}>
            Session History
          </h1>
        </div>
      </div>

      {/* Export Button — positioned outside the overflow-hidden header */}
      {sessions.length > 0 && (
        <div className="container relative" style={{ marginTop: '-2.5rem', zIndex: 50 }}>
          <div className="flex justify-end">
            <div className="relative" ref={exportMenuRef}>
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    ...BODY,
                    backgroundColor: showExportMenu ? 'rgba(91, 192, 190, 0.2)' : 'rgba(22, 46, 28, 0.7)',
                    color: showExportMenu ? '#5BC0BE' : 'rgba(255,255,255,0.6)',
                    border: `1px solid ${showExportMenu ? 'rgba(91, 192, 190, 0.4)' : 'rgba(255,255,255,0.1)'}`,
                  }}
                >
                  <Share2 className="w-4 h-4" />
                  Export & Share
                </button>

                {/* Export Dropdown Menu */}
                <AnimatePresence>
                  {showExportMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-64 rounded-xl overflow-hidden z-50"
                      style={{
                        backgroundColor: 'rgba(16, 38, 20, 0.97)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(12px)',
                      }}
                    >
                      <div className="p-2">
                        <button
                          onClick={handleDownloadCSV}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors hover:bg-white/5"
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: 'rgba(91, 192, 190, 0.12)' }}
                          >
                            <FileDown className="w-4 h-4" style={{ color: '#5BC0BE' }} />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white" style={BODY}>Download CSV</div>
                            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)', ...BODY }}>
                              Spreadsheet-ready file
                            </div>
                          </div>
                        </button>

                        <button
                          onClick={handleCopyAllLink}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors hover:bg-white/5"
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: 'rgba(212, 168, 67, 0.12)' }}
                          >
                            {copiedAll ? (
                              <Check className="w-4 h-4" style={{ color: '#4CAF50' }} />
                            ) : (
                              <Link2 className="w-4 h-4" style={{ color: '#D4A843' }} />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white" style={BODY}>
                              {copiedAll ? 'Link Copied!' : 'Copy Share Link'}
                            </div>
                            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)', ...BODY }}>
                              Share all sessions via URL
                            </div>
                          </div>
                        </button>
                      </div>

                      <div
                        className="px-4 py-2.5 text-xs"
                        style={{
                          color: 'rgba(255,255,255,0.3)',
                          borderTop: '1px solid rgba(255,255,255,0.06)',
                          ...BODY,
                        }}
                      >
                        {completedSessions.length} completed session{completedSessions.length !== 1 ? 's' : ''} will be exported
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
      )}

      <div className="container mt-6">
        {/* Import Banner */}
        <AnimatePresence>
          {importBanner && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mb-6 rounded-xl overflow-hidden"
              style={{
                backgroundColor: 'rgba(91, 192, 190, 0.08)',
                border: '1px solid rgba(91, 192, 190, 0.25)',
              }}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: 'rgba(91, 192, 190, 0.15)' }}
                  >
                    <Upload className="w-5 h-5" style={{ color: '#5BC0BE' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white mb-1" style={HEADING}>
                      Shared Sessions Received
                    </h3>
                    <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.5)', ...BODY }}>
                      Someone shared {importBanner.length} session{importBanner.length > 1 ? 's' : ''} with you.
                      Import them to add to your history, or dismiss to ignore.
                    </p>

                    {/* Preview of shared sessions */}
                    <div className="space-y-1.5 mb-3 max-h-32 overflow-y-auto">
                      {importBanner.slice(0, 5).map((s, i) => {
                        const spirits = s.players.filter(p => p.spirit).map(p => p.spirit).join(', ');
                        const date = new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                        return (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs px-2 py-1.5 rounded-md"
                            style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                          >
                            {s.result === 'win' ? (
                              <Trophy className="w-3 h-3 flex-shrink-0" style={{ color: '#D4A843' }} />
                            ) : (
                              <Skull className="w-3 h-3 flex-shrink-0" style={{ color: '#CC3333' }} />
                            )}
                            <span style={{ color: 'rgba(255,255,255,0.6)', ...BODY }}>{date}</span>
                            <span className="truncate" style={{ color: 'rgba(255,255,255,0.4)', ...BODY }}>
                              {spirits}
                            </span>
                            {s.adversary && (
                              <span className="flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)', ...BODY }}>
                                vs {s.adversary}
                              </span>
                            )}
                          </div>
                        );
                      })}
                      {importBanner.length > 5 && (
                        <div className="text-xs px-2" style={{ color: 'rgba(255,255,255,0.3)', ...BODY }}>
                          +{importBanner.length - 5} more session{importBanner.length - 5 > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleImport}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                        style={{
                          backgroundColor: '#5BC0BE',
                          color: '#0b1d0e',
                          ...BODY,
                        }}
                      >
                        <Download className="w-3 h-3" />
                        Import {importBanner.length} Session{importBanner.length > 1 ? 's' : ''}
                      </button>
                      <button
                        onClick={handleDismissImport}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-white/5"
                        style={{
                          color: 'rgba(255,255,255,0.4)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          ...BODY,
                        }}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleDismissImport}
                    className="flex-shrink-0 p-1 rounded-md transition-colors hover:bg-white/5"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {sessions.length === 0 && !importBanner ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'rgba(22, 46, 28, 0.6)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Calendar className="w-8 h-8" style={{ color: 'rgba(255,255,255,0.3)' }} />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2" style={HEADING}>
              No sessions yet
            </h2>
            <p className="mb-6" style={{ color: 'rgba(255,255,255,0.4)', ...BODY }}>
              Start a new game to begin tracking your Spirit Island journey.
            </p>
            <button
              onClick={startNewSession}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: '#5BC0BE', ...BODY }}
            >
              <Play className="w-4 h-4" /> Start New Game
            </button>
          </motion.div>
        ) : (
          <>
            {/* Tab Navigation */}
            <div
              className="flex rounded-xl p-1 mb-6"
              style={{ backgroundColor: 'rgba(22, 46, 28, 0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <button
                onClick={() => setTab('stats')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all"
                style={{
                  ...BODY,
                  backgroundColor: tab === 'stats' ? 'rgba(91, 192, 190, 0.15)' : 'transparent',
                  color: tab === 'stats' ? '#5BC0BE' : 'rgba(255,255,255,0.4)',
                  border: tab === 'stats' ? '1px solid rgba(91, 192, 190, 0.3)' : '1px solid transparent',
                }}
              >
                <BarChart3 className="w-4 h-4" />
                Statistics
              </button>
              <button
                onClick={() => setTab('sessions')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all"
                style={{
                  ...BODY,
                  backgroundColor: tab === 'sessions' ? 'rgba(212, 168, 67, 0.15)' : 'transparent',
                  color: tab === 'sessions' ? '#D4A843' : 'rgba(255,255,255,0.4)',
                  border: tab === 'sessions' ? '1px solid rgba(212, 168, 67, 0.3)' : '1px solid transparent',
                }}
              >
                <List className="w-4 h-4" />
                Sessions ({sessions.length})
              </button>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {tab === 'stats' ? (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <StatsDashboard sessions={completedSessions} />
                </motion.div>
              ) : (
                <motion.div
                  key="sessions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Session List Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-white" style={HEADING}>Past Sessions</h2>
                    <button
                      onClick={clearHistory}
                      className="text-xs flex items-center gap-1 transition-colors hover:opacity-80"
                      style={{ color: 'rgba(255,255,255,0.3)', ...BODY }}
                    >
                      <Trash2 className="w-3 h-3" /> Clear All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {sessions.map((session, i) => (
                      <SessionCard key={session.id} session={session} index={i} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}

function SessionCard({ session, index }: { session: SessionData; index: number }) {
  const isWin = session.result === 'win';
  const date = new Date(session.date);
  const borderColor = isWin ? 'rgba(91, 192, 190, 0.25)' : 'rgba(204, 51, 51, 0.25)';
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  // Close share menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShowShareMenu(false);
      }
    }
    if (showShareMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showShareMenu]);

  const handleCopyLink = async () => {
    const url = buildSingleSessionShareURL(session);
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopiedLink(true);
      toast.success('Session link copied');
      setTimeout(() => setCopiedLink(false), 2000);
    }
    setShowShareMenu(false);
  };

  const handleCopyText = async () => {
    const text = sessionToText(session);
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedText(true);
      toast.success('Session summary copied');
      setTimeout(() => setCopiedText(false), 2000);
    }
    setShowShareMenu(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="p-4 rounded-xl"
      style={{ backgroundColor: 'rgba(22, 46, 28, 0.5)', border: `1px solid ${borderColor}` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: isWin ? 'rgba(91, 192, 190, 0.12)' : 'rgba(204, 51, 51, 0.12)' }}
          >
            {isWin ? (
              <Trophy className="w-5 h-5" style={{ color: '#D4A843' }} />
            ) : (
              <Skull className="w-5 h-5" style={{ color: '#CC3333' }} />
            )}
          </div>
          <div>
            <div className="font-semibold text-white" style={HEADING}>
              {isWin ? 'Victory' : 'Defeat'}
            </div>
            <div className="text-xs flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.35)', ...BODY }}>
              <Calendar className="w-3 h-3" />
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              {session.turnCount > 0 && (
                <>
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                  <Clock className="w-3 h-3" />
                  {session.turnCount} turns
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Share button per session */}
          <div className="relative" ref={shareRef}>
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-1.5 rounded-md transition-all hover:bg-white/5"
              style={{ color: showShareMenu ? '#5BC0BE' : 'rgba(255,255,255,0.25)' }}
              title="Share this session"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            <AnimatePresence>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.95 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 top-full mt-1 w-48 rounded-lg overflow-hidden z-50"
                  style={{
                    backgroundColor: 'rgba(16, 38, 20, 0.97)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="p-1.5">
                    <button
                      onClick={handleCopyLink}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-xs text-left transition-colors hover:bg-white/5"
                      style={BODY}
                    >
                      {copiedLink ? (
                        <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#4CAF50' }} />
                      ) : (
                        <Link2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#5BC0BE' }} />
                      )}
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}>
                        {copiedLink ? 'Copied!' : 'Copy Share Link'}
                      </span>
                    </button>
                    <button
                      onClick={handleCopyText}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-xs text-left transition-colors hover:bg-white/5"
                      style={BODY}
                    >
                      {copiedText ? (
                        <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#4CAF50' }} />
                      ) : (
                        <FileText className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#D4A843' }} />
                      )}
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}>
                        {copiedText ? 'Copied!' : 'Copy as Text'}
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.35)', ...BODY }}>
            <Users className="w-3 h-3" />
            {session.playerCount}
          </div>
        </div>
      </div>

      {/* Spirits */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {session.players.filter(p => p.spirit).map((p, i) => (
          <span
            key={i}
            className="text-xs px-2 py-0.5 rounded-md"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', ...BODY }}
          >
            {p.spirit}
          </span>
        ))}
      </div>

      {/* Details */}
      <div className="text-xs space-y-0.5" style={BODY}>
        {session.adversary && (
          <div style={{ color: 'rgba(255,255,255,0.4)' }}>vs {session.adversary} (Level {session.adversaryLevel})</div>
        )}
        {session.scenario && <div style={{ color: 'rgba(255,255,255,0.4)' }}>Scenario: {session.scenario}</div>}
        {session.boards.length > 0 && (
          <div style={{ color: 'rgba(255,255,255,0.35)' }}>Boards: {session.boards.join(', ')}</div>
        )}
        {session.winCondition && (
          <div style={{ color: '#5BC0BE' }}>
            {session.winCondition}
          </div>
        )}
        {session.lossReason && (
          <div style={{ color: '#CC3333' }}>
            {session.lossReason}
          </div>
        )}
      </div>
    </motion.div>
  );
}
