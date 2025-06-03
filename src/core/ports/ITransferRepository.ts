import { TransferDocument } from "../../adapters/db/mongo/schemas/transferSchema";
import { Filters } from "../../shared/commonTypes";
import { PaginatedResult, PaginationOptions } from "../../shared/pagination";
import { Company } from "../domain/entities/companies";
import { IRepository } from "./IRepository";

export interface ITransferRepository extends IRepository<TransferDocument> {
  getPaginatedCompaniesWithTransferFilter(
    options: PaginationOptions,
    filters?: Filters
  ): Promise<PaginatedResult<Company>>;
}