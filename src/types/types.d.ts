export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  isStreaming?: boolean;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatState {
  currentSession: ChatSession | null;
  messages: Message[];
  isLoading: boolean;
  isStreaming: boolean;
  error: string | null;
  sessionId: string | null;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}