import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import chatSlice from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    chat: chatSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['chat/addMessage', 'chat/updateStreamingMessage'],
        ignoredActionsPaths: ['payload.timestamp'],
        ignoredPaths: ['chat.messages.timestamp', 'chat.currentSession.createdAt', 'chat.currentSession.updatedAt'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;