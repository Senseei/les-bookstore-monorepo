import { AiAction } from '@/infrastructure/ai/enums/ai-action.enum';

export class AiResponseDTO {
  message?: string;
  metadata?: {
    booksRecommended?: string[];
    nextPage?: number;
    requiredActions?: AiAction[];
  };

  constructor(
    message?: string,
    metadata?: {
      booksRecommended?: string[];
      nextPage?: number;
      requiredActions?: AiAction[];
    },
  ) {
    this.message = message;
    this.metadata = metadata;
  }
}
