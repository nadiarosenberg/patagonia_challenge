import { Company } from "../../../core/domain/entities/companies";
import { IRepository } from "../../../core/ports/IRepository";
import { ITransferRepository } from "../../../core/ports/ITransferRepository";
import { CompanyRepository } from "./companyRepository";
import { TransferRepository } from "./transferRepository";

export interface Repositories {
  company: IRepository<Company>,
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
