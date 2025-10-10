import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from '@/application/orders/services/orders.service';
import { CreateNewOrder } from '@/application/orders/use-cases/create-new-order.usecase';
import { Order } from '@/domain/order/order.entity';
import { OrderItem } from '@/domain/order/order-item.entity';
import { OrdersRepositoryImpl } from '@/infrastructure/persistence/typeorm/repositories/orders.repository';

import { BooksModule } from './books.module';
import { UsersModule } from './users.module';

const USE_CASES = [CreateNewOrder];

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    BooksModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    OrdersService,
    {
      provide: 'OrdersRepository',
      useClass: OrdersRepositoryImpl,
    },
    ...USE_CASES,
  ],
})
export class OrdersModule {}
