import { PaginatedResult, PaginationOptions } from "../../shared/pagination";

export interface IRepository<T> {
  create(payload: Partial<T>): Promise<T>;
  findOne(criteria: Partial<T>): Promise<T>;
  searchOne(query: object): Promise<T | null>;
  paginatedSearch(params: PaginationOptions, match: object) : Promise<PaginatedResult<T>>
}