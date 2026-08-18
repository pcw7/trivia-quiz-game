import type { CategoryBreakdown } from './session';

export interface LeaderboardEntry {
  id: string;
  nickname: string;
  score: number;
  total: number;
  categoryBreakdown: CategoryBreakdown;
  durationSec: number;
  bestStreak: number;
  completedAt: string;
}
