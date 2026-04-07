/*
 * Spirit Island Randomizer
 * Design: "Living Island" — Organic Nature UI
 * Smart randomization logic for game setup with difficulty targeting
 * and balanced team composition (complementary elements & roles)
 */

import { SPIRITS, ADVERSARIES, SCENARIOS, BLIGHT_CARDS, BOARDS, PLAYER_COLORS } from './gameData';
import { ADVERSARY_DETAILS } from './adversaryDetails';
import { SPIRIT_DETAILS, getSpiritDetail, type SpiritDetail, type Element } from './spiritDetails';
import type { SessionData, PlayerData } from './gameData';

export type DifficultyTarget = 'any' | 'easy' | 'medium' | 'hard' | 'expert';

export type BalanceMode = 'random' | 'balanced';

// Difficulty ranges for adversary level selection
const DIFFICULTY_RANGES: Record<DifficultyTarget, [number, number]> = {
  any: [0, 11],
  easy: [0, 3],
  medium: [3, 6],
  hard: [6, 9],
  expert: [9, 11],
};

// Role names matching powerSummary keys
export const ROLE_NAMES = ['offense', 'control', 'fear', 'defense', 'utility'] as const;
export type RoleName = typeof ROLE_NAMES[number];

// Role display info
export const ROLE_INFO: Record<RoleName, { label: string; icon: string; color: string; description: string }> = {
  offense: { label: 'Offense', icon: '⚔️', color: '#E06C5A', description: 'Destroying Invader buildings and pieces' },
  control: { label: 'Control', icon: '🎯', color: '#5BC0BE', description: 'Moving, containing, and redirecting Invaders' },
  fear: { label: 'Fear', icon: '👁️', color: '#9B59B6', description: 'Generating Fear to advance the Terror Level' },
  defense: { label: 'Defense', icon: '🛡️', color: '#4CAF50', description: 'Protecting lands and Dahan from Ravage' },
  utility: { label: 'Utility', icon: '✨', color: '#D4A843', description: 'Energy gain, card plays, and support abilities' },
};

// All 8 elements
const ALL_ELEMENTS: Element[] = ['Sun', 'Moon', 'Fire', 'Air', 'Water', 'Earth', 'Plant', 'Animal'];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ============================================================
// TEAM BALANCE SCORING
// ============================================================

interface TeamScore {
  total: number;
  roleScore: number;
  elementScore: number;
  complexityScore: number;
  roleCoverage: Record<RoleName, number>;
  elementCoverage: Element[];
  missingRoles: RoleName[];
  missingElements: Element[];
  teamStrengths: RoleName[];
  teamWeaknesses: RoleName[];
}

/**
 * Score a team of spirits for balance.
 * Higher score = better balanced team.
 */
