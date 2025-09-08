export interface PaginatedResultDTO<T> {
  items: T[]
  totalCount: number
  pageSize: number
  currentPage: number
}
