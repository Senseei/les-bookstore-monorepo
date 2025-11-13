import { Book } from '@/domain/book.entity';
import { ChatMessage } from '@/domain/chat/chat-message.entity';

export class ChatContext {
  username: string;
  lastMessages: ChatMessage[];
  conversationSummary: string;
  purchaseHistory?: Book[];
  availableBooks?: Book[];

  constructor(
    username: string,
    lastMessages: ChatMessage[],
    conversationSummary: string,
    purchaseHistory?: Book[],
    availableBooks?: Book[],
  ) {
    this.username = username;
    this.lastMessages = lastMessages;
    this.conversationSummary = conversationSummary;
    this.purchaseHistory = purchaseHistory;
    this.availableBooks = availableBooks;
  }
}
