import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatService } from '@/application/chat/services/chat.service';
import { ResetChat } from '@/application/chat/use-cases/reset-chat.usecase';
import { SendMessage } from '@/application/chat/use-cases/send-message.usecase';
import { ChatConversation } from '@/domain/chat/chat-conversation.entity';
import { ChatMessage } from '@/domain/chat/chat-message.entity';
import { GeminiGateway } from '@/infrastructure/ai/gemini.gateway';
import { ChatRepositoryImpl } from '@/infrastructure/persistence/typeorm/repositories/chat.repository';
import { ChatSiteController } from '@/presentation/site/chat/chat-site.controller';
import { ChatSiteWebService } from '@/presentation/site/chat/chat-site.webservice';

import { BooksModule } from './books.module';
import { OrdersModule } from './orders.module';
import { UsersModule } from './users.module';

const USE_CASES = [SendMessage, ResetChat];

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatConversation, ChatMessage]),
    BooksModule,
    OrdersModule,
    UsersModule,
  ],
  controllers: [ChatSiteController],
  providers: [
    {
      provide: 'ChatRepository',
      useClass: ChatRepositoryImpl,
    },
    {
      provide: 'AiGateway',
      useClass: GeminiGateway,
    },
    ChatService,
    ChatSiteWebService,
    ...USE_CASES,
  ],
  exports: [ChatService, ...USE_CASES],
})
export class ChatModule {}
