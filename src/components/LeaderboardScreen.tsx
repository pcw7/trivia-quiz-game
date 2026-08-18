import type { LeaderboardEntry } from '../types/leaderboard';
import { formatDuration } from '../utils/format';

interface LeaderboardScreenProps {
  entries: LeaderboardEntry[];
  currentNickname: string;
  onBack: () => void;
}

function formatCompletedAt(iso: string) {
  const date = new Date(iso);
  return date.toLocaleString('ko-KR', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function LeaderboardScreen({ entries, currentNickname, onBack }: LeaderboardScreenProps) {
  // 정렬은 useLeaderboard 훅에서 이미 점수 내림차순, 동점자는 소요 시간 오름차순으로 처리된다.
  const myBestIndex = entries.findIndex((entry) => entry.nickname === currentNickname);

  return (
    <div className="screen">
      <div className="card leaderboard-card">
        <h1>순위표</h1>
        {entries.length === 0 ? (
          <p>아직 기록이 없습니다.</p>
        ) : (
          <div className="table-scroll">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th scope="col">순위</th>
                  <th scope="col">닉네임</th>
                  <th scope="col">점수</th>
                  <th scope="col">최고 연속</th>
                  <th scope="col">소요 시간</th>
                  <th scope="col">완료 시각</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry.id} className={index === myBestIndex ? 'my-record' : ''}>
                    <td>{index + 1}</td>
                    <td>{entry.nickname}</td>
                    <td>
                      {entry.score} / {entry.total}
                    </td>
                    <td>{entry.bestStreak ?? 0}문제</td>
                    <td>{formatDuration(entry.durationSec)}</td>
                    <td>{formatCompletedAt(entry.completedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button className="button-secondary" onClick={onBack}>
          결과로 돌아가기
        </button>
      </div>
    </div>
  );
}
