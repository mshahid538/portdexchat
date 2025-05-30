export type ModelType = 'thinker' | 'maker';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatState {
  messages: Message[];
  input: string;
  isLoading: boolean;
  error: string | null;
  selectedModel: ModelType;
  currentSessionId: string | null;
} 