import { BasicChatContext, EnrichedChatContext } from '../basic-chat-context';
import { AiResponseDTO } from './ai-response.dto';

export interface AiGateway {
  generateResponse(
    message: string,
    context?: BasicChatContext | EnrichedChatContext,
  ): Promise<AiResponseDTO>;
}
