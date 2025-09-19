import React, { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../store";
import {
  addMessage,
  setSessionId,
  setChatHistory,
} from "../../store/slices/chatSlice";
import { websocketService } from "../../services/websocket";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";
import ResetButton from "./ResetButton";
import { Message } from "../../types/types";
import { v4 as uuidv4 } from "uuid";
import { MessageSquare, Wifi, WifiOff } from "lucide-react";
import "./ChatWindow.scss";
import { chatAPI } from "../../services/api";


const ChatWindow: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    messages,
    isLoading,
    isStreaming,
    error,
    sessionId,
    // currentSession
  } = useAppSelector((state) => state.chat);


  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isConnected, setIsConnected] = React.useState(false);

  useEffect(() => {
    // Initialize chat session and WebSocket connection
    const initializeChat = async () => {
      if (!sessionId) {
        const result = await chatAPI.createSession();

        if (result.success) {

          dispatch(setSessionId(result?.data?.sessionId));

          // Connect to WebSocket and join session
          websocketService.connect(result?.data?.sessionId);
          websocketService.joinSession(result?.data?.sessionId);
        }
      } else {
        // Reconnect to existing session
        websocketService.connect(sessionId);
        websocketService.joinSession(sessionId);
        // Fetch chat history
          const res = await chatAPI?.getChatHistory(sessionId);
          dispatch(setChatHistory(res.data?.history));
      }
    };

    initializeChat();

    // Check WebSocket connection status
    const checkConnection = setInterval(() => {
      setIsConnected(websocketService.isConnected());
    }, 3000);

    return () => {
      clearInterval(checkConnection);
      if (sessionId) {
        websocketService.leaveSession(sessionId);
      }
      websocketService.disconnect();
    };
  }, [sessionId]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages,dispatch]);

  
  const handleSendMessage = async (text: string) => {
    if (!sessionId || isStreaming) return;

    // Add user message immediately to UI
    const userMessage: Message = {
      id: uuidv4(),
      text,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    dispatch(addMessage(userMessage));

    // Send message via WebSocket for real-time streaming
    if (websocketService.isConnected()) {
      websocketService.sendMessage(text);
    } else {
      // Fallback to REST API
     websocketService.joinSession(sessionId);
     websocketService.sendMessage(text);
     

    }
  };

  const handleResetChat = async () => {
    if (!sessionId) return;

    const result = await chatAPI.resetChat(sessionId);

    if (result.success) {
        dispatch(setChatHistory([]))
        dispatch(setSessionId(result?.data?.sessionId));
        websocketService.joinSession(result?.data?.sessionId);

    }
  };

  const isEmpty = messages?.length === 0;
  const canSendMessage = !isLoading && !isStreaming && sessionId;

  return (
    <div className="chat-window">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-title">
          <MessageSquare className="w-6 h-6" />
          <h1>AskDaily-bot</h1>
        </div>

        <div className="chat-controls">
          <div className="connection-status">
            {isConnected ? (
              <div className="status-indicator online">
                <Wifi className="w-4 h-4" />
                <span>Connected</span>
              </div>
            ) : (
              <div className="status-indicator offline">
                <WifiOff className="w-4 h-4" />
                <span>Disconnected</span>
              </div>
            )}
          </div>

          {sessionId && (
            <div className="session-info">
              <span className="session-label">Session:</span>
              <span className="session-id">{sessionId.split("-")[0]}</span>
            </div>
          )}

          <ResetButton
            onReset={handleResetChat}
            disabled={isEmpty || isLoading}
          />
        </div>
      </div>

      {/* Messages */}
      <div className="messages-container">
        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        )}

        {isEmpty && !isLoading && (
          <div className="empty-state">
            <MessageSquare className="w-16 h-16 text-gray-300" />
            <h3>Welcome to ChatBot Assistant</h3>
            <p>Start a conversation by typing a message below.</p>
          </div>
        )}

        <div className="messages-list">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {isLoading && messages.length === 0 && (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Initializing chat session...</p>
          </div>
        )}
      </div>

      {/* Input */}
      <InputBox
        onSendMessage={handleSendMessage}
        disabled={!canSendMessage}
        placeholder={
          isStreaming
            ? "Bot is typing..."
            : !sessionId
            ? "Connecting..."
            : "Type your message here..."
        }
      />
    </div>
  );
};

export default ChatWindow;
