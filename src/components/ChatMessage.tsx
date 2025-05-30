import React, { useState, useEffect } from 'react';
import { Message } from '../types/chat';
import { useTheme } from '../shared/context/ThemeContext';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

interface TypingTextProps {
  text: string;
  theme: 'dark' | 'light';
}

function TypingText({ text, theme }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20); // Adjust speed here (lower = faster)

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <div className={`prose ${theme === 'dark' ? 'prose-invert' : ''} max-w-none`}>
      <ReactMarkdown>{displayedText}</ReactMarkdown>
    </div>
  );
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { theme } = useTheme();
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex gap-4 p-4 ${
        theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser
            ? theme === 'dark'
              ? 'bg-indigo-500'
              : 'bg-indigo-600'
            : theme === 'dark'
            ? 'bg-gray-700'
            : 'bg-gray-200'
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        {isUser ? (
          <div className={`prose ${theme === 'dark' ? 'prose-invert' : ''} max-w-none`}>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ) : (
          <TypingText text={message.content} theme={theme} />
        )}
        <div
          className={`text-xs ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
} 