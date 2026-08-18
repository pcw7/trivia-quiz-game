import { useEffect, useState } from 'react';
import type { AnswerRecord } from '../types/session';
import type { Question } from '../types/question';
import { QUESTION_TIME_LIMIT_SEC } from '../constants';
import { FeedbackOverlay } from './FeedbackOverlay';

interface QuizScreenProps {
  question: Question;
  index: number;
  total: number;
  isAnswered: boolean;
  currentAnswer: AnswerRecord | null;
  streak: number;
  onSelect: (index: 0 | 1 | 2 | 3) => void;
  onTimeout: () => void;
  onNext: () => void;
}

export function QuizScreen({
  question,
  index,
  total,
  isAnswered,
  currentAnswer,
  streak,
  onSelect,
  onTimeout,
  onNext,
}: QuizScreenProps) {
  const isLastQuestion = index === total - 1;
  const progressPercent = Math.round(((index + 1) / total) * 100);

  const [remainingSec, setRemainingSec] = useState(QUESTION_TIME_LIMIT_SEC);

  // 문제가 바뀔 때마다 제한 시간을 다시 채운다.
  useEffect(() => {
    setRemainingSec(QUESTION_TIME_LIMIT_SEC);
  }, [question.id]);

  // 답변 전까지 1초마다 카운트다운하고, 0에 도달하면 시간 초과를 알린다.
  useEffect(() => {
    if (isAnswered) return;
    if (remainingSec <= 0) {
      onTimeout();
      return;
    }
    const timer = setTimeout(() => setRemainingSec((sec) => sec - 1), 1000);
    return () => clearTimeout(timer);
  }, [isAnswered, remainingSec, onTimeout]);

  const isTimeLow = remainingSec <= 5 && !isAnswered;

  return (
    <div className="screen">
      <div className="quiz-card">
        <div className="quiz-progress">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <span className="quiz-progress-count">
            {index + 1} / {total}
          </span>
          <span
            className={`quiz-timer ${isTimeLow ? 'low' : ''}`}
            role="timer"
            aria-label={`남은 시간 ${remainingSec}초`}
          >
            ⏱ {remainingSec}s
          </span>
        </div>

        <div className="quiz-meta">
          <p className="category-chip" data-category={question.category}>
            {question.category}
          </p>
          {streak >= 2 && (
            <span className="streak-badge" role="status">
              🔥 {streak}연속 정답
            </span>
          )}
        </div>

        <h2 className="question-text">{question.text}</h2>

        <div className="choice-list" role="group" aria-label="선택지">
          {question.choices.map((choice, choiceIndex) => {
            const isAnswerCorrectChoice = choiceIndex === question.answerIndex;
            const isSelectedChoice = currentAnswer?.selectedIndex === choiceIndex;
            let stateClass = '';
            if (isAnswered) {
              if (isAnswerCorrectChoice) stateClass = 'correct';
              else if (isSelectedChoice) stateClass = 'wrong';
            }
            return (
              <button
                key={choiceIndex}
                type="button"
                className={`choice-button ${stateClass}`}
                disabled={isAnswered}
                onClick={() => onSelect(choiceIndex as 0 | 1 | 2 | 3)}
              >
                <span className="choice-mark" aria-hidden="true">
                  {String.fromCharCode(65 + choiceIndex)}
                </span>
                <span>{choice}</span>
                {isAnswered && isAnswerCorrectChoice && <span aria-hidden="true">✓</span>}
                {isAnswered && !isAnswerCorrectChoice && isSelectedChoice && (
                  <span aria-hidden="true">✗</span>
                )}
              </button>
            );
          })}
        </div>

        {isAnswered && currentAnswer && (
          <FeedbackOverlay
            isCorrect={currentAnswer.isCorrect}
            isTimeout={currentAnswer.isTimeout}
            correctChoiceText={question.choices[question.answerIndex]}
            explanation={question.explanation}
            isLastQuestion={isLastQuestion}
            streak={streak}
            onNext={onNext}
          />
        )}
      </div>
    </div>
  );
}
