import { TransferDocument } from "../../adapters/db/mongo/schemas/transferSchema";
import { PaginatedResult, PaginationOptions } from "../../shared/pagination";
import { Company } from "../domain/entities/companies";
import { IRepository } from "./IRepository";

export interface ITransferRepository extends IRepository<TransferDocument> {
  getPaginatedCompaniesWithTransferFilter(
    options: PaginationOptions,
    match: object
  ): Promise<PaginatedResult<Company>>;
}