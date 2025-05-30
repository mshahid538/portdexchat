import { useState } from 'react';
import { Message, ChatSession, ModelType } from '../types/chat';
import { LocalMessageRepository } from '../repositories/LocalMessageRepository';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

// Use existing environment variables
const PORTDEX_API_URL = 'https://api.portdex.ai/chat/completions';
const PORTDEX_API_KEY = 'sk-qxhQVMoOkC7KpyZPfy81uQ';

// Debug environment variables
console.log('API URL:', PORTDEX_API_URL);
console.log('API Key:', PORTDEX_API_KEY); // Log the actual key value
console.log('API Key exists:', !!PORTDEX_API_KEY);
console.log('All env vars:', import.meta.env); // Log all environment variables

export function useChat(messageRepository: LocalMessageRepository) {
  const { isAuthenticated, guestChatCount, incrementGuestChatCount } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelType>('thinker');
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput(''); // Clear input immediately after sending
    setIsLoading(true);
    setError(null);

    try {
      // Check if user is authenticated or has remaining free chats
      if (!isAuthenticated && guestChatCount >= 3) {
        setError('You have reached the limit of 3 free chats. Please sign in to continue.');
        setShowAuthModal(true);
        setIsLoading(false);
        return;
      }

      // Increment guest chat count if not authenticated
      if (!isAuthenticated) {
        incrementGuestChatCount();
      }

      const response = await fetch(PORTDEX_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PORTDEX_API_KEY}`,
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content,
            })),
            {
              role: 'user',
              content: input.trim(),
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    if (currentSessionId) {
      messageRepository.clearSession(currentSessionId);
    }
    setCurrentSessionId(null);
  };

  const changeModel = (model: ModelType) => {
    setSelectedModel(model);
  };

  return {
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
  };
} 