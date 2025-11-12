import { Book } from '@/domain/book.entity';

export class ChatContext {
  username: string;
  purchaseHistory: Book[];
  conversationSummary: string;
  availableBooks: Book[];

  constructor(
    username: string,
    purchaseHistory: Book[],
    conversationSummary: string,
    availableBooks: Book[],
  ) {
    this.username = username;
    this.purchaseHistory = purchaseHistory;
    this.conversationSummary = conversationSummary;
    this.availableBooks = availableBooks;
  }
}
