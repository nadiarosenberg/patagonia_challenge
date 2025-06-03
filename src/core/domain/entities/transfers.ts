export type Transfer = {
  id: string 
  amount: number
  companyId: string
  companyDenomination: string
  debitAccount: string
  creditAccount: string
  createdAt: Date
  updatedAt: Date
}

export type CreateTransferData = {
  amount: number
  companyId: string
  companyDenomination: string
  debitAccount: string
  creditAccount: string
}
