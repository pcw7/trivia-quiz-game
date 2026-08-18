interface FeedbackOverlayProps {
  isCorrect: boolean;
  explanation?: string;
  onNext: () => void;
}

// TODO(2단계): QuizScreen의 답안 선택 상태에 연결하여 실제 정오답 표시
export function FeedbackOverlay({ isCorrect, explanation, onNext }: FeedbackOverlayProps) {
  return (
    <div className="card">
      <p>{isCorrect ? '✓ 정답입니다' : '✗ 오답입니다'}</p>
      {explanation && <p>{explanation}</p>}
      <button className="button-primary" onClick={onNext}>
        다음 문제
      </button>
    </div>
  );
}