function scoreTeam(spirits: SpiritDetail[]): TeamScore {
  if (spirits.length === 0) {
    return {
      total: 0, roleScore: 0, elementScore: 0, complexityScore: 0,
      roleCoverage: { offense: 0, control: 0, fear: 0, defense: 0, utility: 0 },
      elementCoverage: [], missingRoles: [...ROLE_NAMES], missingElements: [...ALL_ELEMENTS],
      teamStrengths: [], teamWeaknesses: [...ROLE_NAMES],
    };
  }

  // 1. Role coverage — sum of each role across all spirits, penalize gaps
  const roleCoverage: Record<RoleName, number> = { offense: 0, control: 0, fear: 0, defense: 0, utility: 0 };
  for (const spirit of spirits) {
    for (const role of ROLE_NAMES) {
      roleCoverage[role] += spirit.powerSummary[role];
    }
  }

  // Normalize by team size for fair comparison
  const teamSize = spirits.length;
  const normalizedRoles: Record<string, number> = {};
  for (const role of ROLE_NAMES) {
    normalizedRoles[role] = roleCoverage[role] / teamSize;
  }

  // Role score: reward coverage breadth, penalize any role below 1.5 avg
  const MIN_ROLE_THRESHOLD = 1.5;
  let roleScore = 0;
  const missingRoles: RoleName[] = [];
  const teamStrengths: RoleName[] = [];
  const teamWeaknesses: RoleName[] = [];

  for (const role of ROLE_NAMES) {
    const avg = normalizedRoles[role];
    if (avg >= 3) {
      roleScore += 15; // Strong coverage
      teamStrengths.push(role);
    } else if (avg >= 2) {
      roleScore += 10; // Good coverage
    } else if (avg >= MIN_ROLE_THRESHOLD) {
      roleScore += 5; // Acceptable
    } else {
      roleScore -= 10; // Penalty for gap
      missingRoles.push(role);
      teamWeaknesses.push(role);
    }
  }

  // Bonus for having at least one spirit with 4+ in each role
  for (const role of ROLE_NAMES) {
    if (spirits.some(s => s.powerSummary[role] >= 4)) {
      roleScore += 5; // Specialist bonus
    }
  }

  // Penalty for extreme overlap: if multiple spirits have the same top role
  const topRoles = spirits.map(s => {
    let best: RoleName = 'offense';
    let bestVal = 0;
    for (const role of ROLE_NAMES) {
      if (s.powerSummary[role] > bestVal) {
        bestVal = s.powerSummary[role];
        best = role;
      }
    }
    return best;
  });
  const roleFreq: Record<string, number> = {};
  for (const r of topRoles) {
    roleFreq[r] = (roleFreq[r] || 0) + 1;
  }
  for (const count of Object.values(roleFreq)) {
    if (count > 1 && teamSize > 1) {
      roleScore -= (count - 1) * 5; // Overlap penalty
    }
  }

  // 2. Element coverage — reward unique elements, penalize missing ones
  const allElements = new Set<Element>();
  for (const spirit of spirits) {
    for (const el of spirit.elements) {
      allElements.add(el);
    }
  }
  const elementCoverage = Array.from(allElements);
  const missingElements = ALL_ELEMENTS.filter(e => !allElements.has(e));

  // Element score: 8 points per unique element, bonus for 6+
  let elementScore = elementCoverage.length * 8;
  if (elementCoverage.length >= 7) elementScore += 15;
  else if (elementCoverage.length >= 6) elementScore += 10;
  else if (elementCoverage.length >= 5) elementScore += 5;

  // Penalty for too few elements
  if (elementCoverage.length < 4) elementScore -= 15;

  // 3. Complexity spread — mild bonus for mixing complexities
  const complexities = spirits.map(s => s.complexity);
  const uniqueComplexities = new Set(complexities);
  let complexityScore = uniqueComplexities.size * 5;

  // Small penalty if ALL spirits are Very High (harder for new groups)
  if (complexities.every(c => c === 'Very High')) {
    complexityScore -= 10;
  }

  const total = roleScore + elementScore + complexityScore;

  return {
    total, roleScore, elementScore, complexityScore,
    roleCoverage, elementCoverage, missingRoles, missingElements,
    teamStrengths, teamWeaknesses,
  };
}

/**
 * Find the best balanced team from available spirits using sampling.
 * Generates many random teams and picks the highest-scoring one.
 */
function findBalancedTeam(
  available: SpiritDetail[],
  count: number,
  iterations: number = 200
): { spirits: SpiritDetail[]; score: TeamScore } {
  let bestSpirits: SpiritDetail[] = [];
  let bestScore: TeamScore | null = null;

  for (let i = 0; i < iterations; i++) {
    const shuffled = shuffleArray(available);
    const team = shuffled.slice(0, count);
    const score = scoreTeam(team);

    if (!bestScore || score.total > bestScore.total) {
      bestSpirits = team;
      bestScore = score;
    }
  }

  return { spirits: bestSpirits, score: bestScore || scoreTeam([]) };
}

// ============================================================
// PUBLIC API
// ============================================================

/**
 * Randomly select unique spirits for each player (simple random)
 */
export function randomizeSpirits(
  playerCount: number,
  activeExpansions: string[],
  existingPlayers: PlayerData[]
): PlayerData[] {
  const available = SPIRITS.filter(s => activeExpansions.includes(s.expansion));
  const shuffled = shuffleArray(available);
  const selected = shuffled.slice(0, Math.min(playerCount, shuffled.length));

  return existingPlayers.map((player, i) => ({
    ...player,
    spirit: selected[i]?.name || player.spirit,
  }));
}

