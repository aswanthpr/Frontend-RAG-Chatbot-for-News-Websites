import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ChatState, Message } from '../../types/types';


const initialState: ChatState = {
  currentSession: null,
  messages: [],
  isLoading: false,
  isStreaming: false,
  error: null,
  sessionId: localStorage.getItem("sessionId") ?? null,
};


const chatSlice = createSlice({
  name: 'chat',
  initialState, 
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
    
      state.messages.push(action.payload);
    },
    updateStreamingMessage: (state, action: PayloadAction<{ id: string; content: string; isComplete?: boolean }>) => {
      const { id, content, isComplete } = action.payload;
      const messageIndex = state.messages.findIndex(msg => msg.id === id);
      if (messageIndex !== -1) {
        state.messages[messageIndex].text = content;
        if (isComplete) {
          state.messages[messageIndex].isStreaming = false;
          state.isStreaming = false;
        }
      }
    },
    startStreaming: (state, action: PayloadAction<string>) => {
      const streamingMessage: Message = {
        id: action.payload,
        text: '',
        sender: 'bot',
        timestamp: new Date().toISOString() as string,
        isStreaming: true,
      };
      state.messages.push(streamingMessage);
      state.isStreaming = true;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      localStorage.setItem("sessionId",action?.payload);
      state.sessionId = action.payload;
    },
    setChatHistory: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
     startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { 
  addMessage, 
  updateStreamingMessage, 
  startStreaming, 
  clearError, 
  setSessionId ,
  setChatHistory,
  startLoading,
  stopLoading,
} = chatSlice.actions;

export default chatSlice.reducer;