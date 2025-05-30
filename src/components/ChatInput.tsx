import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useTheme } from '../shared/context/ThemeContext';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export function ChatInput({ value, onChange, onSend, isLoading }: ChatInputProps) {
  const { theme } = useTheme();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && value.trim()) {
        onSend();
      }
    }
  };

  return (
    <div className={`relative flex items-end gap-2 transition-colors duration-200 ${
      theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
    }`}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className={`w-full resize-none rounded-xl border px-4 py-3 pr-12 focus:outline-none focus:ring-2 transition-colors duration-200 ${
          theme === 'dark'
            ? 'bg-gray-700/50 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500/20'
            : 'bg-white/50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20'
        }`}
        rows={1}
        style={{ maxHeight: '200px' }}
      />
      <button
        onClick={onSend}
        disabled={isLoading || !value.trim()}
        className={`absolute right-3 bottom-3 p-2 rounded-full transition-colors duration-200 ${
          isLoading || !value.trim()
            ? theme === 'dark'
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-gray-400 cursor-not-allowed'
            : theme === 'dark'
            ? 'text-indigo-400 hover:text-indigo-300 hover:bg-gray-600'
            : 'text-indigo-500 hover:text-indigo-600 hover:bg-gray-100'
        }`}
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
} 