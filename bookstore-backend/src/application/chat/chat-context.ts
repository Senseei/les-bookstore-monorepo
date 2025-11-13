import { Book } from '@/domain/book.entity';

export class ChatContext {
  username: string;
  conversationSummary: string;
  purchaseHistory?: Book[];
  availableBooks?: Book[];
  page: number;

  constructor(
    username: string,
    conversationSummary: string,
    purchaseHistory?: Book[],
    availableBooks?: Book[],
    page: number = 1,
  ) {
    this.username = username;
    this.conversationSummary = conversationSummary;
    this.purchaseHistory = purchaseHistory;
    this.availableBooks = availableBooks;
    this.page = page;
  }
}
