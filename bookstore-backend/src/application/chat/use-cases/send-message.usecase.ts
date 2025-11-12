import { Inject, Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { BooksService } from '@/application/books/services/books.service';
import { OrdersService } from '@/application/orders/services/orders.service';
import { UsersService } from '@/application/users/services';
import { Book } from '@/domain/book.entity';
import { ChatConversation } from '@/domain/chat/chat-conversation.entity';
import { ChatMessage } from '@/domain/chat/chat-message.entity';
import { MessageRole } from '@/domain/chat/enums/message-role.enum';
import { AiAction } from '@/infrastructure/ai/enums/ai-action.enum';

import { BasicChatContext, EnrichedChatContext } from '../basic-chat-context';
import { AiGateway } from '../interfaces/ai.gateway';
import { AiResponseDTO } from '../interfaces/ai-response.dto';
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

    // Step 1: Send basic context first
    const basicContext = await this.buildBasicContext(conversation);
    let response = await this.aiGateway.generateResponse(message, basicContext);

    // Step 2: If AI needs more context, provide requested data
    if (
      response.metadata?.needsMoreContext &&
      response.metadata?.requiredActions?.length > 0
    ) {
      const enrichedContext = await this.buildEnrichedContext(
        conversation,
        response.metadata.requiredActions,
      );
      response = await this.aiGateway.generateResponse(
        message,
        enrichedContext,
      );
    }

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

  private async buildBasicContext(
    chat: ChatConversation,
  ): Promise<BasicChatContext> {
    const conversationSummary = await this.getConversationSummary(chat);
    const currentAttempt = chat.getCurrentAttemptNumber() + 1;

    return new BasicChatContext(
      chat.user.name,
      conversationSummary,
      currentAttempt,
    );
  }

  private async buildEnrichedContext(
    chat: ChatConversation,
    actions: AiAction[],
  ): Promise<EnrichedChatContext> {
    const conversationSummary = await this.getConversationSummary(chat);
    const currentAttempt = chat.getCurrentAttemptNumber() + 1;

    let purchaseHistory: Book[] | undefined = undefined;
    let availableBooks: Book[] | undefined = undefined;

    // Only fetch data if AI requested it
    if (actions.includes(AiAction.USER_PURCHASE_HISTORY)) {
      purchaseHistory = await this.ordersService.findLastBoughtBooksByUser(
        chat.user.id,
        10,
      );
    }

    if (actions.includes(AiAction.AVAILABLE_BOOKS)) {
      const books = await this.booksService.findAll(currentAttempt, 10);
      availableBooks = books.items;
    }

    return new EnrichedChatContext(
      chat.user.name,
      conversationSummary,
      currentAttempt,
      purchaseHistory,
      availableBooks,
    );
  }

  private async getConversationSummary(
    chat: ChatConversation,
  ): Promise<string> {
    const messages = chat.messages;

    if (messages.length === 0) {
      return 'No previous conversation history.';
    }

    // Use AI to generate intelligent summary that includes what context might be needed
    return (await this.generateIntelligentSummary(chat)).message;
  }

  private async generateIntelligentSummary(
    chat: ChatConversation,
  ): Promise<AiResponseDTO> {
    const messages = chat.messages;
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

    return this.aiGateway.generateResponse(summaryPrompt);
  }
}
