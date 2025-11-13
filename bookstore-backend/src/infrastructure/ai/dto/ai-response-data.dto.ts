import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { AiAction } from '../enums/ai-action.enum';

export class AiResponseMetadata {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  booksRecommended?: string[] = [];

  @IsOptional()
  @IsArray()
  @IsEnum(AiAction, { each: true })
  requiredActions?: AiAction[] = [];

  @IsOptional()
  @IsNumber()
  nextPage?: number = 1;
}

export class AiResponseData {
  @IsString()
  message: string;

  @Type(() => AiResponseMetadata)
  @IsOptional()
  metadata?: AiResponseMetadata;

  constructor(message?: string, metadata?: AiResponseMetadata) {
    this.message = message || '';
    this.metadata = metadata;
  }
}
