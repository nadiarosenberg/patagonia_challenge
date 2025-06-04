import { CreateTransferData } from "../../src/core/domain/entities/transfers";

export const createTransferMock: CreateTransferData = {
  amount: 100,
  debitAccount: 'ACC123',
  creditAccount: 'ACC456',
  companyId: '123',
}

export const transferMock = {...createTransferMock, id: "123"}