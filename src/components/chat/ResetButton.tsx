import React, { useState } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import './ResetButton.scss';

interface ResetButtonProps {
  onReset: () => void;
  disabled?: boolean;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset, disabled = false }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleResetClick = () => {
    if (showConfirm) {
      onReset();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
      // Auto-hide confirmation after 5 seconds
      setTimeout(() => setShowConfirm(false), 5000);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div className="reset-confirm-container">
        <div className="confirm-message">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Clear all messages?</span>
        </div>
        <div className="confirm-buttons">
          <button
            onClick={handleResetClick}
            disabled={disabled}
            className="confirm-button danger"
          >
            Yes, Clear
          </button>
          <button
            onClick={handleCancel}
            className="confirm-button cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleResetClick}
      disabled={disabled}
      className="reset-button"
      title="Clear chat history"
    >
      <RotateCcw className="w-4 h-4" />
      <span className="reset-text">Reset Chat</span>
    </button>
  );
};

export default ResetButton;