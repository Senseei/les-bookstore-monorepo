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

  get messages(): ChatMessage[] {
    return (this._messages ??= []);
  }

  public getLastMessages(count: number = 10): ChatMessage[] {
    return this.messages.slice(-count);
  }

  constructor(user: User) {
    super();
    if (user) {
      this.user = user;
    }
  }

  /**
   * Extract the current attempt number from the conversation history
   * This is useful for determining the next page of books to recommend
   */
  public getCurrentAttemptNumber(): number {
    const lastAttempt = this.messages
      .filter(
        (msg) => msg.role === MessageRole.ASSISTANT && msg.metadata?.attempt,
      )
      .reduce(
        (maxAttempt, msg) => Math.max(maxAttempt, msg.metadata?.attempt || 0),
        0,
      );

    return lastAttempt;
  }
}
