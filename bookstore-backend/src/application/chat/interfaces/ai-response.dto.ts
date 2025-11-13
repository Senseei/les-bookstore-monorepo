import { AiAction } from '@/infrastructure/ai/enums/ai-action.enum';

export interface RecommendedBook {
  id: string;
  title: string;
}

export class AiResponseDTO {
  message?: string;
  metadata?: {
    booksRecommended?: RecommendedBook[];
    nextPage?: number;
    requiredActions?: AiAction[];
  };

  constructor(
    message?: string,
    metadata?: {
      booksRecommended?: RecommendedBook[];
      nextPage?: number;
      requiredActions?: AiAction[];
    },
  ) {
    this.message = message;
    this.metadata = metadata;
  }
}
