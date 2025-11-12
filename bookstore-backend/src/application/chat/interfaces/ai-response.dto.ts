import { AiAction } from '@/infrastructure/ai/enums/ai-action.enum';

export class AiResponseDTO {
  message: string;
  metadata?: {
    booksRecommended?: string[];
    attempt: number;
    isRecommendation?: boolean;
    needsMoreContext?: boolean;
    requiredActions?: AiAction[];
  };

  constructor(
    message: string,
    metadata?: {
      booksRecommended?: string[];
      attempt: number;
      isRecommendation?: boolean;
      needsMoreContext?: boolean;
      requiredActions?: AiAction[];
    },
  ) {
    this.message = message;
    this.metadata = metadata;
  }
}
