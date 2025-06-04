export type PaginationOptions = {
  page: number
  limit: number
  sort?: object
}

export type PaginatedResult<T> = {
  results: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}