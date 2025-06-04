import { AppError } from "../../shared/appErrors"
import { Filters } from "../../shared/commonTypes"
import { PaginatedResult, PaginationOptions } from "../../shared/pagination"
import { Company, CreateCompanyData } from "../domain/entities/companies"
import { Repositories } from '../../adapters/db/repositories/index';
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { configVars } from "../../config";
import { endOfMonth, startOfMonth } from "date-fns";

export class CompanyService {
  constructor(
    private readonly repositories: Repositories
  ) {}

  getCompanyMatch(filters?: Filters) : object {
    console.log('-----filters', filters)
    //add more filters if required
    let matchConditions: any = {}
    if(!filters?.dateFrom && !filters?.dateTo){
      //by default, createdAt filter is current month
      matchConditions.createdAt = {};
      const now = new Date()
      const zonedNow = toZonedTime(now, configVars.timezone)
      const dateFrom = fromZonedTime(startOfMonth(zonedNow), configVars.timezone)
      const dateTo = fromZonedTime(endOfMonth(zonedNow), configVars.timezone)
      matchConditions.createdAt = {
        $gte: dateFrom,
        $lte: dateTo
      }
    }else{
      matchConditions.createdAt = {};
      if (filters.dateFrom) {
        matchConditions.createdAt.$gte = new Date(filters.dateFrom)
      }
      if (filters.dateTo) {
        matchConditions.createdAt.$lte = new Date(filters.dateTo);
      }
    }
    console.info('getCompanyMatch res', matchConditions)
    return matchConditions
  }

  async createCompany(data: CreateCompanyData): Promise<Company> {
    const existingCompany = await this.repositories.company.searchOne({cuit: data.cuit})
    if (existingCompany) {
      throw new AppError("ALREADY_EXIST", "Company with this CUIT already exists")
    }
    return this.repositories.company.create(data)
  }

  async getPaginatedCompanies(options: PaginationOptions, filters?: Filters): Promise<PaginatedResult<Company>> {
    const match = this.getCompanyMatch(filters)
    return await this.repositories.company.paginatedSearch(options, match)
  }

  async getPaginatedCompaniesWithTransferFilter(options: PaginationOptions, filters?: Filters): Promise<PaginatedResult<Company>> {
    const match = this.getCompanyMatch(filters)
    return await this.repositories.transfer.getPaginatedCompaniesWithTransferFilter(options, match)
  }
}