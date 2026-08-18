import type { CategoryBreakdown } from '../types/session';
import { formatDuration } from '../utils/format';

interface ResultScreenProps {
  nickname: string;
  score: number;
  total: number;
  categoryBreakdown: CategoryBreakdown;
  durationSec: number;
  bestStreak: number;
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
  bestStreak,
  isNewRecord,
  onShowLeaderboard,
  onRestart,
}: ResultScreenProps) {
  return (
    <div className="screen">
      <div className="card">
        <h1>결과</h1>
        <p>{nickname}님, 수고하셨습니다.</p>
        {isNewRecord && <p className="record-badge">🏆 신기록 달성</p>}
        <p className="score-headline">
          {score} / {total}
        </p>
        <p>소요 시간: {formatDuration(durationSec)}</p>
        <p>최고 연속 정답: {bestStreak}문제</p>

        <ul className="category-breakdown">
          {Object.entries(categoryBreakdown).map(([category, breakdown]) => (
            <li key={category}>
              <div className="cb-row">
                <span className="cb-label" data-category={category}>
                  {category}
                </span>
                <span className="cb-score">
                  {breakdown.correct} / {breakdown.total}
                </span>
              </div>
              <div className="cb-bar-track">
                <div
                  className="cb-bar-fill"
                  data-category={category}
                  style={{ width: `${(breakdown.correct / breakdown.total) * 100}%` }}
                />
              </div>
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
