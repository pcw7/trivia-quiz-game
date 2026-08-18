interface LeaderboardScreenProps {
  onBack: () => void;
}

export function LeaderboardScreen({ onBack }: LeaderboardScreenProps) {
  // TODO(3단계): localStorage에 저장된 기록을 점수순으로 정렬해 표시
  return (
    <div className="screen">
      <div className="card">
        <h1>순위표</h1>
        <p>아직 기록이 없습니다.</p>
        <button className="button-secondary" onClick={onBack}>
          돌아가기
        </button>
      </div>
    </div>
  );
}
