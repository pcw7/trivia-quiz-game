import { useEffect, useMemo, useRef, useState } from 'react';
import type { Screen } from './types/screen';
import { useQuizSession } from './hooks/useQuizSession';
import { useLeaderboard } from './hooks/useLeaderboard';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';

function App() {
  const {
    session,
    currentQuestion,
    isCurrentAnswered,
    currentAnswer,
    isFinished,
    score,
    total,
    categoryBreakdown,
    durationSec,
    startSession,
    submitAnswer,
    submitTimeout,
    goToNext,
    resetSession,
  } = useQuizSession();

  const { entries, addEntry } = useLeaderboard();

  const [screen, setScreen] = useState<Screen>(() => {
    if (!session) return 'start';
    return session.currentIndex >= session.questionOrder.length ? 'result' : 'quiz';
  });

  const recordedEntryIdRef = useRef<string | null>(null);
  const entryId = session ? `${session.nickname}-${session.startedAt}` : null;

  // 40문제를 모두 풀면(=isFinished) 결과 화면으로 자동 전환한다.
  useEffect(() => {
    if (isFinished && screen === 'quiz') {
      setScreen('result');
    }
  }, [isFinished, screen]);

  // 세션이 끝나면 순위 기록을 1회만 저장한다. entryId를 key로 중복 저장을 막아
  // 새로고침으로 컴포넌트가 다시 마운트돼도 같은 세션이 두 번 기록되지 않는다.
  useEffect(() => {
    if (!isFinished || !session || !entryId) return;
    if (recordedEntryIdRef.current === entryId) return;
    recordedEntryIdRef.current = entryId;

    if (entries.some((entry) => entry.id === entryId)) return;

    addEntry({
      id: entryId,
      nickname: session.nickname,
      score,
      total,
      categoryBreakdown,
      durationSec,
      completedAt: new Date().toISOString(),
    });
  }, [isFinished, session, entryId, entries, score, total, categoryBreakdown, durationSec, addEntry]);

  // 이 세션이 새로고침 이후에도 신기록인지 저장된 기록에서 매번 다시 계산한다.
  // (한 번만 계산해서 state에 담아두면 새로고침 시 사라진다.)
  const isNewRecord = useMemo(() => {
    if (!isFinished || !session || !entryId) return false;
    const previousBest = entries
      .filter((entry) => entry.nickname === session.nickname && entry.id !== entryId)
      .reduce((max, entry) => Math.max(max, entry.score), 0);
    return score > previousBest;
  }, [isFinished, session, entryId, entries, score]);

  function handleStart(nickname: string) {
    startSession(nickname);
    setScreen('quiz');
  }

  function handleRestart() {
    resetSession();
    setScreen('start');
  }

  switch (screen) {
    case 'start':
      return <StartScreen onStart={handleStart} />;

    case 'quiz':
      if (!session || !currentQuestion) return null;
      return (
        <QuizScreen
          question={currentQuestion}
          index={session.currentIndex}
          total={session.questionOrder.length}
          isAnswered={isCurrentAnswered}
          currentAnswer={currentAnswer}
          onSelect={submitAnswer}
          onTimeout={submitTimeout}
          onNext={goToNext}
        />
      );

    case 'result':
      return (
        <ResultScreen
          nickname={session?.nickname ?? ''}
          score={score}
          total={total}
          categoryBreakdown={categoryBreakdown}
          durationSec={durationSec}
          isNewRecord={isNewRecord}
          onShowLeaderboard={() => setScreen('leaderboard')}
          onRestart={handleRestart}
        />
      );

    case 'leaderboard':
      return (
        <LeaderboardScreen
          entries={entries}
          currentNickname={session?.nickname ?? ''}
          onBack={() => setScreen('result')}
        />
      );
  }
}

export default App;
