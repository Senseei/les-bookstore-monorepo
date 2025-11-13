import { ChatContext } from '../chat-context';
import { AiResponseDTO } from './ai-response.dto';

export interface AiGateway {
  generateResponse(
    message: string,
    context?: ChatContext,
  ): Promise<AiResponseDTO>;
}
