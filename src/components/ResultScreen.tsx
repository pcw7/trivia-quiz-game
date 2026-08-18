import type { CategoryBreakdown } from '../types/session';

interface ResultScreenProps {
  nickname: string;
  score: number;
  total: number;
  categoryBreakdown: CategoryBreakdown;
  durationSec: number;
  isNewRecord: boolean;
  onShowLeaderboard: () => void;
  onRestart: () => void;
}

export function ResultScreen({
  nickname,
  score,
  total,
  categoryBreakdown,
  durationSec,
  isNewRecord,
  onShowLeaderboard,
  onRestart,
}: ResultScreenProps) {
  const minutes = Math.floor(durationSec / 60);
  const seconds = durationSec % 60;

  return (
    <div className="screen">
      <div className="card">
        <h1>결과</h1>
        <p>{nickname}님, 수고하셨습니다.</p>
        {isNewRecord && <p className="record-badge">🏆 신기록 달성</p>}
        <p className="score-headline">
          {score} / {total}
        </p>
        <p>
          소요 시간: {minutes}분 {seconds}초
        </p>

        <ul className="category-breakdown">
          {Object.entries(categoryBreakdown).map(([category, breakdown]) => (
            <li key={category}>
              <span>{category}</span>
              <span className="cb-score">
                {breakdown.correct} / {breakdown.total}
              </span>
            </li>
          ))}
        </ul>

        <button className="button-primary" onClick={onShowLeaderboard}>
          순위표 보기
        </button>
        <button className="button-secondary" onClick={onRestart}>
          다시 하기
        </button>
      </div>
    </div>
  );
}
