import { z } from "zod"
import { CUIT_REGEX } from "../../../core/domain/entities/companies"

export const createCompanySchema = z.object({
  cuit: z.string().regex(CUIT_REGEX, "invalid regex"),
  denomination: z.string().max(50)
})
