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

export const CUIT_REGEX = new RegExp("^(20|23|24|27|30|33|34)[0-9]{9}$");