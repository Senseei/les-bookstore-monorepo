import { GoogleGenAI } from '@google/genai';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import {
  BasicChatContext,
  EnrichedChatContext,
} from '@/application/chat/basic-chat-context';
import { AiGateway } from '@/application/chat/interfaces/ai.gateway';
import { AiResponseDTO } from '@/application/chat/interfaces/ai-response.dto';

import {
  DEFAULT_GEMINI_CONFIG,
  GeminiPromptConfig,
} from './config/gemini.config';
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
    context?: BasicChatContext | EnrichedChatContext,
    config: GeminiPromptConfig = DEFAULT_GEMINI_CONFIG,
  ): Promise<AiResponseDTO> {
    try {
      const prompt = this.buildPrompt(message, context, config);

      this.logger.debug('Sending prompt to Gemini', {
        messageLength: message.length,
        hasContext: !!context,
      });

      const modelName =
        this.configService.get<string>('GEMINI_MODEL') ||
        'gemini-2.0-flash-exp';
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

      const responseText =
        result.candidates?.[0]?.content?.parts?.[0]?.text || '';

      this.logger.debug('Received response from Gemini', {
        responseLength: responseText.length,
      });

      return this.parseResponse(responseText, context);
    } catch (error) {
      this.logger.error('Error generating response from Gemini', error);

      // Fallback response
      return new AiResponseDTO(
        'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente em alguns instantes.',
        {
          booksRecommended: [],
          attempt: context ? context.currentAttempt : 1,
        },
      );
    }
  }

  private buildPrompt(
    userMessage: string,
    context?: BasicChatContext | EnrichedChatContext,
    config: GeminiPromptConfig = DEFAULT_GEMINI_CONFIG,
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
    context: BasicChatContext | EnrichedChatContext,
    config: GeminiPromptConfig,
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
            `[${book.id}] "${book.title}" - ${book.author} - $${book.price.toFixed(2)}` +
            (book.description
              ? ` - ${book.description.substring(0, 100)}...`
              : ''),
        )
        .join('\n');
      contextSection += `**AVAILABLE CATALOG (sample):**\n${catalogText}\n\n`;
    }

    return contextSection;
  }

  private parseResponse(
    responseText: string,
    context?: BasicChatContext | EnrichedChatContext,
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
          ? context.currentAttempt
          : 1
        : context
          ? context.currentAttempt - 1
          : 1; // Don't increment for non-recommendations

      const metadata = {
        booksRecommended: responseData.metadata?.booksRecommended || [],
        attempt: Math.max(1, attemptNumber), // Ensure minimum value of 1
        isRecommendation: responseData.metadata?.isRecommendation || false,
        needsMoreContext: responseData.metadata?.needsMoreContext || false,
        requiredActions: responseData.metadata?.requiredActions || [],
      };

      return new AiResponseDTO(responseData.message, metadata);
    } catch (error: any) {
      this.logger.warn('Failed to parse JSON response, using fallback', {
        error: error instanceof Error ? error.message : 'Unknown error',
        responseText,
      });

      // Fallback: extract book IDs from text
      const bookIdRegex = /\(ID:\s*([^)]+)\)/g;
      const booksRecommended: string[] = [];
      let match: RegExpExecArray | null;

      while ((match = bookIdRegex.exec(responseText)) !== null) {
        if (match[1]) {
          booksRecommended.push(String(match[1]).trim());
        }
      }

      // For fallback, assume it's a recommendation if we found book IDs
      const isRecommendationFallback = booksRecommended.length > 0;
      const attemptNumber = isRecommendationFallback
        ? context
          ? context.currentAttempt
          : 1
        : context
          ? context.currentAttempt - 1
          : 1;

      return new AiResponseDTO(
        responseText.replace(/\{[\s\S]*\}/, '').trim() || responseText,
        {
          booksRecommended,
          attempt: Math.max(1, attemptNumber),
          isRecommendation: isRecommendationFallback,
          needsMoreContext: false,
          requiredActions: [],
        },
      );
    }
  }
}
