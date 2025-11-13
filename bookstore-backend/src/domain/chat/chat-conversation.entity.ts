import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { DomainEntity } from '../domain.entity';
import { User } from '../user/user.entity';
import { ChatMessage } from './chat-message.entity';

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
}
