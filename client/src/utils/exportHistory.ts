/*
 * Export Utilities for Session History
 * Supports CSV download and shareable link generation/parsing
 */
import type { SessionData } from '@/lib/gameData';

// ── CSV Export ──

function escapeCSV(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function sessionsToCSV(sessions: SessionData[]): string {
  const headers = [
    'Date',
    'Result',
    'Players',
    'Spirits',
    'Adversary',
    'Adversary Level',
    'Scenario',
    'Boards',
    'Blight Card',
    'Turns',
    'Win Condition',
    'Loss Reason',
    'Expansions',
    'Notes',
  ];

  const rows = sessions.map((s) => {
    const spirits = s.players
      .filter((p) => p.spirit)
      .map((p) => p.spirit)
      .join('; ');
    const date = new Date(s.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    return [
      date,
      s.result === 'win' ? 'Victory' : s.result === 'loss' ? 'Defeat' : s.result || 'Unknown',
      String(s.playerCount),
      spirits,
      s.adversary || 'None',
      String(s.adversaryLevel),
      s.scenario || 'None',
      s.boards.join(', '),
      s.blightCard || 'Random',
      String(s.turnCount),
      s.winCondition || '',
      s.lossReason || '',
      s.expansions.join(', '),
      s.notes || '',
    ].map(escapeCSV);
  });

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

export function downloadCSV(sessions: SessionData[], filename?: string) {
  const csv = sessionsToCSV(sessions);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `spirit-island-history-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ── Shareable Link (compressed JSON via base64) ──

// Compact session format to minimize URL length
interface CompactSession {
  d: string;   // date
  r: string;   // result
  pc: number;  // playerCount
  sp: string[]; // spirits
  ad: string | null; // adversary
  al: number;  // adversaryLevel
  sc: string | null; // scenario
  bd: string[]; // boards
  bc: string | null; // blightCard
  tc: number;  // turnCount
  wc: string | null; // winCondition
  lr: string | null; // lossReason
  ex: string[]; // expansions
  nt: string;  // notes
}

function compactSession(s: SessionData): CompactSession {
  return {
    d: s.date,
    r: s.result || 'unknown',
    pc: s.playerCount,
    sp: s.players.filter(p => p.spirit).map(p => p.spirit),
    ad: s.adversary,
    al: s.adversaryLevel,
    sc: s.scenario,
    bd: s.boards,
    bc: s.blightCard,
    tc: s.turnCount,
    wc: s.winCondition,
    lr: s.lossReason,
    ex: s.expansions,
    nt: s.notes || '',
  };
}

function expandSession(c: CompactSession): SessionData {
  const colors = ['#4CAF50', '#3A7BD5', '#E85D3A', '#F5C542', '#9B8EC4', '#E0E0E0'];
  return {
    id: `imported-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: c.d,
    result: (c.r === 'win' || c.r === 'loss') ? c.r : null,
    playerCount: c.pc,
    players: c.sp.map((spirit, i) => ({
      name: `Player ${i + 1}`,
      spirit,
      color: colors[i] || '#4CAF50',
    })),
    adversary: c.ad,
    adversaryLevel: c.al,
    scenario: c.sc,
    boards: c.bd,
    blightCard: c.bc,
    turnCount: c.tc,
    winCondition: c.wc,
    lossReason: c.lr,
    expansions: c.ex,
    notes: c.nt,
    useThematicBoards: false,
    useEventDeck: false,
  };
}

export function encodeSessionsForLink(sessions: SessionData[]): string {
  const compact = sessions.map(compactSession);
  const json = JSON.stringify(compact);
  // Use TextEncoder + btoa for safe base64 encoding
  const bytes = new TextEncoder().encode(json);
  const binary = Array.from(bytes).map(b => String.fromCharCode(b)).join('');
  const base64 = btoa(binary);
  // Make URL-safe
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeSessionsFromLink(encoded: string): SessionData[] | null {
  try {
    // Restore standard base64
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding
    while (base64.length % 4 !== 0) base64 += '=';
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const json = new TextDecoder().decode(bytes);
    const compact: CompactSession[] = JSON.parse(json);
    if (!Array.isArray(compact)) return null;
    return compact.map(expandSession);
  } catch {
    return null;
  }
}

// Build a shareable URL with encoded session data
export function buildShareURL(sessions: SessionData[]): string {
  const encoded = encodeSessionsForLink(sessions);
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('shared', encoded);
  return url.toString();
}

// Parse shared sessions from the current URL
export function parseShareFromURL(): SessionData[] | null {
  const params = new URLSearchParams(window.location.search);
  const shared = params.get('shared');
  if (!shared) return null;
  return decodeSessionsFromLink(shared);
}

// Copy text to clipboard with fallback
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch {
      document.body.removeChild(textarea);
      return false;
    }
  }
}

// Generate a single-session share link (for sharing one game result)
export function buildSingleSessionShareURL(session: SessionData): string {
  return buildShareURL([session]);
}

// Generate a text summary of a session for sharing
export function sessionToText(session: SessionData): string {
  const date = new Date(session.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
  const spirits = session.players.filter(p => p.spirit).map(p => p.spirit).join(', ');
  const result = session.result === 'win' ? '🏆 Victory' : '💀 Defeat';
  const lines = [
    `Spirit Island — ${result}`,
    `Date: ${date}`,
    `Players: ${session.playerCount}`,
    `Spirits: ${spirits}`,
  ];
  if (session.adversary) {
    lines.push(`Adversary: ${session.adversary} (Level ${session.adversaryLevel})`);
  }
  if (session.scenario) {
    lines.push(`Scenario: ${session.scenario}`);
  }
  if (session.boards.length > 0) {
    lines.push(`Boards: ${session.boards.join(', ')}`);
  }
  if (session.turnCount > 0) {
    lines.push(`Turns: ${session.turnCount}`);
  }
  if (session.winCondition) {
    lines.push(`Win: ${session.winCondition}`);
  }
  if (session.lossReason) {
    lines.push(`Loss: ${session.lossReason}`);
  }
  return lines.join('\n');
}
