import { Company } from "../../../core/domain/entities/companies";
import { ITransferRepository } from "../../../core/ports/ITransferRepository";
import { Filters } from "../../../shared/commonTypes";
import { PaginatedResult, PaginationOptions } from "../../../shared/pagination";
import { MongoRepository } from "../mongo/mongoRepository";
import { TransferDocument, transferSchema } from "../mongo/schemas/transferSchema";

export class TransferRepository extends MongoRepository<TransferDocument> implements ITransferRepository {
  constructor() {
    super("transfer", transferSchema);
  }

  async getPaginatedCompaniesWithTransferFilter(
    options: PaginationOptions,
    filters?: Filters
  ): Promise<PaginatedResult<Company>> {
    //to do: implement
    return {
      page: 1,
      limit: 1,
      totalPages: 1,
      total: 1,
      results: []
    };
  }
}
