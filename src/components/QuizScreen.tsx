import { questions } from '../data/questions';

interface QuizScreenProps {
  onFinish: () => void;
}

export function QuizScreen({ onFinish }: QuizScreenProps) {
  // TODO(2단계): 현재 문제 인덱스, 세션 진행 상태로 대체
  const previewQuestion = questions[0];

  return (
    <div className="screen">
      <div className="card">
        <p>1 / {questions.length}</p>
        <p>{previewQuestion.category}</p>
        <h2>{previewQuestion.text}</h2>
        <div>
          {previewQuestion.choices.map((choice, index) => (
            // TODO(2단계): 선택 시 정답 판정 및 즉시 피드백 연결
            <button key={index} className="button-secondary">
              {choice}
            </button>
          ))}
        </div>
        <button className="button-primary" onClick={onFinish}>
          결과 화면으로 (임시)
        </button>
      </div>
    </div>
  );
}
