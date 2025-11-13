import { GoogleGenAI } from '@google/genai';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { ChatContext } from '@/application/chat/chat-context';
import { AiGateway } from '@/application/chat/interfaces/ai.gateway';
import { AiResponseDTO } from '@/application/chat/interfaces/ai-response.dto';

import { DEFAULT_CONFIG, PromptConfig } from './config/default.config';
import { AiResponseData } from './dto/ai-response-data.dto';

@Injectable()
export class GeminiGateway implements AiGateway {
  private readonly logger = new Logger(GeminiGateway.name);
  private readonly ai: GoogleGenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    this.ai = new GoogleGenAI({
      apiKey,
    });
  }

  async generateResponse(
    message: string,
    context?: ChatContext,
    config: PromptConfig = DEFAULT_CONFIG,
  ): Promise<AiResponseDTO> {
    try {
      const prompt = this.buildPrompt(message, context, config);

      this.logger.debug('Sending prompt to Gemini', {
        messageLength: message.length,
        hasContext: !!context,
        contextType: context?.constructor?.name,
        availableBooksCount: context.availableBooks?.length || 0,
        purchaseHistoryCount: context.purchaseHistory?.length || 0,
        page: context?.page || 1,
      });

      this.logger.debug('Prompt preview', prompt);

      const modelName =
        this.configService.get<string>('GEMINI_MODEL') ||
        'gemini-2.5-flash-exp';
      const result = await this.ai.models.generateContent({
        model: modelName,
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      });

      this.logger.debug('Received raw response from Gemini', result);

      const responseText =
        result.candidates?.[0]?.content?.parts?.[0]?.text || '';

      return this.parseResponse(responseText, context);
    } catch (error) {
      this.logger.error('Error generating response from Gemini', error);

      // Fallback response
      return new AiResponseDTO(
        'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente em alguns instantes.',
        {
          booksRecommended: [],
          page: context ? context.page : 1,
        },
      );
    }
  }

  private buildPrompt(
    userMessage: string,
    context?: ChatContext,
    config: PromptConfig = DEFAULT_CONFIG,
  ): string {
    let prompt = `${config.systemRole}\n\n`;

    if (context) {
      prompt += this.buildContextSection(context, config);
    }

    prompt += `**INSTRUCTIONS:**\n`;
    config.instructions.forEach((instruction, index) => {
      prompt += `${index + 1}. ${instruction}\n`;
    });

    prompt += `\n**RESPONSE FORMAT:**\n`;
    prompt += `ALWAYS respond in valid JSON format following this schema:\n`;
    prompt += `${config.responseFormat.schemaDescription}\n\n`;

    prompt += `**CUSTOMER'S CURRENT MESSAGE:**\n${userMessage}\n\n`;
    prompt += `**YOUR JSON RESPONSE:**\n`;

    return prompt;
  }

  private buildContextSection(
    context: ChatContext,
    config: PromptConfig,
  ): string {
    let contextSection = `**CUSTOMER CONTEXT:**\n`;
    contextSection += `Name: ${context.username}\n\n`;

    // Conversation Summary (always included)
    if (
      context.conversationSummary &&
      context.conversationSummary !== 'No previous conversation history.'
    ) {
      contextSection += `**CONVERSATION SUMMARY:**\n${context.conversationSummary}\n\n`;
    }

    // Check if we have an enriched or old context with additional data
    if ('purchaseHistory' in context && context.purchaseHistory) {
      const purchaseHistoryText =
        context.purchaseHistory.length > 0
          ? context.purchaseHistory
              .map((book) => `- "${book.title}" by ${book.author}`)
              .join('\n')
          : 'No previous purchases.';
      contextSection += `**PURCHASE HISTORY:**\n${purchaseHistoryText}\n\n`;
    }

    if ('availableBooks' in context && context.availableBooks) {
      const catalogText = context.availableBooks
        .slice(0, config.catalogDisplayLimit)
        .map(
          (book) =>
            `[${book.id}] "${book.title}" by ${book.author} - $${book.price.toFixed(2)}` +
            (book.description
              ? ` - ${book.description.substring(0, 100)}...`
              : '') +
            ` (Stock: ${book.stock})`,
        )
        .join('\n');
      contextSection += `**AVAILABLE CATALOG - ONLY RECOMMEND FROM THESE BOOKS:**\n${catalogText}\n\n`;
      contextSection += `IMPORTANT: You can ONLY recommend books from the catalog above. Use the exact ID in brackets [ID].\n\n`;
    } else {
      this.logger.warn('No available books in context for AI recommendations');
    }

    return contextSection;
  }

  private parseResponse(
    responseText: string,
    context?: ChatContext,
  ): AiResponseDTO {
    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      // Use class-transformer to parse and validate the response
      const responseData = plainToInstance(
        AiResponseData,
        JSON.parse(jsonMatch[0]),
      );

      const validationErrors = validateSync(responseData);
      if (validationErrors.length > 0) {
        this.logger.warn('Response validation failed', { validationErrors });
      }

      if (!responseData.message) {
        throw new Error('Missing message field in response');
      }

      // Determine if this is a recommendation and calculate attempt
      const isRecommendation =
        responseData.metadata?.isRecommendation ||
        responseData.metadata?.booksRecommended?.length > 0;

      const attemptNumber = isRecommendation
        ? context
          ? context.page
          : 1
        : context
          ? context.page - 1
          : 1; // Don't increment for non-recommendations

      // Validate that recommended books exist in the available catalog
      let validatedBooksRecommended =
        responseData.metadata?.booksRecommended || [];

      this.logger.debug('AI response received', {
        messageLength: responseData.message.length,
        rawRecommendations: validatedBooksRecommended,
        isRecommendation,
        needsMoreContext: responseData.metadata?.needsMoreContext,
        requiredActions: responseData.metadata?.requiredActions,
      });

      if (
        'availableBooks' in context &&
        context.availableBooks &&
        validatedBooksRecommended.length > 0
      ) {
        const availableBookIds = context.availableBooks.map((book) => book.id);
        const originalCount = validatedBooksRecommended.length;

        this.logger.debug('Validating AI recommendations against catalog', {
          aiRecommendedIds: validatedBooksRecommended,
          availableBookIds: availableBookIds,
          catalogSize: context.availableBooks.length,
        });

        validatedBooksRecommended = validatedBooksRecommended.filter((bookId) =>
          availableBookIds.includes(bookId),
        );

        if (validatedBooksRecommended.length !== originalCount) {
          this.logger.warn(
            'AI recommended books not in catalog - FILTERING OUT',
            {
              originalRecommendations: responseData.metadata?.booksRecommended,
              validRecommendations: validatedBooksRecommended,
              availableBookIds: availableBookIds,
              rejectedRecommendations:
                responseData.metadata?.booksRecommended?.filter(
                  (id) => !availableBookIds.includes(id),
                ),
            },
          );
        } else {
          this.logger.debug('All AI recommendations are valid', {
            validatedRecommendations: validatedBooksRecommended,
          });
        }
      } else if (validatedBooksRecommended.length > 0) {
        this.logger.warn(
          'AI made recommendations but no catalog available for validation',
          {
            recommendations: validatedBooksRecommended,
            hasContext: !!context,
            hasAvailableBooks:
              'availableBooks' in context && !!context.availableBooks,
          },
        );
      }

      const metadata = {
        booksRecommended: validatedBooksRecommended,
        attempt: Math.max(1, attemptNumber), // Ensure minimum value of 1
        isRecommendation: responseData.metadata?.isRecommendation || false,
        needsMoreContext: responseData.metadata?.needsMoreContext || false,
        requiredActions: responseData.metadata?.requiredActions || [],
      };

      this.logger.debug('Returning AI response to user', {
        finalBooksRecommended: validatedBooksRecommended,
        isRecommendation: metadata.isRecommendation,
        attempt: metadata.attempt,
        needsMoreContext: metadata.needsMoreContext,
        messagePreview: responseData.message.substring(0, 100) + '...',
      });

      return new AiResponseDTO(responseData.message, metadata);
    } catch (error: any) {
      this.logger.warn('Failed to parse JSON response, using fallback', {
        error: error instanceof Error ? error.message : 'Unknown error',
        responseText,
      });

      // Fallback: extract book IDs from text
      const bookIdRegex = /\(ID:\s*([^)]+)\)/g;
      let booksRecommended: string[] = [];
      let match: RegExpExecArray | null;

      while ((match = bookIdRegex.exec(responseText)) !== null) {
        if (match[1]) {
          booksRecommended.push(String(match[1]).trim());
        }
      }

      // Validate extracted book IDs against available catalog
      if (
        'availableBooks' in context &&
        context.availableBooks &&
        booksRecommended.length > 0
      ) {
        const availableBookIds = context.availableBooks.map((book) => book.id);
        booksRecommended = booksRecommended.filter((bookId) =>
          availableBookIds.includes(bookId),
        );
      }

      // For fallback, assume it's a recommendation if we found book IDs
      const isRecommendationFallback = booksRecommended.length > 0;
      const attemptNumber = isRecommendationFallback
        ? context
          ? context.page
          : 1
        : context
          ? context.page - 1
          : 1;

      return new AiResponseDTO(
        responseText.replace(/\{[\s\S]*\}/, '').trim() || responseText,
        {
          booksRecommended,
          page: Math.max(1, attemptNumber),
          isRecommendation: isRecommendationFallback,
          needsMoreContext: false,
          requiredActions: [],
        },
      );
    }
  }
}
