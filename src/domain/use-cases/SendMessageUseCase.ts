import { Message, MessageEntity } from '../entities/Message';
import { MessageRepository } from '../repositories/MessageRepository';

export class SendMessageUseCase {
  constructor(private messageRepository: MessageRepository) {}

  async execute(content: string): Promise<void> {
    const message = new MessageEntity(
      crypto.randomUUID(),
      content,
      new Date(),
      'user'
    );
    await this.messageRepository.addMessage(message);
  }
} 