import { Book } from '@/domain/book.entity';

export class BasicChatContext {
  username: string;
  conversationSummary: string;
  currentAttempt: number;

  constructor(
    username: string,
    conversationSummary: string,
    currentAttempt: number = 1,
  ) {
    this.username = username;
    this.conversationSummary = conversationSummary;
    this.currentAttempt = currentAttempt;
  }
}

export class EnrichedChatContext extends BasicChatContext {
  purchaseHistory?: Book[];
  availableBooks?: Book[];

  constructor(
    username: string,
    conversationSummary: string,
    currentAttempt: number = 1,
    purchaseHistory?: Book[],
    availableBooks?: Book[],
  ) {
    super(username, conversationSummary, currentAttempt);
    this.purchaseHistory = purchaseHistory;
    this.availableBooks = availableBooks;
  }
}
