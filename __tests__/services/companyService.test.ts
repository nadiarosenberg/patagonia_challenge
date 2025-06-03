import { CompanyService } from '../../src/core/services/companyService';
import { Repositories } from '../../src/adapters/db/repositories';
import { createCompanyMock } from '../mocks/companyMocks';
import { AppError } from '../../src/shared/appErrors';
import { PaginatedResult } from '../../src/shared/pagination';
import { Company } from '../../src/core/domain/entities/companies';

const mockRepositories = {
  company: {
    searchOne: jest.fn(),
    create: jest.fn(),
    paginatedSearch: jest.fn(),
  },
  transfer: {
    getPaginatedCompaniesWithTransferFilter: jest.fn(),
  },
} as unknown as Repositories;

const service = new CompanyService(mockRepositories);

describe('companyService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('createCompany', () => {
    it('should create a company if CUIT does not exist', async () => {
      const expectedCompany = { id: '1', ...createCompanyMock } as Company;
      mockRepositories.company.searchOne = jest.fn().mockResolvedValue(null);
      mockRepositories.company.create = jest.fn().mockResolvedValue(expectedCompany);
      const result = await service.createCompany(createCompanyMock);
      expect(mockRepositories.company.searchOne).toHaveBeenCalledWith({ cuit: createCompanyMock.cuit });
      expect(mockRepositories.company.create).toHaveBeenCalledWith(createCompanyMock);
      expect(result).toEqual(expectedCompany);
    });
    it('should throw if company with CUIT already exists', async () => {
      const existingCompany = { id: '1', ...createCompanyMock };
      mockRepositories.company.searchOne = jest.fn().mockResolvedValue(existingCompany);
      await expect(service.createCompany(createCompanyMock)).rejects.toThrow(AppError);
      expect(mockRepositories.company.create).not.toHaveBeenCalled();
    });
  });

  describe('getPaginatedCompanies', () => {
    it('should return paginated companies', async () => {
      const options = { page: 1, limit: 10, sort: 'name' };
      const filters = { dateTo: '2023-11-10' };
      const paginatedResult: PaginatedResult<Company> = {
        page: 1,
        total: 1,
        totalPages: 1,
        limit: 10,
        results: [],
      };
      mockRepositories.company.paginatedSearch = jest.fn().mockResolvedValue(paginatedResult);
      const result = await service.getPaginatedCompanies(options, filters);
      expect(mockRepositories.company.paginatedSearch).toHaveBeenCalledWith(options, filters);
      expect(result).toEqual(paginatedResult);
    });
  });

  describe('getPaginatedCompaniesWithTransferFilter', () => {
    it('should return companies with transfer filters', async () => {
      const options = { page: 1, limit: 10, sort: 'name' };
      const filters = { dateTo: '2025-05-10' };
      const paginatedResult: PaginatedResult<Company> = {
        page: 1,
        total: 1,
        totalPages: 1,
        limit: 10,
        results: [],
      };
      mockRepositories.transfer.getPaginatedCompaniesWithTransferFilter = jest
        .fn()
        .mockResolvedValue(paginatedResult);
      const result = await service.getPaginatedCompaniesWithTransferFilter(options, filters);
      expect(mockRepositories.transfer.getPaginatedCompaniesWithTransferFilter).toHaveBeenCalledWith(options, filters);
      expect(result).toEqual(paginatedResult);
    });
  });
});
