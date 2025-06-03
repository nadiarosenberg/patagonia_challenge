import { CreateTransferData, Transfer } from "../entities/transfers";

export interface TransferRepository {
  create(data: CreateTransferData): Promise<Transfer>
}