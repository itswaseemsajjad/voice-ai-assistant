export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export type Status = 'idle' | 'recording' | 'processing' | 'speaking'

export interface ChatHistoryItem {
  role: 'user' | 'assistant'
  content: string
}
