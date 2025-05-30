import { Message, ChatSession } from '../types/chat';

export class LocalMessageRepository {
  private storageKey = 'chat_sessions';

  private getSessions(): Record<string, ChatSession> {
    const sessions = localStorage.getItem(this.storageKey);
    return sessions ? JSON.parse(sessions) : {};
  }

  private saveSessions(sessions: Record<string, ChatSession>): void {
    localStorage.setItem(this.storageKey, JSON.stringify(sessions));
  }

  createSession(): ChatSession {
    const sessions = this.getSessions();
    const session: ChatSession = {
      id: Date.now().toString(),
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    sessions[session.id] = session;
    this.saveSessions(sessions);
    return session;
  }

  getSession(id: string): ChatSession | null {
    const sessions = this.getSessions();
    const session = sessions[id];
    if (!session) return null;

    // Convert string timestamps back to Date objects
    return {
      ...session,
      createdAt: new Date(session.createdAt),
      updatedAt: new Date(session.updatedAt),
      messages: session.messages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
    };
  }

  addMessage(sessionId: string, message: Message): void {
    const sessions = this.getSessions();
    const session = sessions[sessionId];
    if (!session) return;

    session.messages.push({
      ...message,
      timestamp: new Date(message.timestamp)
    });
    session.updatedAt = new Date();
    this.saveSessions(sessions);
  }

  clearSession(sessionId: string): void {
    const sessions = this.getSessions();
    const session = sessions[sessionId];
    if (!session) return;

    session.messages = [];
    session.updatedAt = new Date();
    this.saveSessions(sessions);
  }

  deleteSession(sessionId: string): void {
    const sessions = this.getSessions();
    delete sessions[sessionId];
    this.saveSessions(sessions);
  }
} 