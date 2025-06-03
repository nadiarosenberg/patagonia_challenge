import { Request, Response, NextFunction } from "express";
import { CompanyService } from '../../src/core/services/companyService';
import { CompanyController } from '../../src/adapters/api/controllers/companyController';
import { createCompanyMock } from "../mocks/companyMocks";

const mockCompanyService = {
  createCompany: jest.fn(),
  getPaginatedCompanies: jest.fn(),
  getPaginatedCompaniesWithTransferFilter: jest.fn(),
} as unknown as CompanyService;

const controller = new CompanyController(mockCompanyService);

const mockRequest = (body: any): Partial<Request> => ({ body });
const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext: NextFunction = jest.fn();

describe("companyController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("createCompany", () => {
    it("happy path: should return created company", async () => {
      const req = mockRequest(createCompanyMock) as Request;
      const res = mockResponse() as Response;
      const fakeCompany = { ...createCompanyMock, id: "1"};
      mockCompanyService.createCompany = jest.fn().mockResolvedValue(fakeCompany);
      await controller.createCompany(req, res, mockNext);
      expect(mockCompanyService.createCompany).toHaveBeenCalledWith(createCompanyMock);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(fakeCompany);
    });
    it("should call next on validation error", async () => {
      const req = mockRequest({ denomination: "abc", cuit: "invalid" }) as Request;
      const res = mockResponse() as Response;
      await controller.createCompany(req, res, mockNext);
      expect(mockCompanyService.createCompany).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });
    it("should call next on service failure", async () => {
      const req = mockRequest(createCompanyMock) as Request;
      const res = mockResponse() as Response;
      const error = new Error("DB failure");
      mockCompanyService.createCompany = jest.fn().mockRejectedValue(error);
      await controller.createCompany(req, res, mockNext);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe("getPaginatedCompanies", () => {
    it("happy path: should return paginated companies", async () => {
      const req = mockRequest({ page: 1, limit: 10, sort: '{"denomination":"asc"}' }) as Request;
      const res = mockResponse() as Response;
      const paginated = { page: 1, total: 1, pages: 1, results: [{ id: "1" }] };
      mockCompanyService.getPaginatedCompanies = jest.fn().mockResolvedValue(paginated);
      await controller.getPaginatedCompanies(req, res, mockNext);
      expect(mockCompanyService.getPaginatedCompanies).toHaveBeenCalledWith(
        { page: 1, limit: 10, sort: { denomination: "asc" } },
        {}
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(paginated);
    });
    it("should call next on validation error", async () => {
      const req = mockRequest({ page: 0 }) as Request;
      const res = mockResponse() as Response;
      await controller.getPaginatedCompanies(req, res, mockNext);
      expect(mockCompanyService.getPaginatedCompanies).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });
    it("should call next on service failure", async () => {
      const req = mockRequest({ page: 1, limit: 10 }) as Request;
      const res = mockResponse() as Response;
      const error = new Error("DB error");
      mockCompanyService.getPaginatedCompanies = jest.fn().mockRejectedValue(error);
      await controller.getPaginatedCompanies(req, res, mockNext);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
  
  describe("getCompaniesWithTransactionFilter", () => {
    it("happy path: should return filtered companies", async () => {
      const req = mockRequest({ page: 1, limit: 10, sort: '{"denomination":"desc"}', filter: "something" }) as Request;
      const res = mockResponse() as Response;
      const filtered = { page: 1, total: 0, pages: 0, results: [] };
      mockCompanyService.getPaginatedCompaniesWithTransferFilter = jest.fn().mockResolvedValue(filtered);
      await controller.getCompaniesWithTransactionFilter(req, res, mockNext);
      expect(mockCompanyService.getPaginatedCompaniesWithTransferFilter).toHaveBeenCalledWith(
        { page: 1, limit: 10, sort: { denomination: "desc" } },
        { filter: "something" }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(filtered);
    });
    it("should call next on validation error", async () => {
      const req = mockRequest({ page: 0, limit: 10 }) as Request;
      const res = mockResponse() as Response;
      await controller.getCompaniesWithTransactionFilter(req, res, mockNext);
      expect(mockCompanyService.getPaginatedCompaniesWithTransferFilter).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });
    it("should call next on service failure", async () => {
      const req = mockRequest({ page: 1, limit: 10 }) as Request;
      const res = mockResponse() as Response;
      const error = new Error("Service error");
      mockCompanyService.getPaginatedCompaniesWithTransferFilter = jest.fn().mockRejectedValue(error);
      await controller.getCompaniesWithTransactionFilter(req, res, mockNext);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
