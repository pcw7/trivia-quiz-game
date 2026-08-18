import type { AnswerRecord } from '../types/session';
import type { Question } from '../types/question';
import { FeedbackOverlay } from './FeedbackOverlay';

interface QuizScreenProps {
  question: Question;
  index: number;
  total: number;
  isAnswered: boolean;
  currentAnswer: AnswerRecord | null;
  onSelect: (index: 0 | 1 | 2 | 3) => void;
  onNext: () => void;
}

export function QuizScreen({
  question,
  index,
  total,
  isAnswered,
  currentAnswer,
  onSelect,
  onNext,
}: QuizScreenProps) {
  const isLastQuestion = index === total - 1;
  const progressPercent = Math.round(((index + 1) / total) * 100);

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
        </div>

        <p className="category-chip" data-category={question.category}>
          {question.category}
        </p>

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
            correctChoiceText={question.choices[question.answerIndex]}
            explanation={question.explanation}
            isLastQuestion={isLastQuestion}
            onNext={onNext}
          />
        )}
      </div>
    </div>
  );
}
