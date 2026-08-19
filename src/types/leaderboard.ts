import type { CategoryFilter } from './question';
import type { CategoryBreakdown } from './session';

export interface LeaderboardEntry {
  id: string;
  nickname: string;
  categoryFilter: CategoryFilter;
  score: number;
  total: number;
  categoryBreakdown: CategoryBreakdown;
  durationSec: number;
  bestStreak: number;
  completedAt: string;
}
