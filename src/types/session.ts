import type { Category } from './question';

export interface AnswerRecord {
  questionId: string;
  category: Category;
  selectedIndex: 0 | 1 | 2 | 3;
  isCorrect: boolean;
}

export interface QuizSession {
  nickname: string;
  /** 이번 세션에 출제될 문제 id를 카테고리가 고르게 섞인 순서로 담는다. */
  questionOrder: string[];
  currentIndex: number;
  answers: AnswerRecord[];
  startedAt: number;
}

export type CategoryBreakdown = Record<Category, { correct: number; total: number }>;
