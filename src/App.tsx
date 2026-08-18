import { useState } from 'react';
import type { Screen } from './types/screen';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';

function App() {
  const [screen, setScreen] = useState<Screen>('start');

  switch (screen) {
    case 'start':
      return <StartScreen onStart={() => setScreen('quiz')} />;
    case 'quiz':
      return <QuizScreen onFinish={() => setScreen('result')} />;
    case 'result':
      return (
        <ResultScreen
          onShowLeaderboard={() => setScreen('leaderboard')}
          onRestart={() => setScreen('start')}
        />
      );
    case 'leaderboard':
      return <LeaderboardScreen onBack={() => setScreen('start')} />;
  }
}

export default App;
