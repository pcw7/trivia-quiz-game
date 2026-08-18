import { useState } from 'react';
import type { FormEvent } from 'react';

interface StartScreenProps {
  onStart: (nickname: string) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = nickname.trim();
    if (!trimmed) {
      setError('닉네임을 입력해주세요.');
      return;
    }
    setError(null);
    onStart(trimmed);
  }

  return (
    <div className="screen">
      <form className="card" onSubmit={handleSubmit}>
        <h1>상식 퀴즈</h1>
        <p>한국사 · 과학 · 지리 · 예술과 문화, 총 40문제</p>
        <input
          className="nickname-input"
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          maxLength={16}
          aria-label="닉네임"
        />
        {error && (
          <p className="nickname-error" role="alert">
            {error}
          </p>
        )}
        <button className="button-primary" type="submit">
          시작하기
        </button>
      </form>
    </div>
  );
}
