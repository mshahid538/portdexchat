import React, { useRef, useEffect, useState } from 'react';
import { Users, Info, Sparkles, Trash2, Settings, Plus, Sun, Moon, Menu, X } from "lucide-react";
import './index.css';
import { ChatMessage } from './presentation/components/ChatMessage';
import { ChatInput } from './presentation/components/ChatInput';
import { ModelSelector } from './presentation/components/ModelSelector';
import { useChat } from './presentation/hooks/useChat';
import { LocalMessageRepository } from './infrastructure/storage/LocalMessageRepository';
import { AppConfig } from './shared/config/app.config';
import './shared/styles/animations.css';
import { useTheme } from './shared/context/ThemeContext';

const messageRepository = new LocalMessageRepository();

function App() {
  const { messages, input, setInput, handleSend, isLoading, clearChat, selectedModel, changeModel, error } = useChat(messageRepository);
  const { theme, toggleTheme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close panels when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.panel') && !target.closest('.mobile-menu-button')) {
        setIsLeftPanelOpen(false);
        setIsRightPanelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`fixed inset-0 flex h-screen w-screen overflow-hidden transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50'
    }`}>
      {/* Mobile Menu Buttons */}
      <div className="md:hidden fixed top-4 left-4 z-50 flex gap-2">
        <button
          onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
          className={`p-2 rounded-full transition-colors duration-200 mobile-menu-button ${
            theme === 'dark'
              ? 'text-gray-400 hover:text-white hover:bg-gray-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Menu className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
          className={`p-2 rounded-full transition-colors duration-200 mobile-menu-button ${
            theme === 'dark'
              ? 'text-gray-400 hover:text-white hover:bg-gray-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Info className="w-5 h-5" />
        </button>
      </div>

      {/* Left Panel */}
      <aside className={`panel fixed md:relative inset-y-0 left-0 w-80 border-r flex flex-col shadow-xl backdrop-blur-lg transition-all duration-300 z-40 ${
        isLeftPanelOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } ${
        theme === 'dark'
          ? 'bg-gray-800/60 border-gray-700'
          : 'bg-white/60 border-gray-200'
      }`}>
        <div className="flex justify-end p-4 md:hidden">
          <button
            onClick={() => setIsLeftPanelOpen(false)}
            className={`p-2 rounded-full transition-colors duration-200 ${
              theme === 'dark'
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className={`p-4 border-b transition-colors duration-200 ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h1 className={`text-xl font-bold flex items-center gap-2 transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              <Sparkles className="w-5 h-5 text-indigo-500" />
              {AppConfig.app.name}
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'text-gray-400 hover:text-yellow-400 hover:bg-gray-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                className={`p-2 rounded-full transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'text-gray-400 hover:text-indigo-400 hover:bg-gray-700'
                    : 'text-gray-500 hover:text-indigo-500 hover:bg-gray-100'
                }`}
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
              : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white'
          }`}>
            <Plus className="w-5 h-5" />
            New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.length === 0 ? (
            <div className={`text-center mt-8 transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <p>No chats yet</p>
              <p className="text-sm mt-2">Start a new conversation!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-xl transition-colors duration-200 cursor-pointer group ${
                  theme === 'dark'
                    ? 'bg-gray-700/50 hover:bg-gray-700/80'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      {msg.content.substring(0, 30)}...
                    </p>
                    <p className={`text-xs transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <ModelSelector selectedModel={selectedModel} onModelChange={changeModel} />
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 w-full">
        {/* Chat Header */}
        <header className={`h-16 border-b flex items-center justify-between px-4 md:px-6 shadow-sm transition-colors duration-200 ${
          theme === 'dark'
            ? 'bg-gray-800/80 border-gray-700'
            : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`font-semibold transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {selectedModel === 'thinker' ? 'Thinker' : 'Maker'} Mode
              </h2>
              <p className={`text-sm transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {selectedModel === 'thinker' ? 'Analytical & Logical' : 'Creative & Practical'}
              </p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className={`p-2 rounded-full transition-colors duration-200 ${
              theme === 'dark'
                ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700'
                : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
            }`}
            title="Clear chat"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 min-h-0">
          {error && (
            <div className={`p-4 rounded-lg mb-4 ${
              theme === 'dark' 
                ? 'bg-red-900/50 text-red-200 border border-red-800' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className={`text-center transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <Sparkles className={`w-12 h-12 mx-auto mb-4 transition-colors duration-200 ${
                  theme === 'dark' ? 'text-indigo-400' : 'text-indigo-500'
                }`} />
                <h3 className={`text-xl font-semibold mb-2 transition-colors duration-200 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-700'
                }`}>Welcome to {AppConfig.app.name}!</h3>
                <p className={`max-w-md mx-auto transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Start a conversation by typing a message below. I'm here to help you with any questions you might have.
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))
          )}
          {isLoading && (
            <div className="flex justify-start items-center gap-3 fade-enter">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <Users className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <div className={`backdrop-blur-sm border px-4 md:px-6 py-2 md:py-3 rounded-2xl italic animate-pulse shadow max-w-[85%] md:max-w-lg transition-colors duration-200 ${
                theme === 'dark'
                  ? 'bg-gray-700/80 border-gray-600 text-gray-300'
                  : 'bg-white/80 border-gray-100 text-gray-600'
              }`}>
                {selectedModel === 'thinker' ? 'Thinker' : 'Maker'} is thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`p-6 border-t transition-colors duration-200 ${
          theme === 'dark'
            ? 'bg-gray-800/80 border-gray-700'
            : 'bg-white/80 border-gray-200'
        }`}>
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            isLoading={isLoading}
          />
        </div>
      </main>

      {/* Right Panel */}
      <aside className={`panel fixed md:relative inset-y-0 right-0 w-80 border-l flex flex-col shadow-xl backdrop-blur-lg transition-all duration-300 z-40 ${
        isRightPanelOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
      } ${
        theme === 'dark'
          ? 'bg-gray-800/60 border-gray-700'
          : 'bg-white/60 border-gray-200'
      }`}>
        <div className="flex justify-end p-4 md:hidden">
          <button
            onClick={() => setIsRightPanelOpen(false)}
            className={`p-2 rounded-full transition-colors duration-200 ${
              theme === 'dark'
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className={`p-4 border-b transition-colors duration-200 ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold flex items-center gap-2 transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            <Info className="w-5 h-5 text-indigo-500" />
            Information
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div className={`rounded-xl p-4 shadow-sm transition-colors duration-200 ${
              theme === 'dark'
                ? 'bg-gray-700/80'
                : 'bg-white/80'
            }`}>
              <h3 className={`font-medium mb-2 transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>About {AppConfig.app.name}</h3>
              <p className={`text-sm transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                This chat application uses {AppConfig.app.name}'s {selectedModel} model to generate responses. 
                The AI maintains conversation context for more natural interactions.
              </p>
            </div>
            <div className={`rounded-xl p-4 shadow-sm transition-colors duration-200 ${
              theme === 'dark'
                ? 'bg-gray-700/80'
                : 'bg-white/80'
            }`}>
              <h3 className={`font-medium mb-2 transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Features</h3>
              <ul className={`text-sm space-y-2 transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  Real-time chat interface
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  AI-powered responses
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  Conversation history
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  Modern UI with animations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {(isLeftPanelOpen || isRightPanelOpen) && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => {
            setIsLeftPanelOpen(false);
            setIsRightPanelOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default App;