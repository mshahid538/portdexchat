import React, { useState } from 'react';
import { ThemeProvider } from './shared/context/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Chat from './components/Chat';
import { AuthModal } from './components/AuthModal';

function AppContent() {
  const { isAuthenticated, guestChatCount, incrementGuestChatCount } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleNewChat = () => {
    if (!isAuthenticated && guestChatCount >= 3) {
      setShowAuthModal(true);
      return;
    }
    if (!isAuthenticated) {
      incrementGuestChatCount();
    }
    // Handle new chat creation
  };

  return (
    <div className="min-h-screen">
      <header className="p-4 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Portdex Chat</h1>
          <button
            onClick={handleNewChat}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            New Chat
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <Chat />
      </main>

      {!isAuthenticated && (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {3 - guestChatCount} free chats remaining
          </p>
        </div>
      )}

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}