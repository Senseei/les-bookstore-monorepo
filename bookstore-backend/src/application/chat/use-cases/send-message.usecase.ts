import {
  Inject,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { BooksService } from '@/application/books/services/books.service';
import { OrdersService } from '@/application/orders/services/orders.service';
import { UsersService } from '@/application/users/services';
import { Book } from '@/domain/book.entity';
import { ChatConversation } from '@/domain/chat/chat-conversation.entity';
import { ChatMessage } from '@/domain/chat/chat-message.entity';
import { MessageRole } from '@/domain/chat/enums/message-role.enum';
import { AiAction } from '@/infrastructure/ai/enums/ai-action.enum';

import { ChatContext } from '../chat-context';
import { PromptConfig } from '../enums/configs.enum';
import { AiGateway } from '../interfaces/ai.gateway';
import { AiResponseDTO } from '../interfaces/ai-response.dto';
import { ChatService } from '../services/chat.service';
import { PromptFactory } from './prompt-config/prompt.factory';

@Injectable()
export class SendMessage {
  private readonly logger = new Logger(SendMessage.name);

  constructor(
    private readonly service: ChatService,
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
    private readonly booksService: BooksService,
    private readonly promptFactory: PromptFactory,
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

    let response: AiResponseDTO;

    try {
      const context = await this.buildChatContext(conversation, message);
      const prompt = this.promptFactory.createPrompt(
        message,
        PromptConfig.BOOKSTORE_ASSISTANT,
        context,
      );

      response = await this.aiGateway.generateResponse(prompt, context);
    } catch (error) {
      this.logger.error('Error processing message', error);
      throw new ServiceUnavailableException(
        'AI service is currently unavailable. Please try again later.',
      );
    }

    const userMessage = new ChatMessage({
      content: message,
      role: MessageRole.USER,
    });

    const assistantMessage = new ChatMessage({
      content: response.message,
      role: MessageRole.ASSISTANT,
      metadata: response.metadata,
    });

    conversation.messages.push(userMessage);
    conversation.messages.push(assistantMessage);

    await this.service.save(conversation);

    return { userMessage, assistantMessage };
  }

  private async buildChatContext(
    chat: ChatConversation,
    currentMessage: string,
  ): Promise<ChatContext> {
    const conversationSummary = await this.getConversationSummary(
      chat,
      currentMessage,
    );

    const actions = conversationSummary.metadata?.requiredActions || [];

    let purchaseHistory: Book[] | undefined = undefined;
    let availableBooks: Book[] | undefined = undefined;

    if (actions.includes(AiAction.INCLUDE_USER_PURCHASE_HISTORY)) {
      purchaseHistory = await this.ordersService.findLastBoughtBooksByUser(
        chat.user.id,
        10,
      );
    }

    if (actions.includes(AiAction.INCLUDE_AVAILABLE_BOOKS)) {
      const books = await this.booksService.findAll(
        conversationSummary.metadata?.nextPage || 1,
        10,
      );
      availableBooks = books.items;
    }

    return new ChatContext({
      username: chat.user.name,
      lastMessages: chat.getLastMessages(10),
      conversationSummary: conversationSummary.message,
      purchaseHistory,
      availableBooks,
    });
  }

  private async getConversationSummary(
    chat: ChatConversation,
    currentMessage: string,
    lastNMessages = 20,
  ): Promise<AiResponseDTO> {
    const messages =
      `PAST MESSAGES:\n` +
      chat
        .getLastMessages(lastNMessages)
        .map(
          (msg) =>
            `${msg.role === MessageRole.USER ? 'USER' : 'ASSISTANT'}: ${msg.content}` +
            `${msg.metadata ? ` (Metadata: ${JSON.stringify(msg.metadata)})` : ''}`,
        )
        .join('\n') +
      `\nCURRENT USER MESSAGE: ${currentMessage}`;

    const summaryPrompt = this.promptFactory.createPrompt(
      messages,
      PromptConfig.CONVERSATION_SUMMARIZER,
    );

    return this.aiGateway.generateResponse(summaryPrompt);
  }
}
