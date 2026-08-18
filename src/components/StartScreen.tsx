interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="screen">
      <div className="card">
        <h1>상식 퀴즈</h1>
        <p>한국사 · 과학 · 지리 · 예술과 문화, 총 40문제</p>
        {/* TODO(2단계): 닉네임 입력 상태 및 유효성 검사 연결 */}
        <input type="text" placeholder="닉네임을 입력하세요" />
        <button className="button-primary" onClick={onStart}>
          시작하기
        </button>
      </div>
    </div>
  );
}
