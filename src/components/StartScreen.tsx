import { useState } from 'react';
import type { FormEvent } from 'react';
import type { CategoryFilter } from '../types/question';
import { CATEGORIES } from '../constants';
import { questions } from '../data/questions';

interface StartScreenProps {
  onStart: (nickname: string, categoryFilter: CategoryFilter) => void;
}

function countForCategory(categoryFilter: CategoryFilter) {
  if (categoryFilter === 'all') return questions.length;
  return questions.filter((question) => question.category === categoryFilter).length;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = nickname.trim();
    if (!trimmed) {
      setError('닉네임을 입력해주세요.');
      return;
    }
    setError(null);
    onStart(trimmed, categoryFilter);
  }

  const questionCount = countForCategory(categoryFilter);

  return (
    <div className="screen">
      <form className="card" onSubmit={handleSubmit}>
        <h1>상식 퀴즈</h1>
        <p>
          {categoryFilter === 'all' ? '4개 카테고리 전체' : categoryFilter} · 총 {questionCount}문제 · 문제당 15초
        </p>

        <div className="category-select">
          <label className={`category-option ${categoryFilter === 'all' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="categoryFilter"
              value="all"
              checked={categoryFilter === 'all'}
              onChange={() => setCategoryFilter('all')}
            />
            전체
          </label>
          {CATEGORIES.map((category) => (
            <label
              key={category}
              data-category={category}
              className={`category-option ${categoryFilter === category ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="categoryFilter"
                value={category}
                checked={categoryFilter === category}
                onChange={() => setCategoryFilter(category)}
              />
              {category}
            </label>
          ))}
        </div>

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
