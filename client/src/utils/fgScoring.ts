/**
 * Final Girl Scoring Calculator
 * Community-inspired scoring rubric for tracking performance across sessions.
 * Final Girl has no official scoring system — this is a fan-made rubric
 * based on common community metrics: health, victims, turns, and difficulty.
 */

export interface FGScoreInput {
  result: 'win' | 'loss';
  healthRemaining: number;
  maxHealth: number;
  usedFinalHealthToken: boolean;
  victimsSaved: number;
  victimsKilled: number;
  totalVictims: number;
  turnCount: number;
  itemsUsed: number;
  horrorLevel: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  finaleRevealed: boolean;
  darkPowerRevealed: boolean;
}

export interface FGScoreBreakdown {
  survivalBonus: number;
  healthScore: number;
  victimScore: number;
  turnEfficiency: number;
  resourcefulness: number;
  horrorControl: number;
  difficultyMultiplier: number;
  bonuses: number;
  rawTotal: number;
  finalScore: number;
  rank: string;
  rankColor: string;
  rankLabel: string;
}

export function calculateFGScore(input: FGScoreInput): FGScoreBreakdown {
  // 1. Survival Bonus
  const survivalBonus = input.result === 'win' ? 50 : 0;

  // 2. Health Remaining (0-25 points)
  let healthScore = input.healthRemaining * 5;
  if (input.healthRemaining === input.maxHealth) {
    healthScore += 10; // Full health bonus
  }
  if (input.usedFinalHealthToken) {
    healthScore -= 5; // Penalty for using last-resort token
  }
  healthScore = Math.max(0, healthScore);

  // 3. Victims (saved = positive, killed = negative)
  let victimScore = input.victimsSaved * 5;
  victimScore -= input.victimsKilled * 3;
  if (input.totalVictims > 0 && input.victimsKilled === 0) {
    victimScore += 15; // All victims saved bonus
  }
  victimScore = Math.max(0, victimScore);

  // 4. Turn Efficiency (fewer turns = better)
  let turnEfficiency = 0;
  if (input.result === 'win') {
    if (input.turnCount <= 8) turnEfficiency = 25;
    else if (input.turnCount <= 12) turnEfficiency = 20;
    else if (input.turnCount <= 16) turnEfficiency = 10;
    else if (input.turnCount <= 20) turnEfficiency = 5;
    else turnEfficiency = 0;
  }

  // 5. Resourcefulness (items used)
  const resourcefulness = Math.min(input.itemsUsed * 2, 20);

  // 6. Horror Control (lower horror = better)
  let horrorControl = 0;
  if (input.horrorLevel <= 2) horrorControl = 10;
  else if (input.horrorLevel <= 4) horrorControl = 5;
  else horrorControl = 0;

  // 7. Bonuses (surviving tough situations)
  let bonuses = 0;
  if (input.finaleRevealed && input.result === 'win') bonuses += 5;
  if (input.darkPowerRevealed && input.result === 'win') bonuses += 5;

  // Calculate raw total
  const rawTotal = survivalBonus + healthScore + victimScore + turnEfficiency + resourcefulness + horrorControl + bonuses;

  // 8. Difficulty Multiplier
  const difficultyMultipliers: Record<string, number> = {
    easy: 0.8,
    medium: 1.0,
    hard: 1.2,
    extreme: 1.5,
  };
  const difficultyMultiplier = difficultyMultipliers[input.difficulty] || 1.0;
  const finalScore = Math.round(rawTotal * difficultyMultiplier);

  // Determine rank
  const { rank, rankColor, rankLabel } = getRank(finalScore);

  return {
    survivalBonus,
    healthScore,
    victimScore,
    turnEfficiency,
    resourcefulness,
    horrorControl,
    difficultyMultiplier,
    bonuses,
    rawTotal,
    finalScore,
    rank,
    rankColor,
    rankLabel,
  };
}

export function getRank(score: number): { rank: string; rankColor: string; rankLabel: string } {
  if (score >= 130) return { rank: 'S', rankColor: '#fbbf24', rankLabel: 'Legendary Survivor' };
  if (score >= 100) return { rank: 'A', rankColor: '#22c55e', rankLabel: 'Final Girl' };
  if (score >= 70) return { rank: 'B', rankColor: '#3b82f6', rankLabel: 'Survivor' };
  if (score >= 45) return { rank: 'C', rankColor: '#a855f7', rankLabel: 'Fighter' };
  if (score >= 25) return { rank: 'D', rankColor: '#f97316', rankLabel: 'Victim' };
  return { rank: 'F', rankColor: '#dc2626', rankLabel: 'Slaughtered' };
}

export function getScoreDescription(rank: string): string {
  switch (rank) {
    case 'S': return 'A perfect horror movie ending. You dominated the Killer with skill and efficiency.';
    case 'A': return 'You survived with grace under pressure. A true Final Girl performance.';
    case 'B': return 'You made it out alive and saved others along the way. Solid survival.';
    case 'C': return 'A hard-fought battle. You survived, but the horror took its toll.';
    case 'D': return 'Barely escaped with your life. The Killer nearly claimed you.';
    case 'F': return 'The horror was too much. The Killer prevails.';
    default: return '';
  }
}
