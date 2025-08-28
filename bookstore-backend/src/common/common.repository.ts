import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { DomainEntity } from '@common/domain.entity';
import { PaginatedResult } from '@common/paginated-result';

export abstract class CRUDRepository<E extends DomainEntity> {
  protected constructor(protected readonly repository: Repository<E>) {}

  public async findById(id: string): Promise<E | null> {
    return this.repository.findOne({
      where: { id } as FindOptionsWhere<E>,
    });
  }

  public async findAll(
    page: number,
    limit: number,
    filters: FindOptionsWhere<E>,
    sortField: keyof E = 'createdAt',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
  ): Promise<PaginatedResult<E>> {
    const skip = (page - 1) * limit;
    const [entities, total] = await this.repository.findAndCount({
      where: filters,
      skip,
      take: limit,
      order: {
        [sortField]: sortOrder,
      } as FindOptionsOrder<E>,
    });
    return new PaginatedResult<E>(entities, total);
  }

  public async save(entity: E): Promise<E> {
    return this.repository.save(entity);
  }

  public async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id } as FindOptionsWhere<E>);
  }

  public async delete(entity: E): Promise<void> {
    await this.repository.remove(entity);
  }
}
