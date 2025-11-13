import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { DomainEntity } from '../domain.entity';
import { User } from '../user/user.entity';
import { ChatMessage } from './chat-message.entity';
import { MessageRole } from './enums/message-role.enum';

@Entity('tb_chat_conversations')
export class ChatConversation extends DomainEntity {
  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @OneToMany(() => ChatMessage, (message) => message.conversation, {
    cascade: true,
    eager: true,
  })
  _messages: ChatMessage[];

  constructor(user: User) {
    super();
    if (user) {
      this.user = user;
    }
  }

  get messages(): ChatMessage[] {
    return (this._messages ??= []);
  }

  public getLastMessages(count: number = 10): ChatMessage[] {
    return this.messages
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()) // Sort oldest to newest
      .slice(-count);
  }

  public getLastRequestedPage(): number {
    const assistantMessages = this.messages
      .filter(
        (msg) =>
          msg.role === MessageRole.ASSISTANT &&
          msg.metadata?.requestedPage !== undefined,
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Newest first

    if (assistantMessages.length === 0) {
      return 0; // Default to page 0 if no messages found
    }

    return assistantMessages[0].metadata.requestedPage;
  }
}
