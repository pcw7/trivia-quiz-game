export type Category = '한국사' | '과학' | '지리' | '예술과문화';

export type Difficulty = '쉬움' | '보통' | '어려움';

export interface Question {
  id: string;
  category: Category;
  text: string;
  choices: [string, string, string, string];
  answerIndex: 0 | 1 | 2 | 3;
  explanation?: string;
  difficulty?: Difficulty;
}
