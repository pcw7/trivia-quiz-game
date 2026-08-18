interface FeedbackOverlayProps {
  isCorrect: boolean;
  correctChoiceText: string;
  explanation?: string;
  isLastQuestion: boolean;
  onNext: () => void;
}

export function FeedbackOverlay({
  isCorrect,
  correctChoiceText,
  explanation,
  isLastQuestion,
  onNext,
}: FeedbackOverlayProps) {
  return (
    <div className={`feedback ${isCorrect ? 'correct' : 'wrong'}`} role="status" aria-live="polite">
      <p className="feedback-title">
        {isCorrect ? '✓ 정답입니다' : `✗ 오답입니다 · 정답은 "${correctChoiceText}"`}
      </p>
      {explanation && <p className="feedback-explanation">{explanation}</p>}
      <button className="button-primary" onClick={onNext} autoFocus>
        {isLastQuestion ? '결과 보기' : '다음 문제'}
      </button>
    </div>
  );
}
