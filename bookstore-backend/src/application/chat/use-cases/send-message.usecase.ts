import { Inject, Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { BooksService } from '@/application/books/services/books.service';
import { OrdersService } from '@/application/orders/services/orders.service';
import { UsersService } from '@/application/users/services';
import { ChatConversation } from '@/domain/chat/chat-conversation.entity';
import { ChatMessage } from '@/domain/chat/chat-message.entity';
import { MessageRole } from '@/domain/chat/enums/message-role.enum';

import { ChatContext } from '../chat-context';
import { AiGateway } from '../interfaces/ai.gateway';
import { ChatService } from '../services/chat.service';

@Injectable()
export class SendMessage {
  constructor(
    private readonly service: ChatService,
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
    private readonly booksService: BooksService,
    @Inject('AiGateway') private readonly aiGateway: AiGateway,
  ) {}

  @Transactional()
  public async execute(
    userId: string,
    message: string,
  ): Promise<{ userMessage: ChatMessage; assistantMessage: ChatMessage }> {
    const user = await this.usersService.findByIdOrThrow(userId, 'User');

    const conversation =
      (await this.service.findByUserId(userId)) || new ChatConversation(user);

    const context = await this.buildContext(conversation);

    const response = await this.aiGateway.generateResponse(message, context);

    const userMessage = new ChatMessage({
      content: message,
      role: MessageRole.USER,
    });

    conversation.messages.push(userMessage);

    const assistantMessage = new ChatMessage({
      content: response.message,
      role: MessageRole.ASSISTANT,
      metadata: response.metadata,
    });

    conversation.messages.push(assistantMessage);

    await this.service.save(conversation);

    return { userMessage, assistantMessage };
  }

  private async buildContext(chat: ChatConversation): Promise<ChatContext> {
    const lastBooksBought = await this.ordersService.findLastBoughtBooksByUser(
      chat.user.id,
      10,
    );

    const conversationSummary = await this.getConversationSummary(chat);

    const availableBooks = await this.booksService.findAll(
      1 + chat.getCurrentAttemptNumber(),
      10,
    );

    return new ChatContext(
      chat.user.name,
      lastBooksBought,
      conversationSummary,
      availableBooks.items,
    );
  }

  private async getConversationSummary(
    chat: ChatConversation,
  ): Promise<string> {
    const messages = chat.messages;

    if (messages.length === 0) {
      return 'No previous conversation history.';
    }

    // Find the last attempt number from AI messages with metadata
    const lastAttempt = chat.getCurrentAttemptNumber();

    // Build conversation text with enhanced context
    const conversationText = messages
      .map((msg) => {
        const role = msg.role === MessageRole.USER ? 'User' : 'AI';
        let content = `${role}: ${msg.content}`;

        // Add metadata context for AI messages
        if (msg.role === MessageRole.ASSISTANT && msg.metadata) {
          const metadata = msg.metadata;
          const contextInfo = [];

          if (
            metadata.booksRecommended &&
            metadata.booksRecommended.length > 0
          ) {
            contextInfo.push(
              `recommended ${metadata.booksRecommended.length} books`,
            );
          }

          if (metadata.attempt) {
            contextInfo.push(`attempt #${metadata.attempt}`);
          }

          if (contextInfo.length > 0) {
            content += ` [${contextInfo.join(', ')}]`;
          }
        }

        return content;
      })
      .join('\n');

    const summaryPrompt = `Summarize the following conversation between a user and an AI assistant in a bookstore context.
      Focus on:
      - Main topics and interests discussed
      - Books or genres the user has shown interest in
      - Any feedback about previous recommendations
      - Current attempt number: ${lastAttempt > 0 ? `#${lastAttempt}` : 'initial'}

      Conversation:
      ${conversationText}

      Provide a concise summary that will help continue the conversation effectively:`;

    return (await this.aiGateway.generateResponse(summaryPrompt)).message;
  }
}
