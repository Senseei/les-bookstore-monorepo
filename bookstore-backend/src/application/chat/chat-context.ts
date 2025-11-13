import { Book } from '@/domain/book.entity';

export class ChatContext {
  username: string;
  conversationSummary: string;
  purchaseHistory?: Book[];
  availableBooks?: Book[];

  constructor(
    username: string,
    conversationSummary: string,
    purchaseHistory?: Book[],
    availableBooks?: Book[],
  ) {
    this.username = username;
    this.conversationSummary = conversationSummary;
    this.purchaseHistory = purchaseHistory;
    this.availableBooks = availableBooks;
  }
}
