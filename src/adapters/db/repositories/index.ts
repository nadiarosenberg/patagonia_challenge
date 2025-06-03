import { Company } from "../../../core/domain/entities/companies";
import { IRepository } from "../../../core/ports/IRepository";
import { ITransferRepository } from "../../../core/ports/ITransferRepository";
import { CompanyDocument } from "../mongo/schemas/companySchema";
import { CompanyRepository } from "./companyRepository";
import { TransferRepository } from "./transferRepository";

export interface Repositories {
  company: IRepository<CompanyDocument>,
  transfer: ITransferRepository
}

export async function getRepositories(
): Promise<Repositories> {
  const company = new CompanyRepository()
  const transfer = new TransferRepository()
  return {
    company,
    transfer
  };
}
