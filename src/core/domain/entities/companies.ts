export interface Company  {
  id: string
  cuit: string
  denomination: string
  createdAt: Date
  updatedAt: Date
}

export type CreateCompanyData = {
  cuit: string
  denomination: string
}
