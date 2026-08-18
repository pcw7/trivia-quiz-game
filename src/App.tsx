import { useEffect, useState } from 'react';
import type { Screen } from './types/screen';
import { useQuizSession } from './hooks/useQuizSession';
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
    goToNext,
    resetSession,
  } = useQuizSession();

  const [screen, setScreen] = useState<Screen>(() => {
    if (!session) return 'start';
    return session.currentIndex >= session.questionOrder.length ? 'result' : 'quiz';
  });

  // 40문제를 모두 풀면(=isFinished) 결과 화면으로 자동 전환한다.
  useEffect(() => {
    if (isFinished && screen === 'quiz') {
      setScreen('result');
    }
  }, [isFinished, screen]);

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
          onShowLeaderboard={() => setScreen('leaderboard')}
          onRestart={handleRestart}
        />
      );

    case 'leaderboard':
      // TODO(3단계): localStorage 기반 순위표 데이터 연결
      return <LeaderboardScreen onBack={() => setScreen('result')} />;
  }
}

export default App;
