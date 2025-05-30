import React, { useState } from 'react';
import { Send, Paperclip, Smile, Mic } from 'lucide-react';
import { useTheme } from '../../shared/context/ThemeContext';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  isLoading,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useTheme();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="relative">
      <div
        className={`flex items-center gap-1 md:gap-2 p-2 rounded-2xl transition-all duration-200 ${
          isFocused
            ? theme === 'dark'
              ? 'bg-gray-700/90 shadow-lg ring-2 ring-indigo-500/20'
              : 'bg-white/90 shadow-lg ring-2 ring-indigo-500/20'
            : theme === 'dark'
              ? 'bg-gray-700/70 shadow-md'
              : 'bg-white/70 shadow-md'
        }`}
      >
        <button
          className={`p-1.5 md:p-2 rounded-full transition-colors duration-200 ${
            theme === 'dark'
              ? 'text-gray-400 hover:text-indigo-400 hover:bg-gray-600'
              : 'text-gray-500 hover:text-indigo-500 hover:bg-gray-100'
          }`}
          title="Attach file"
        >
          <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <div className="flex-1">
          <textarea
            className={`w-full bg-transparent outline-none resize-none placeholder-gray-400 text-sm md:text-base py-1.5 md:py-2 px-1 max-h-32 transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}
            placeholder="Type your message..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isLoading}
            rows={1}
          />
        </div>
        <button
          className={`p-1.5 md:p-2 rounded-full transition-colors duration-200 ${
            theme === 'dark'
              ? 'text-gray-400 hover:text-indigo-400 hover:bg-gray-600'
              : 'text-gray-500 hover:text-indigo-500 hover:bg-gray-100'
          }`}
          title="Add emoji"
        >
          <Smile className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <button
          className={`p-1.5 md:p-2 rounded-full transition-colors duration-200 ${
            theme === 'dark'
              ? 'text-gray-400 hover:text-indigo-400 hover:bg-gray-600'
              : 'text-gray-500 hover:text-indigo-500 hover:bg-gray-100'
          }`}
          title="Voice message"
        >
          <Mic className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <button
          className={`p-2 md:p-3 rounded-full transition-all duration-200 ${
            isLoading
              ? theme === 'dark'
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gray-300 cursor-not-allowed'
              : theme === 'dark'
                ? 'bg-gradient-to-br from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                : 'bg-gradient-to-br from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 shadow-lg hover:shadow-xl'
          }`}
          onClick={onSend}
          disabled={isLoading}
          title="Send message"
        >
          <Send className={`w-4 h-4 md:w-5 md:h-5 ${isLoading ? 'text-gray-500' : 'text-white'}`} />
        </button>
      </div>
    </div>
  );
}; 