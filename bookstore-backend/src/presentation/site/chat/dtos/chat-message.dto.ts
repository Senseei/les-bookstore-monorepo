import { ChatMessage } from '@/domain/chat/chat-message.entity';
import { MessageRole } from '@/domain/chat/enums/message-role.enum';

export class ChatMessageDTO {
  content: string;
  role: MessageRole;
  booksRecommended: string[];

  constructor(entity: ChatMessage) {
    this.content = entity.content;
    this.role = entity.role;
    this.booksRecommended = entity.metadata?.booksRecommended || [];
  }
}
