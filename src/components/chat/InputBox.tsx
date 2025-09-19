import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader } from 'lucide-react';
import './InputBox.scss';
import { websocketService } from '../../services/websocket';

interface InputBoxProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const InputBox: React.FC<InputBoxProps> = ({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Type your message here..." 
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit =(e: React.FormEvent) => {
    e.preventDefault();
    websocketService.joinSession(localStorage.getItem("sessionId") as string)
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  return (
    <div className="input-box-container">
      <form onSubmit={handleSubmit} className="input-box-form">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="message-input"
          />
          <button
            type="submit"
            disabled={disabled || !message.trim()}
            className="send-button"
          >
            {disabled ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="input-hint">
          Press Enter to send, Shift+Enter for new line
        </div>
      </form>
    </div>
  );
};

export default InputBox;