import { Message } from '../../domain/entities/Message';
import { MessageRepository } from '../../domain/repositories/MessageRepository';

export class LocalMessageRepository implements MessageRepository {
  private messages: Message[] = [];

  async getMessages(): Promise<Message[]> {
    return this.messages;
  }

  async addMessage(message: Message): Promise<void> {
    this.messages.push(message);
  }

  async clearMessages(): Promise<void> {
    this.messages = [];
  }
} 