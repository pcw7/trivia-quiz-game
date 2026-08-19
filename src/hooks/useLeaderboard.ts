import { useCallback, useEffect, useState } from 'react';
import type { LeaderboardEntry } from '../types/leaderboard';

const STORAGE_KEY = 'trivia-quiz-leaderboard';

function loadEntries(): LeaderboardEntry[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as LeaderboardEntry[];
  } catch {
    return [];
  }
}

// 점수 내림차순, 동점자는 소요 시간이 짧은 순으로 정렬한다(PRD 4.4).
function sortEntries(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.durationSec - b.durationSec;
  });
}

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() => sortEntries(loadEntries()));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = useCallback((entry: LeaderboardEntry) => {
    setEntries((prev) => sortEntries([...prev, entry]));
  }, []);

  return { entries, addEntry };
}
