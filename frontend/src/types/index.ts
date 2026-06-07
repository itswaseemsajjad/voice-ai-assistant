export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type Status = 'idle' | 'recording' | 'processing' | 'speaking';

export interface ChatHistory {
  role: 'user' | 'assistant';
  content: string;
}
