export type PredictionType = 'viral' | 'burn' | 'moon' | 'die';

export interface FeedPost {
  id: string;
  author: string;
  handle: string;
  content: string;
  destiny: PredictionType; // The true outcome the oracle must guess
  likes: number;
  reposts: number;
  timeAgo: string;
}

export interface GameState {
  score: number;
  streak: number;
  highestStreak: number;
  energy: number;
  isGameOver: boolean;
}
