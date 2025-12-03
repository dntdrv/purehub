export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  LEARN = 'LEARN',
  SHIELD = 'SHIELD',
  PANIC = 'PANIC'
}

export interface User {
  id: string;
  name: string;
  email?: string;
  isGuest: boolean;
}

export interface UserStats {
  streakStartDate: number | null; // Timestamp
  longestStreak: number;
  totalCheckins: number;
  lastRelapseDate: number | null;
  level: number;
}

export interface Rank {
  title: string;
  minDays: number;
  color: string;
}

// Mind Map / Learn Data Structure
export interface TopicNode {
  id: string;
  title: string;
  category: 'science' | 'strategy' | 'philosophy' | 'emergency';
  summary: string;
  content: string; // Markdown supported
  childrenIds: string[]; // IDs of sub-topics
  relatedIds: string[]; // IDs of related topics
  icon?: string;
}

export interface ShieldGuide {
  id: string;
  platform: string;
  iconName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  steps: {
    title: string;
    description: string;
  }[];
  warning?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}