/**
 * Select spirits with balanced team composition.
 * Returns the players AND the team analysis.
 */
export function randomizeBalancedSpirits(
  playerCount: number,
  activeExpansions: string[],
  existingPlayers: PlayerData[]
): { players: PlayerData[]; analysis: TeamScore } {
  const availableDetails = SPIRIT_DETAILS.filter(s => activeExpansions.includes(s.expansion));

  if (availableDetails.length === 0) {
    return {
      players: existingPlayers,
      analysis: scoreTeam([]),
    };
  }

  // More iterations for larger teams (more combinations to explore)
  const iterations = playerCount <= 2 ? 300 : playerCount <= 4 ? 500 : 800;
  const { spirits, score } = findBalancedTeam(availableDetails, Math.min(playerCount, availableDetails.length), iterations);

  const players = existingPlayers.map((player, i) => ({
    ...player,
    spirit: spirits[i]?.name || player.spirit,
  }));

  return { players, analysis: score };
}

/**
 * Analyze the current team composition and return a score
 */
export function analyzeTeam(spiritNames: string[]): TeamScore {
  const spirits = spiritNames
    .map(name => getSpiritDetail(name))
    .filter((s): s is SpiritDetail => s !== undefined);
  return scoreTeam(spirits);
}

/**
 * Get a human-readable balance rating from a team score
 */
export function getBalanceRating(score: TeamScore): {
  label: string;
  color: string;
  description: string;
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
} {
  if (score.total >= 100) {
    return { label: 'Excellent', color: '#4CAF50', description: 'Outstanding team synergy with broad role and element coverage', grade: 'S' };
  } else if (score.total >= 75) {
    return { label: 'Great', color: '#5BC0BE', description: 'Strong team balance with good coverage across roles and elements', grade: 'A' };
  } else if (score.total >= 55) {
    return { label: 'Good', color: '#D4A843', description: 'Solid team with some minor gaps in coverage', grade: 'B' };
  } else if (score.total >= 35) {
    return { label: 'Fair', color: '#E0944A', description: 'Noticeable gaps in role or element coverage', grade: 'C' };
  } else {
    return { label: 'Weak', color: '#E06C5A', description: 'Significant gaps — consider swapping spirits for better balance', grade: 'D' };
  }
}

/**
 * Get the primary role of a spirit
 */
export function getSpiritRole(spiritName: string): { role: RoleName; value: number } | null {
  const detail = getSpiritDetail(spiritName);
  if (!detail) return null;

  let bestRole: RoleName = 'offense';
  let bestVal = 0;
  for (const role of ROLE_NAMES) {
    if (detail.powerSummary[role] > bestVal) {
      bestVal = detail.powerSummary[role];
      bestRole = role;
    }
  }
  return { role: bestRole, value: bestVal };
}

/**
 * Randomly select an adversary and level based on difficulty target
 */
export function randomizeAdversary(
  activeExpansions: string[],
  difficulty: DifficultyTarget = 'any'
): { adversary: string | null; adversaryLevel: number } {
  const available = ADVERSARIES.filter(a => activeExpansions.includes(a.expansion));
  if (available.length === 0) return { adversary: null, adversaryLevel: 0 };

  const [minDiff, maxDiff] = DIFFICULTY_RANGES[difficulty];

  // Build a pool of (adversary, level) pairs within difficulty range
  const pool: { name: string; level: number; difficulty: number }[] = [];

  for (const adv of available) {
    const detail = ADVERSARY_DETAILS.find(d => d.name === adv.name);
    if (!detail) continue;

    for (const lvl of detail.levels) {
      if (lvl.difficulty >= minDiff && lvl.difficulty < maxDiff) {
        pool.push({ name: adv.name, level: lvl.level, difficulty: lvl.difficulty });
      }
    }
  }

  // If no matches in difficulty range, fall back to any level
  if (pool.length === 0) {
    const adv = pickRandom(available);
    const level = Math.floor(Math.random() * (adv.maxLevel + 1));
    return { adversary: adv.name, adversaryLevel: level };
  }

  const pick = pickRandom(pool);
  return { adversary: pick.name, adversaryLevel: pick.level };
}

