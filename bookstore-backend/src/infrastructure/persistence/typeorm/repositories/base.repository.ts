import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { DomainEntity } from '@domain/domain.entity';
import { PaginatedResult } from '@application/paginated-result';
import { BaseRepository } from '@application/base.repository';

export abstract class CRUDRepository<E extends DomainEntity>
  implements BaseRepository<E>
{
  protected constructor(protected readonly repository: Repository<E>) {}

  public async findById(id: string): Promise<E | null> {
    return this.repository.findOne({
      where: { id } as FindOptionsWhere<E>,
    });
  }

  private getSafeSortField(sortField: string): string {
    const metadata = this.repository.metadata;
    const columnNames = metadata.columns.map((column) => column.propertyName);

    if (columnNames.includes(sortField)) {
      return sortField;
    }

    return 'createdAt';
  }

  public async findAll(
    page: number,
    limit: number,
    filters: Record<string, any> = {},
    sortField: string = 'createdAt',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
  ): Promise<PaginatedResult<E>> {
    const skip = (page - 1) * limit;
    const safeSortField = this.getSafeSortField(sortField);

    const [entities, total] = await this.repository.findAndCount({
      where: filters,
      skip,
      take: limit,
      order: {
        [safeSortField]: sortOrder,
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
