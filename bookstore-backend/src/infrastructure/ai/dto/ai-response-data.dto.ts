import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
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

  @IsNumber()
  attempt: number = 1;

  @IsOptional()
  @IsBoolean()
  isRecommendation?: boolean = false;

  @IsOptional()
  @IsBoolean()
  needsMoreContext?: boolean = false;

  @IsOptional()
  @IsArray()
  @IsEnum(AiAction, { each: true })
  requiredActions?: AiAction[] = [];
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
