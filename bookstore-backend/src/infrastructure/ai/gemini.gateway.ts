import { Injectable } from '@nestjs/common';

import { ChatContext } from '@/application/chat/chat-context';
import { AiGateway } from '@/application/chat/interfaces/ai.gateway';
import { AiResponseDTO } from '@/application/chat/interfaces/ai-response.dto';

@Injectable()
export class GeminiGateway implements AiGateway {
  generateResponse(
    message: string,
    context?: ChatContext,
  ): Promise<AiResponseDTO> {
    throw new Error('Method not implemented.');
  }
}
