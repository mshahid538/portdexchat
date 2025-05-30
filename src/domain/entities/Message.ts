export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export class MessageEntity implements Message {
  constructor(
    public id: string,
    public content: string,
    public timestamp: number,
    public role: 'user' | 'assistant'
  ) {}
} 