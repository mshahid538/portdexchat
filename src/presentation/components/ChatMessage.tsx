import React from 'react';
import { Users, Bot } from 'lucide-react';
import { useTheme } from '../../shared/context/ThemeContext';
import { Message } from '../../domain/entities/Message';
import ReactMarkdown from 'react-markdown';
import { Components } from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const { theme } = useTheme();
  const isAI = message.role === 'assistant';

  const components: Components = {
    h1: ({ children }) => <h1 className="text-xl font-semibold mb-3 mt-5">{children}</h1>,
    h2: ({ children }) => <h2 className="text-lg font-semibold mb-3 mt-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-base font-semibold mb-2 mt-3">{children}</h3>,
    p: ({ children }) => <p className="text-base font-normal leading-relaxed mb-2">{children}</p>,
    code: ({ children, className }) => {
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <code className="block p-3 rounded-lg text-sm font-mono bg-gray-100 dark:bg-gray-800 my-3">{children}</code>
      ) : (
        <code className="px-1.5 py-0.5 rounded text-sm font-mono bg-gray-100 dark:bg-gray-800">{children}</code>
      );
    },
    ul: ({ children }) => <ul className="list-disc list-inside space-y-1.5 my-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside space-y-1.5 my-2">{children}</ol>,
    li: ({ children }) => <li className="text-sm">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>
  };

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} items-start gap-2 md:gap-3 fade-enter`}>
      {isAI && (
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
          <Bot className="w-4 h-4 md:w-6 md:h-6 text-white" />
        </div>
      )}
      <div className={`backdrop-blur-sm border px-4 md:px-6 py-2 md:py-3 rounded-2xl shadow max-w-[85%] md:max-w-lg transition-colors duration-200 ${
        theme === 'dark'
          ? isAI 
            ? 'bg-gray-700/80 border-gray-600 text-gray-200'
            : 'bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-500 text-white'
          : isAI
            ? 'bg-white/80 border-gray-100 text-gray-700'
            : 'bg-gradient-to-br from-blue-500 to-indigo-500 border-blue-400 text-white'
      }`}>
        <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
          <ReactMarkdown components={components}>
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
      {!isAI && (
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
          <Users className="w-4 h-4 md:w-6 md:h-6 text-white" />
        </div>
      )}
    </div>
  );
}; 