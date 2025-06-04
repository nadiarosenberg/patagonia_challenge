import { CompanyService } from '../../src/core/services/companyService';
import { companyMock, createCompanyMock, zonedFilterMock } from '../mocks/companyMocks';
import { AppError } from '../../src/shared/appErrors';
import { PaginatedResult } from '../../src/shared/pagination';
import { Company } from '../../src/core/domain/entities/companies';
import { fixedDate, mockRepositories } from '../mocks/commonMocks';

const service = new CompanyService(mockRepositories);

describe('companyService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("getCompanyMatch", () => {
    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(fixedDate);
    });
    afterEach(() => {
      jest.useRealTimers();
    });
  
    it("should return current month range if no filters provided", () => {
      const match: any = service.getCompanyMatch();
      expect(match).toEqual(zonedFilterMock)
    })
    it("should apply dateFrom filter", () => {
      const filters = { dateFrom: "2025-05-01T00:00:00Z" };
      const match: object = service.getCompanyMatch(filters);
      expect(match).toEqual({createdAt: {$gte: new Date(filters.dateFrom)}});
    });
    it("should apply dateTo filter", () => {
      const filters = { dateTo: "2025-07-01T00:00:00Z" };
      const match: object = service.getCompanyMatch(filters);
      expect(match).toEqual({createdAt: {$lte: new Date(filters.dateTo)}});
    });
    it("should apply both dateFrom and dateTo filters", () => {
      const filters = {
        dateFrom: "2025-05-01T00:00:00Z",
        dateTo: "2025-07-01T00:00:00Z"
      };
      const match: object = service.getCompanyMatch(filters);
      expect(match).toEqual({createdAt: {$gte: new Date(filters.dateFrom), $lte: new Date(filters.dateTo)}});
    });
  });  

  describe('createCompany', () => {
    it('should create a company if CUIT does not exist', async () => {
      mockRepositories.company.searchOne = jest.fn().mockResolvedValue(null);
      mockRepositories.company.create = jest.fn().mockResolvedValue(companyMock);
      const result = await service.createCompany(createCompanyMock);
      expect(mockRepositories.company.searchOne).toHaveBeenCalledWith({ cuit: createCompanyMock.cuit });
      expect(mockRepositories.company.create).toHaveBeenCalledWith(createCompanyMock);
      expect(result).toEqual(companyMock);
    });
    it('should throw if company with CUIT already exists', async () => {
      mockRepositories.company.searchOne = jest.fn().mockResolvedValue(companyMock);
      await expect(service.createCompany(createCompanyMock)).rejects.toThrow(AppError);
      expect(mockRepositories.company.create).not.toHaveBeenCalled();
    });
    it('should throw if company repository fails', async () => {
      mockRepositories.company.searchOne = jest.fn().mockRejectedValue(new AppError("NOT_FOUND"));
      await expect(service.createCompany(createCompanyMock)).rejects.toThrow(AppError);
      expect(mockRepositories.company.create).not.toHaveBeenCalled();
    });
  });

  describe('getPaginatedCompanies', () => {
    it('should return paginated companies', async () => {
      const options = { page: 1, limit: 10};
      service.getCompanyMatch = jest.fn().mockReturnValue({})
      const paginatedResult: PaginatedResult<Company> = {
        page: 1,
        total: 1,
        totalPages: 1,
        limit: 10,
        results: [],
      };
      mockRepositories.company.paginatedSearch = jest.fn().mockResolvedValue(paginatedResult);
      const result = await service.getPaginatedCompanies(options);
      expect(mockRepositories.company.paginatedSearch).toHaveBeenCalledWith(options, {});
      expect(result).toEqual(paginatedResult);
    });
    it('should throw if company repository fails', async () => {
      const options = { page: 1, limit: 10};
      service.getCompanyMatch = jest.fn().mockReturnValue({})
      mockRepositories.company.paginatedSearch = jest.fn().mockRejectedValue(new AppError("SERVER_ERROR"));
      await expect(service.getPaginatedCompanies(options)).rejects.toThrow(AppError);
    });
  });

  describe('getPaginatedCompaniesWithTransferFilter', () => {
    it('should return companies with transfer filters', async () => {
      const options = { page: 1, limit: 10 };
      service.getCompanyMatch = jest.fn().mockReturnValue({})
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
      const result = await service.getPaginatedCompaniesWithTransferFilter(options);
      expect(mockRepositories.transfer.getPaginatedCompaniesWithTransferFilter).toHaveBeenCalledWith(options, {});
      expect(result).toEqual(paginatedResult);
    });
    it('should throw if transfer repository fails', async () => {
      const options = { page: 1, limit: 10};
      service.getCompanyMatch = jest.fn().mockReturnValue({})
      mockRepositories.transfer.getPaginatedCompaniesWithTransferFilter = jest.fn().mockRejectedValue(new AppError("SERVER_ERROR"));
      await expect(service.getPaginatedCompaniesWithTransferFilter(options)).rejects.toThrow(AppError);
    });
  });
});
