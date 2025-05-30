import { useState, useEffect } from 'react';
import { Message } from '../../domain/entities/Message';
import { MessageRepository } from '../../domain/repositories/MessageRepository';
import { SendMessageUseCase } from '../../domain/use-cases/SendMessageUseCase';
import { GenerateAIResponseUseCase } from '../../domain/use-cases/GenerateAIResponseUseCase';
import { AIService } from '../../infrastructure/api/AIService';

export const useChat = (messageRepository: MessageRepository) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'thinker' | 'maker'>('thinker');
  const [error, setError] = useState<string | null>(null);
  
  const aiService = new AIService();
  const sendMessageUseCase = new SendMessageUseCase(messageRepository);
  const generateAIResponseUseCase = new GenerateAIResponseUseCase(messageRepository, aiService);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const loadedMessages = await messageRepository.getMessages();
      setMessages(loadedMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
      setError('Failed to load messages');
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Update AI service with selected model
      aiService.setModel(selectedModel);
      
      // Send user message
      const userMessage = await sendMessageUseCase.execute(input);
      setInput('');
      await loadMessages();

      // Generate and send AI response
      const aiResponse = await generateAIResponseUseCase.execute(input);
      await loadMessages();
    } catch (error) {
      console.error('Error in chat:', error);
      setError(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = async () => {
    try {
      await messageRepository.clearMessages();
      generateAIResponseUseCase.clearContext();
      setMessages([]);
      setError(null);
    } catch (error) {
      console.error('Error clearing chat:', error);
      setError('Failed to clear chat');
    }
  };

  const changeModel = (model: 'thinker' | 'maker') => {
    setSelectedModel(model);
    setError(null);
    clearChat();
  };

  return {
    messages,
    input,
    setInput,
    handleSend,
    isLoading,
    clearChat,
    selectedModel,
    changeModel,
    error
  };
}; 