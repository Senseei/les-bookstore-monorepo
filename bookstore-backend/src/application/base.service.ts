import { DomainEntity } from '@domain/domain.entity';
import { EntityNotFoundException } from './exceptions/entity-not-found.exception';
import { BaseRepository } from '@application/base.repository';

export abstract class BaseService<E extends DomainEntity> {
  constructor(private readonly commonRepository: BaseRepository<E>) {}

  public async save(entity: E): Promise<E> {
    return this.commonRepository.save(entity);
  }

  public async findById(id: string): Promise<E | null> {
    return this.commonRepository.findById(id);
  }

  public async findByIdOrThrow(id: string): Promise<E> {
    const entity = await this.commonRepository.findById(id);
    if (!entity) {
      throw new EntityNotFoundException('Entity', id);
    }
    return entity;
  }
}
