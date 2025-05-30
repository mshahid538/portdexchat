import React, { useRef, useEffect, useState } from 'react';
import { Menu, Info, X, Sparkles, Users, Settings, Sun, Moon, Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../shared/context/ThemeContext';
import { useChat } from '../hooks/useChat';
import { LocalMessageRepository } from '../repositories/LocalMessageRepository';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ModelSelector } from './ModelSelector';
import { AuthModal } from './AuthModal';
import { useAuth } from '../contexts/AuthContext';

const messageRepository = new LocalMessageRepository();

export default function Chat() {
  const { theme, toggleTheme } = useTheme();
  const { resetGuestChatCount } = useAuth();
  const {
    messages,
    input,
    setInput,
    isLoading,
    error,
    selectedModel,
    handleSend,
    clearChat,
    changeModel,
    showAuthModal,
    setShowAuthModal,
  } = useChat(messageRepository);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <div className={`fixed inset-0 flex h-screen w-screen overflow-hidden transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50'
    }`}>
      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-200 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg transform transition-transform duration-200 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4">
            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={changeModel}
            />
          </div>
        </div>
      </div>

      {/* Left Panel */}
      <aside className={`hidden lg:block w-80 border-r flex flex-col shadow-xl backdrop-blur-lg transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gray-800/60 border-gray-700'
          : 'bg-white/60 border-gray-200'
      }`}>
        <div className={`p-4 border-b transition-colors duration-200 ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h1 className={`text-xl font-bold flex items-center gap-2 transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              <Sparkles className="w-5 h-5 text-indigo-500" />
              Portdex Chat
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
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4">
          <ModelSelector selectedModel={selectedModel} onModelChange={changeModel} />
        </div>
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
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
              className={`p-2 rounded-full transition-colors duration-200 ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-indigo-400 hover:bg-gray-700'
                  : 'text-gray-500 hover:text-indigo-500 hover:bg-gray-100'
              }`}
              title="Toggle Info Panel"
            >
              <Info className="w-5 h-5" />
            </button>
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
          </div>
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
                }`}>Welcome to Portdex Chat!</h3>
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
      <aside className={`hidden lg:block w-80 border-l flex flex-col shadow-xl backdrop-blur-lg transition-all duration-300 ${
        isRightPanelOpen ? 'translate-x-0' : 'translate-x-full'
      } ${
        theme === 'dark'
          ? 'bg-gray-800/60 border-gray-700'
          : 'bg-white/60 border-gray-200'
      }`}>
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
              }`}>About Portdex Chat</h3>
              <p className={`text-sm transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                This chat application uses {selectedModel === 'thinker' ? 'Thinker' : 'Maker'} mode to generate responses. 
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
            <div className={`rounded-xl p-4 shadow-sm transition-colors duration-200 ${
              theme === 'dark'
                ? 'bg-gray-700/80'
                : 'bg-white/80'
            }`}>
              <h3 className={`font-medium mb-2 transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Development Tools</h3>
              <button
                onClick={resetGuestChatCount}
                className={`w-full py-2 px-4 rounded-lg transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
                }`}
              >
                Reset Chat Limit
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
} 