import { Injectable } from '@nestjs/common';

import { ChatContext } from '@/application/chat/chat-context';
import { BOOKSTORE_ASSISTANT_TEMPLATE } from '@/application/chat/config/default.config';
import { PromptConfigTemplate } from '@/application/chat/config/prompt-config.interface';
import { PromptConfig } from '@/application/chat/enums/configs.enum';

import { PromptStrategy } from './prompt-strategy.interface';

@Injectable()
export class BookstoreAssistantStrategy implements PromptStrategy {
  public generatePrompt(message: string, context: ChatContext): string {
    const config = this.getTemplate();

    let prompt = `${config.systemRole}\n\n`;

    // Add instructions
    prompt += `**INSTRUCTIONS:**\n`;
    config.instructions.forEach((instruction, index) => {
      prompt += `${index + 1}. ${instruction}\n`;
    });
    prompt += '\n';

    // Add context section
    const contextSection = this.buildContextSection(context, config);
    prompt += contextSection;

    // Add the user's message
    prompt += `**USER MESSAGE:**\n${message}\n\n`;

    return prompt;
  }

  public getConfig(): PromptConfig {
    return PromptConfig.BOOKSTORE_ASSISTANT;
  }

  public getTemplate(): PromptConfigTemplate {
    return BOOKSTORE_ASSISTANT_TEMPLATE;
  }

  private buildContextSection(
    context: ChatContext,
    config: PromptConfigTemplate,
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
    if (context.purchaseHistory) {
      const purchaseHistoryText =
        context.purchaseHistory.length > 0
          ? context.purchaseHistory
              .map((book) => `- "${book.title}" by ${book.author}`)
              .join('\n')
          : 'No previous purchases.';
      contextSection += `**PURCHASE HISTORY:**\n${purchaseHistoryText}\n\n`;
    }

    if (context.availableBooks) {
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
    }

    return contextSection;
  }
}
