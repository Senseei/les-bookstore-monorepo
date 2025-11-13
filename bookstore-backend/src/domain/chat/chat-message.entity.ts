import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { DomainEntity } from '../domain.entity';
import { ChatConversation } from './chat-conversation.entity';
import { MessageRole } from './enums/message-role.enum';

@Entity('tb_chat_messages')
export class ChatMessage extends DomainEntity {
  @ManyToOne(() => ChatConversation, (conversation) => conversation.messages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  conversation: ChatConversation;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: MessageRole })
  role: MessageRole;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: {
    booksRecommended?: string[]; // IDs dos livros recomendados
    attempt?: number; // Tracking book recommendation attempts
  };

  constructor(props: {
    content: string;
    role: MessageRole;
    metadata?: {
      booksRecommended?: string[];
      attempt: number;
    };
  }) {
    super();
    if (props) {
      this.content = props.content;
      this.role = props.role;
      this.metadata = props.metadata;
    }
  }
}
