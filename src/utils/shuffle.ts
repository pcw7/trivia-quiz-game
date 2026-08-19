import type { Category, Question } from '../types/question';

export function shuffleArray<T>(items: T[]): T[] {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * category를 지정하면 해당 카테고리 문제만 섞어서 반환한다. 지정하지 않으면
 * 카테고리별로 섞은 뒤, 라운드마다 카테고리 순서를 다시 섞어 라운드로빈으로
 * 배치한다 — 4문제 단위로 보면 항상 4개 카테고리가 고르게 섞여 나온다.
 */
export function buildSessionQuestionOrder(allQuestions: Question[], category?: Category): string[] {
  if (category) {
    return shuffleArray(allQuestions.filter((question) => question.category === category)).map(
      (question) => question.id,
    );
  }

  const byCategory = new Map<string, Question[]>();
  for (const question of allQuestions) {
    const group = byCategory.get(question.category) ?? [];
    group.push(question);
    byCategory.set(question.category, group);
  }

  const shuffledGroups = Array.from(byCategory.values()).map(shuffleArray);
  const rounds = Math.max(...shuffledGroups.map((group) => group.length));

  const order: string[] = [];
  for (let round = 0; round < rounds; round++) {
    const roundGroupOrder = shuffleArray(shuffledGroups);
    for (const group of roundGroupOrder) {
      const question = group[round];
      if (question) order.push(question.id);
    }
  }
  return order;
}
