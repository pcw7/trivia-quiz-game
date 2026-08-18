import { useEffect } from 'react';
import { TIMEOUT_AUTO_ADVANCE_MS } from '../constants';

interface FeedbackOverlayProps {
  isCorrect: boolean;
  isTimeout: boolean;
  correctChoiceText: string;
  explanation?: string;
  isLastQuestion: boolean;
  onNext: () => void;
}

export function FeedbackOverlay({
  isCorrect,
  isTimeout,
  correctChoiceText,
  explanation,
  isLastQuestion,
  onNext,
}: FeedbackOverlayProps) {
  // 시간 초과일 때는 정답을 잠시 보여준 뒤 자동으로 다음 문제로 넘어간다.
  useEffect(() => {
    if (!isTimeout) return;
    const timer = setTimeout(onNext, TIMEOUT_AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [isTimeout, onNext]);

  const title = isCorrect
    ? '✓ 정답입니다'
    : isTimeout
      ? `⏰ 시간 초과 · 정답은 "${correctChoiceText}"`
      : `✗ 오답입니다 · 정답은 "${correctChoiceText}"`;

  return (
    <div className={`feedback ${isCorrect ? 'correct' : 'wrong'}`} role="status" aria-live="polite">
      <p className="feedback-title">{title}</p>
      {explanation && <p className="feedback-explanation">{explanation}</p>}
      {isTimeout && <p className="feedback-auto-advance">잠시 후 자동으로 다음 문제로 넘어갑니다.</p>}
      <button className="button-primary" onClick={onNext} autoFocus>
        {isLastQuestion ? '결과 보기' : '다음 문제'}
      </button>
    </div>
  );
}