/**
 * Randomly select a scenario (or no scenario with 30% chance)
 */
export function randomizeScenario(
  activeExpansions: string[]
): string | null {
  // 30% chance of no scenario
  if (Math.random() < 0.3) return null;

  const available = SCENARIOS.filter(s => activeExpansions.includes(s.expansion));
  if (available.length === 0) return null;

  return pickRandom(available).name;
}

/**
 * Randomly select a blight card
 */
export function randomizeBlightCard(
  activeExpansions: string[]
): string | null {
  const available = BLIGHT_CARDS.filter(b => activeExpansions.includes(b.expansion));
  if (available.length === 0) return null;

  return pickRandom(available).name;
}

/**
 * Randomly select boards for the given player count, avoiding bad pairings
 */
export function randomizeBoards(
  playerCount: number,
  activeExpansions: string[]
): string[] {
  const available = BOARDS.filter(b => activeExpansions.includes(b.expansion));
  if (available.length === 0) return [];

  const needed = Math.min(playerCount, available.length);
  const shuffled = shuffleArray(available);
  const selected: typeof available = [];

  for (const board of shuffled) {
    if (selected.length >= needed) break;

    // Check for bad pairings
    const hasBadPairing = board.avoidPairingWith &&
      selected.some(s => s.id === board.avoidPairingWith);

    if (!hasBadPairing) {
      selected.push(board);
    }
  }

  // If we couldn't fill without bad pairings, just fill the rest
  if (selected.length < needed) {
    for (const board of shuffled) {
      if (selected.length >= needed) break;
      if (!selected.includes(board)) {
        selected.push(board);
      }
    }
  }

  return selected.map(b => b.id);
}

/**
 * Randomize the entire game setup at once
 */
export function randomizeAll(
  session: SessionData,
  difficulty: DifficultyTarget = 'any',
  balanceMode: BalanceMode = 'random'
): Partial<SessionData> & { teamAnalysis?: TeamScore } {
  const activeExpansions = ['base', ...session.expansions];
  const playerCount = session.playerCount;

  const { adversary, adversaryLevel } = randomizeAdversary(activeExpansions, difficulty);
  const scenario = randomizeScenario(activeExpansions);
  const blightCard = randomizeBlightCard(activeExpansions);
  const boards = randomizeBoards(playerCount, activeExpansions);

  const hasEventDeck = session.expansions.includes('branch-and-claw') ||
    session.expansions.includes('jagged-earth');

  let players: PlayerData[];
  let teamAnalysis: TeamScore | undefined;

  if (balanceMode === 'balanced') {
    const result = randomizeBalancedSpirits(playerCount, activeExpansions, session.players);
    players = result.players;
    teamAnalysis = result.analysis;
  } else {
    players = randomizeSpirits(playerCount, activeExpansions, session.players);
    // Still analyze for display
    const spiritNames = players.map(p => p.spirit).filter(Boolean);
    teamAnalysis = analyzeTeam(spiritNames);
  }

  return {
    players,
    adversary,
    adversaryLevel,
    scenario,
    blightCard,
    boards,
    useEventDeck: hasEventDeck,
    teamAnalysis,
  };
}

/**
 * Get difficulty label and color for display
 */
export function getDifficultyInfo(target: DifficultyTarget): { label: string; color: string; description: string } {
  switch (target) {
    case 'easy':
      return { label: 'Easy', color: '#4CAF50', description: 'Adversary difficulty 0–2' };
    case 'medium':
      return { label: 'Medium', color: '#D4A843', description: 'Adversary difficulty 3–5' };
    case 'hard':
      return { label: 'Hard', color: '#E06C5A', description: 'Adversary difficulty 6–8' };
    case 'expert':
      return { label: 'Expert', color: '#CC3333', description: 'Adversary difficulty 9+' };
    default:
      return { label: 'Any', color: '#5BC0BE', description: 'Any difficulty level' };
  }
}

export const DIFFICULTY_OPTIONS: DifficultyTarget[] = ['any', 'easy', 'medium', 'hard', 'expert'];
