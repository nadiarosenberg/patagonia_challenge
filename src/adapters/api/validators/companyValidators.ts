import { z } from "zod"
import { CUIT_REGEX } from "../../../core/domain/entities/companies"

export const createCompanySchema = z.object({
  cuit: z.string().regex(CUIT_REGEX, "invalid regex"),
  denomination: z.string().max(50)
})

export const getPaginatedCompaniesSchema = z.object({
  page: z.coerce.number().min(1).default(1).transform((data) => Number(data)),
  limit: z.coerce.number().min(1).max(100).default(10).transform((data) => Number(data)),
  sort: z.string().optional().transform((value) => (value ? JSON.parse(value) : undefined)),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
})
