import { AppError } from "../../shared/appErrors"
import { Filters } from "../../shared/commonTypes"
import { PaginatedResult, PaginationOptions } from "../../shared/pagination"
import { Company, CreateCompanyData } from "../domain/entities/companies"
import { CompanyRepository } from "../domain/repositories/companyRepository"

export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository
  ) {}

  async createCompany(data: CreateCompanyData): Promise<Company> {
    const existingCompany = await this.companyRepository.findByCuit(data.cuit)
    if (existingCompany) {
      throw new AppError("ALREADY_EXIST", "Company with this CUIT already exists")
    }
    return this.companyRepository.create(data)
  }

  async getPaginatedCompanies(options: PaginationOptions, filters?: Filters): Promise<PaginatedResult<Company>> {
    return this.companyRepository.findPaginated(options, filters)
  }

  async getPaginatedCompaniesWithTransferFilter(
    options: PaginationOptions,
    filters?: Filters,
  ): Promise</*PaginatedResult<Company*/void> {
    //aggregate query
  }

  async getCompanyById(id: string): Promise<Company> {
    const company = await this.companyRepository.findById(id)
    if (!company) {
      throw new AppError("NOT_FOUND", "Company not found")
    }
    return company
  }
}