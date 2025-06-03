import { z } from "zod"

export const createTransferSchema = z.object({
  amount: z.number().positive(),
  debitAccount: z.string().max(50),
  creditAccount: z.string().max(50),
  companyId: z.string(),
}).refine((data) => data.debitAccount !== data.creditAccount, {
  message: "debitAccount and creditAccount must be different",
  path: ["creditAccount"], 
});
