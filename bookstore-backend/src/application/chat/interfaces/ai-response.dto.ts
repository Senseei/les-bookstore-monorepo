import { AiAction } from '@/infrastructure/ai/enums/ai-action.enum';

export class AiResponseDTO {
  message?: string;
  metadata?: {
    booksRecommended?: string[];
    requestedPage?: number;
    requiredActions?: AiAction[];
  };

  constructor(
    message?: string,
    metadata?: {
      booksRecommended?: string[];
      requestedPage?: number;
      requiredActions?: AiAction[];
    },
  ) {
    this.message = message;
    this.metadata = metadata;
  }
}
