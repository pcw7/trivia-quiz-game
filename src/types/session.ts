import type { Category, CategoryFilter } from './question';

export interface AnswerRecord {
  questionId: string;
  category: Category;
  /** 제한 시간 내에 아무것도 선택하지 못하고 시간이 초과되면 null. */
  selectedIndex: 0 | 1 | 2 | 3 | null;
  isCorrect: boolean;
  isTimeout: boolean;
}

export interface QuizSession {
  nickname: string;
  /** 시작 화면에서 고른 출제 범위. */
  categoryFilter: CategoryFilter;
  /** 이번 세션에 출제될 문제 id를 카테고리가 고르게 섞인 순서로 담는다. */
  questionOrder: string[];
  currentIndex: number;
  answers: AnswerRecord[];
  startedAt: number;
}

export type CategoryBreakdown = Record<Category, { correct: number; total: number }>;
