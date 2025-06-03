import type { Request, Response, NextFunction } from "express"
import { CompanyService } from "../../../core/use-cases/companyService"
import { createCompanySchema } from "../validators/companyValidators"

export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  createCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedData = createCompanySchema.parse(req.body)
      const company = await this.companyService.createCompany(validatedData)
      res.status(201).json({
        success: true,
        data: company,
      })
    } catch (error) {
      next(error)
    }
  }
}