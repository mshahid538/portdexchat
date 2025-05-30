import { Message } from '../entities/Message';

export interface MessageRepository {
  getMessages(): Promise<Message[]>;
  addMessage(message: Message): Promise<void>;
  clearMessages(): Promise<void>;
} 