import { Repositories } from "../../adapters/db/repositories"
import { CreateTransferData, Transfer } from "../domain/entities/transfers"

export class TransferService {
  constructor(
    private readonly repositories: Repositories,
  ) {}

  async createTransfer(data: CreateTransferData): Promise<Transfer> {
    const company = await this.repositories.company.findOne({_id: data.companyId})
    return await this.repositories.transfer.create({...data, companyDenomination: company.denomination})
  }
}