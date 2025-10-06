import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

class OrderItemDTO {
  @IsUUID()
  bookId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

class PaymentCardDTO {
  @IsUUID()
  cardId: string;

  @IsNumber()
  @Min(0.01)
  amount: number;
}

class ExchangeCouponDTO {
  @IsString()
  @IsNotEmpty()
  couponCode: string;
}

class PromotionalCouponDTO {
  @IsString()
  @IsNotEmpty()
  couponCode: string;
}

export class CreateOrderDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];

  @IsUUID()
  shippingAddressId: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentCardDTO)
  paymentCards?: PaymentCardDTO[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExchangeCouponDTO)
  exchangeCoupons?: ExchangeCouponDTO[];

  @IsOptional()
  @ValidateNested()
  @Type(() => PromotionalCouponDTO)
  promotionalCoupon?: PromotionalCouponDTO;
}