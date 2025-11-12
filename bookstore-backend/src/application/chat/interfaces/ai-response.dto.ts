export class AiResponseDTO {
  message: string;
  metadata?: {
    booksRecommended?: string[];
    attempt: number;
  };

  constructor(
    message: string,
    metadata?: {
      booksRecommended?: string[];
      attempt: number;
    },
  ) {
    this.message = message;
    this.metadata = metadata;
  }
}
