import { CannotRemoveCardException } from '@application/users/exceptions/cannot-remove-card.exception';
import { UsersService } from '@application/users/services';
import { Injectable } from '@nestjs/common';

import { EntityNotFoundException } from '@/application/exceptions';
import { User } from '@/domain/user/user.entity';

@Injectable()
export class RemoveUserCard {
  constructor(private readonly usersService: UsersService) {}

  public async execute(userId: string, cardId: string): Promise<void> {
    const user = await this.usersService.findActiveByIdOrThrow(userId);

    this.validateCardRemoval(user);

    const card = user.customerDetails.getCard(cardId);

    if (!card) {
      throw new EntityNotFoundException('Card', cardId);
    }

    user.customerDetails.cards.splice(
      user.customerDetails.cards.findIndex((c) => c.equals(card)),
      1,
    );

    await this.usersService.save(user);
  }

  private validateCardRemoval(user: User): void {
    if (user.customerDetails.cards.length <= 1) {
      throw new CannotRemoveCardException(
        'User must have at least one card on file.',
      );
    }
  }
}
