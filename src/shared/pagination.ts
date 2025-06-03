export type PaginationOptions = {
  page: number
  limit: number
  sort: Record<string, 1 | -1>
}

export type PaginatedResult<T> = {
  results: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}