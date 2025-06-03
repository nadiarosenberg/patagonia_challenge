export interface IRepository<T> {
  create(payload: Partial<T>): Promise<T>;
  findOne(criteria: Partial<T>): Promise<T | null>;
  searchOne(query: object): Promise<T | null>;
}