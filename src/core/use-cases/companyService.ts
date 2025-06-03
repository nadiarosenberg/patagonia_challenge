import { CompanyRepository } from "../../adapters/db/repositories/companyRepository"
import { AppError } from "../../shared/appErrors"
import { Filters } from "../../shared/commonTypes"
import { PaginatedResult, PaginationOptions } from "../../shared/pagination"
import { Company, CreateCompanyData } from "../domain/entities/companies"

export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository
  ) {}

  async createCompany(data: CreateCompanyData): Promise<Company> {
    const existingCompany = await this.companyRepository.findOne({cuit: data.cuit})
    if (existingCompany) {
      throw new AppError("ALREADY_EXIST", "Company with this CUIT already exists")
    }
    return this.companyRepository.create(data)
  }

  /*async getPaginatedCompanies(options: PaginationOptions, filters?: Filters): Promise<PaginatedResult<Company>> {
    return this.companyRepository.findPaginated(options, filters)
  }*/

  async getPaginatedCompaniesWithTransferFilter(
    options: PaginationOptions,
    filters?: Filters,
  ): Promise</*PaginatedResult<Company*/void> {
    //aggregate query
  }

  async getCompanyById(id: string): Promise<Company> {
    return await this.companyRepository.findOne({_id: id})
  }
}