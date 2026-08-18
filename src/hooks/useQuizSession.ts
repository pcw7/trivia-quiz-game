import { useCallback, useEffect, useState } from 'react';
import { questions } from '../data/questions';
import type { Question } from '../types/question';
import type { AnswerRecord, CategoryBreakdown, QuizSession } from '../types/session';
import { buildSessionQuestionOrder } from '../utils/shuffle';

const STORAGE_KEY = 'trivia-quiz-session';

const questionById = new Map(questions.map((question) => [question.id, question]));

function loadSession(): QuizSession | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as QuizSession;
  } catch {
    return null;
  }
}

function saveSession(session: QuizSession | null) {
  if (!session) {
    sessionStorage.removeItem(STORAGE_KEY);
    return;
  }
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function useQuizSession() {
  const [session, setSession] = useState<QuizSession | null>(() => loadSession());

  useEffect(() => {
    saveSession(session);
  }, [session]);

  const startSession = useCallback((nickname: string) => {
    setSession({
      nickname,
      questionOrder: buildSessionQuestionOrder(questions),
      currentIndex: 0,
      answers: [],
      startedAt: Date.now(),
    });
  }, []);

  const resetSession = useCallback(() => {
    setSession(null);
  }, []);

  const currentQuestion: Question | null =
    session && session.currentIndex < session.questionOrder.length
      ? (questionById.get(session.questionOrder[session.currentIndex]) ?? null)
      : null;

  // 답변 배열은 currentIndex와 같은 속도로 자란다: 길이가 currentIndex보다
  // 크면 현재 문제에 이미 답한 것이다.
  const isCurrentAnswered = session ? session.answers.length > session.currentIndex : false;
  const currentAnswer = isCurrentAnswered ? session!.answers[session!.currentIndex] : null;

  const isFinished = session ? session.currentIndex >= session.questionOrder.length : false;

  const submitAnswer = useCallback((selectedIndex: 0 | 1 | 2 | 3) => {
    setSession((prev) => {
      if (!prev) return prev;
      if (prev.answers.length > prev.currentIndex) return prev; // 이미 답변함
      const question = questionById.get(prev.questionOrder[prev.currentIndex]);
      if (!question) return prev;
      const record: AnswerRecord = {
        questionId: question.id,
        category: question.category,
        selectedIndex,
        isCorrect: selectedIndex === question.answerIndex,
      };
      return { ...prev, answers: [...prev.answers, record] };
    });
  }, []);

  const goToNext = useCallback(() => {
    setSession((prev) => (prev ? { ...prev, currentIndex: prev.currentIndex + 1 } : prev));
  }, []);

  const score = session ? session.answers.filter((answer) => answer.isCorrect).length : 0;

  const categoryBreakdown: CategoryBreakdown = (session?.answers ?? []).reduce(
    (acc, answer) => {
      const entry = acc[answer.category] ?? { correct: 0, total: 0 };
      entry.total += 1;
      if (answer.isCorrect) entry.correct += 1;
      acc[answer.category] = entry;
      return acc;
    },
    {} as CategoryBreakdown,
  );

  const durationSec = session ? Math.round((Date.now() - session.startedAt) / 1000) : 0;

  return {
    session,
    currentQuestion,
    isCurrentAnswered,
    currentAnswer,
    isFinished,
    score,
    total: questions.length,
    categoryBreakdown,
    durationSec,
    startSession,
    submitAnswer,
    goToNext,
    resetSession,
  };
}
