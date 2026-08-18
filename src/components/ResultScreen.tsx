interface ResultScreenProps {
  onShowLeaderboard: () => void;
  onRestart: () => void;
}

export function ResultScreen({ onShowLeaderboard, onRestart }: ResultScreenProps) {
  // TODO(3단계): 실제 총점, 카테고리별 정답률, 소요 시간, 신기록 여부로 대체
  return (
    <div className="screen">
      <div className="card">
        <h1>결과</h1>
        <p>총점: -- / 40</p>
        <p>카테고리별 정답률: 준비 중</p>
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
