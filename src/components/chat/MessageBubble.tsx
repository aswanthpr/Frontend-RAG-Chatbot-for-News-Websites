import React, { useEffect, useState } from "react";
import { Message } from "../../types/types";
import { Bot, User } from "lucide-react";
import "./MessageBubble.scss";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (message.isStreaming) {
      const safeContent = message.text ?? "";
      setDisplayedContent(safeContent);
      setIsTyping(message?.text?.length === 0);
    } else if (message.sender === "bot" && !displayedContent) {
      // Animate bot messages on first render
      setIsTyping(true);
      let index = 0;
      const text = message?.text;

      const typewriterEffect = setInterval(() => {
        if (index <= text.length) {
          setDisplayedContent(text.slice(0, index));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(typewriterEffect);
        }
      }, 20);

      return () => clearInterval(typewriterEffect);
    } else {
      setDisplayedContent(message.text);
      setIsTyping(false);
    }
  }, [message.text, message.isStreaming, displayedContent]);

  const formatTime = (timestamp: Date | string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`message-bubble ${
        message.sender === "user" ? "user-message" : "bot-message"
      }`}
    >
      <div className="message-avatar">
        {message.sender === "user" ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      <div className="message-content">
        <div className="message-text">
          {displayedContent}
          {(isTyping || message.isStreaming) && (
            <span className="typing-cursor">|</span>
          )}
        </div>
        <div className="message-time">
          {formatTime(new Date(message.timestamp))}
          {message.isStreaming && (
            <span className="streaming-indicator">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
