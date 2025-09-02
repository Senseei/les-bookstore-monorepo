export class PaginatedResult<T> {
  items: T[];
  count: number;

  constructor(items: T[], count: number) {
    this.items = items;
    this.count = count;
  }
}
