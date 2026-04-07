/*
 * Spirit Island Randomizer
 * Design: "Living Island" — Organic Nature UI
 * Smart randomization logic for game setup with difficulty targeting
 */

import { SPIRITS, ADVERSARIES, SCENARIOS, BLIGHT_CARDS, BOARDS, PLAYER_COLORS } from './gameData';
import { ADVERSARY_DETAILS } from './adversaryDetails';
import type { SessionData, PlayerData } from './gameData';

export type DifficultyTarget = 'any' | 'easy' | 'medium' | 'hard' | 'expert';

// Difficulty ranges for adversary level selection
const DIFFICULTY_RANGES: Record<DifficultyTarget, [number, number]> = {
  any: [0, 11],
  easy: [0, 3],
  medium: [3, 6],
  hard: [6, 9],
  expert: [9, 11],
};

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

/**
 * Randomly select unique spirits for each player
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
  difficulty: DifficultyTarget = 'any'
): Partial<SessionData> {
  const activeExpansions = ['base', ...session.expansions];
  const playerCount = session.playerCount;

  const { adversary, adversaryLevel } = randomizeAdversary(activeExpansions, difficulty);
  const scenario = randomizeScenario(activeExpansions);
  const blightCard = randomizeBlightCard(activeExpansions);
  const boards = randomizeBoards(playerCount, activeExpansions);
  const players = randomizeSpirits(playerCount, activeExpansions, session.players);

  const hasEventDeck = session.expansions.includes('branch-and-claw') ||
    session.expansions.includes('jagged-earth');

  return {
    players,
    adversary,
    adversaryLevel,
    scenario,
    blightCard,
    boards,
    useEventDeck: hasEventDeck,
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
