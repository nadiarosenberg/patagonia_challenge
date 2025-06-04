import type { Request, Response, NextFunction } from "express"
import { CompanyService } from "../../../core/services/companyService"
import { createCompanySchema, getPaginatedCompaniesSchema } from '../validators/companyValidators';

export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  createCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedData = createCompanySchema.parse(req.body)
      const company = await this.companyService.createCompany(validatedData)
      res.status(201).json(company);
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  getPaginatedCompanies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedData = getPaginatedCompaniesSchema.parse(req.query)
      const {page, limit, sort, ...rest} = validatedData
      const results = await this.companyService.getPaginatedCompanies({page, limit, sort}, rest)
      res.status(200).json(results);
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  getCompaniesWithTransactionFilter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedData = getPaginatedCompaniesSchema.parse(req.query)
      const {page, limit, sort, ...rest} = validatedData
      const result = await this.companyService.getPaginatedCompaniesWithTransferFilter({page, limit, sort}, rest)
      res.status(200).json(result);
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
}