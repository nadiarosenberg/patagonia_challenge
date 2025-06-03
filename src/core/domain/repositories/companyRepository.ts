import { Filters } from "../../../shared/commonTypes"
import { PaginatedResult, PaginationOptions } from "../../../shared/pagination"
import { Company, CreateCompanyData } from "../entities/companies"

export interface CompanyRepository {
  create(data: CreateCompanyData): Promise<Company>
  findByCuit(cuit: string): Promise<Company | null>
  findById(id: string): Promise<Company | null>
  findPaginated(options: PaginationOptions, filters?: Filters) : Promise<PaginatedResult<Company>>
  findPaginatedWithTransferFilter(options: PaginationOptions, filters?: Filters): Promise<PaginatedResult<Company>>
}
