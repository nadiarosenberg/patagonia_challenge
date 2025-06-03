import { PaginatedResult, PaginationOptions } from "../../shared/pagination";
import { Filters } from '../../shared/commonTypes';

export interface IRepository<T> {
  create(payload: Partial<T>): Promise<T>;
  findOne(criteria: Partial<T>): Promise<T>;
  searchOne(query: object): Promise<T | null>;
  paginatedSearch(params: PaginationOptions, filters?: Filters) : Promise<PaginatedResult<T>>
}