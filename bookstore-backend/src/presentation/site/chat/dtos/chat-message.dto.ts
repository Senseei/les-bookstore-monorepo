import { ChatMessage } from '@/domain/chat/chat-message.entity';
import { MessageRole } from '@/domain/chat/enums/message-role.enum';

export class ChatMessageDTO {
  content: string;
  role: MessageRole;
  sentAt: Date;
  booksRecommended: string[];

  constructor(entity: ChatMessage) {
    this.content = entity.content;
    this.role = entity.role;
    this.sentAt = entity.createdAt;
    this.booksRecommended = entity.metadata?.booksRecommended || [];
  }
}
