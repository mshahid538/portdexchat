import { Message, MessageEntity } from '../entities/Message';
import { MessageRepository } from '../repositories/MessageRepository';
import { AIService } from '../../infrastructure/api/AIService';

export class GenerateAIResponseUseCase {
  private conversationContext: { role: string; content: string }[] = [
    {
      role: "system",
      content: "You are a helpful, friendly, and knowledgeable AI assistant. Keep your responses concise and engaging."
    }
  ];

  constructor(
    private messageRepository: MessageRepository,
    private aiService: AIService
  ) {}

  async execute(userMessage: string): Promise<void> {
    // Add user message to context
    this.conversationContext.push({
      role: "user",
      content: userMessage
    });

    // Generate AI response
    const aiResponse = await this.aiService.generateResponse(userMessage);

    // Add AI response to context
    this.conversationContext.push({
      role: "assistant",
      content: aiResponse
    });

    // Keep only last 10 messages for context
    if (this.conversationContext.length > 10) {
      this.conversationContext = [
        this.conversationContext[0], // Keep system message
        ...this.conversationContext.slice(-9) // Keep last 9 messages
      ];
    }

    // Create and save AI message
    const aiMessage = new MessageEntity(
      crypto.randomUUID(),
      aiResponse,
      new Date(),
      'ai'
    );

    await this.messageRepository.addMessage(aiMessage);
  }

  clearContext(): void {
    this.conversationContext = [
      {
        role: "system",
        content: "You are a helpful, friendly, and knowledgeable AI assistant. Keep your responses concise and engaging."
      }
    ];
  }
} 