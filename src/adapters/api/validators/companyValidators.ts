import { z } from "zod"

export const createCompanySchema = z.object({
  cuit: z.string(), //to do: add validation
  denomination: z.string()
})
