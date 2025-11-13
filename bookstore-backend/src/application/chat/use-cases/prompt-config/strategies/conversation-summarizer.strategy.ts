import { Injectable } from '@nestjs/common';

import { CONVERSATION_SUMMARIZER_TEMPLATE } from '@/application/chat/config/default.config';
import { PromptConfigTemplate } from '@/application/chat/config/prompt-config.interface';
import { PromptConfig } from '@/application/chat/enums/configs.enum';

import { PromptStrategy } from './prompt-strategy.interface';

@Injectable()
export class ConversationSummarizerStrategy implements PromptStrategy {
  generatePrompt(message: string): string {
    const config = this.getTemplate();

    let prompt = `${config.systemRole}\n\n`;

    // Add instructions
    prompt += `**INSTRUCTIONS:**\n`;
    config.instructions.forEach((instruction, index) => {
      prompt += `${index + 1}. ${instruction}\n`;
    });
    prompt += '\n';

    // Add the conversation to summarize
    prompt += `**CONVERSATION TO SUMMARIZE:**\n${message}\n\n`;

    return prompt;
  }

  getConfig(): PromptConfig {
    return PromptConfig.CONVERSATION_SUMMARIZER;
  }

  getTemplate(): PromptConfigTemplate {
    return CONVERSATION_SUMMARIZER_TEMPLATE;
  }
}
