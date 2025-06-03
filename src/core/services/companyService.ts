import { AppError } from "../../shared/appErrors"
import { Filters } from "../../shared/commonTypes"
import { PaginatedResult, PaginationOptions } from "../../shared/pagination"
import { Company, CreateCompanyData } from "../domain/entities/companies"
import { Repositories } from '../../adapters/db/repositories/index';

export class CompanyService {
  constructor(
    private readonly repositories: Repositories
  ) {}

  async createCompany(data: CreateCompanyData): Promise<Company> {
    const existingCompany = await this.repositories.company.searchOne({cuit: data.cuit})
    if (existingCompany) {
      throw new AppError("ALREADY_EXIST", "Company with this CUIT already exists")
    }
    return this.repositories.company.create(data)
  }

  async getPaginatedCompanies(options: PaginationOptions, filters?: Filters): Promise<PaginatedResult<Company>> {
    //construct date filter
    return await this.repositories.company.paginatedSearch(options, filters)
  }

  async getPaginatedCompaniesWithTransferFilter(options: PaginationOptions, filters?: Filters): Promise<PaginatedResult<Company>> {
    //construct date filter
    return await this.repositories.transfer.getPaginatedCompaniesWithTransferFilter(options, filters)
  }
}