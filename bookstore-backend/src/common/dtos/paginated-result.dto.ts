export class PaginatedResultDTO<T> {
  items: T[];
  totalCount: number;
  pageSize: number;
  currentPage: number;

  constructor(
    items: T[],
    totalCount: number,
    pageSize: number,
    currentPage: number,
  ) {
    this.items = items;
    this.totalCount = totalCount;
    this.pageSize = pageSize;
    this.currentPage = currentPage;
  }
}
