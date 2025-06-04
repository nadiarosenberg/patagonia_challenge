import { Request, Response } from "express";
import { CompanyService } from '../../src/core/services/companyService';
import { CompanyController } from '../../src/adapters/api/controllers/companyController';
import { companyMock, createCompanyMock } from "../mocks/companyMocks";
import { mockNext, mockRequest, mockRequestWithQuery, mockResponse } from "../mocks/commonMocks";
import { AppError, ErrorReason } from "../../src/shared/appErrors";

const mockCompanyService = {
  createCompany: jest.fn(),
  getPaginatedCompanies: jest.fn(),
  getPaginatedCompaniesWithTransferFilter: jest.fn(),
} as unknown as CompanyService;

const controller = new CompanyController(mockCompanyService);

describe("companyController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("createCompany", () => {
    it("happy path: should return created company", async () => {
      const req = mockRequest(createCompanyMock) as Request;
      const res = mockResponse() as Response;
      mockCompanyService.createCompany = jest.fn().mockResolvedValue(companyMock);
      await controller.createCompany(req, res, mockNext);
      expect(mockCompanyService.createCompany).toHaveBeenCalledWith(createCompanyMock);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(companyMock);
    });
    it("should call next on validation error (invalid cuit)", async () => {
      const req = mockRequest({ denomination: "abc", cuit: "invalid" }) as Request;
      const res = mockResponse() as Response;
      await controller.createCompany(req, res, mockNext);
      expect(mockCompanyService.createCompany).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });
    it("should call next on service failure", async () => {
      const req = mockRequest(createCompanyMock) as Request;
      const res = mockResponse() as Response;
      const error = new AppError(ErrorReason.SERVER_ERROR);
      mockCompanyService.createCompany = jest.fn().mockRejectedValue(error);
      await controller.createCompany(req, res, mockNext);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe("getPaginatedCompanies", () => {
    it("happy path: should return paginated companies", async () => {
      const req = mockRequestWithQuery({page: 1, limit: 10}) as Request;
      const res = mockResponse() as Response;
      const paginatedResponse = { page: 1, total: 1, limit: 10, totalPages: 1, results: [companyMock] };
      mockCompanyService.getPaginatedCompanies = jest.fn().mockResolvedValue(paginatedResponse);
      await controller.getPaginatedCompanies(req, res, mockNext);
      expect(mockCompanyService.getPaginatedCompanies).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(paginatedResponse);
    });
    it("happy path: should return paginated companies (send filter", async () => {
      const req = mockRequestWithQuery({ page: 1, limit: 10, dateFrom: "2025-06-03T21:30:00.000Z"}) as Request;
      const res = mockResponse() as Response;
      const paginatedResponse = { page: 1, limit: 10, total: 1, totalPages: 1, results: [companyMock] };
      mockCompanyService.getPaginatedCompanies = jest.fn().mockResolvedValue(paginatedResponse);
      await controller.getPaginatedCompanies(req, res, mockNext);
      expect(mockCompanyService.getPaginatedCompanies).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(paginatedResponse);
    });
    it("should call next on validation error (invalid page)", async () => {
      const req = mockRequestWithQuery({ page: -1 }) as Request;
      const res = mockResponse() as Response;
      await controller.getPaginatedCompanies(req, res, mockNext);
      expect(mockCompanyService.getPaginatedCompanies).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });
    it("should call next on validation error (invalid date filter)", async () => {
      const req = mockRequestWithQuery({ page: 1, dateTo: "abc"}) as Request;
      const res = mockResponse() as Response;
      await controller.getPaginatedCompanies(req, res, mockNext);
      expect(mockCompanyService.getPaginatedCompanies).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });
    it("should call next on service failure", async () => {
      const req = mockRequestWithQuery({ page: 1, limit: 10 }) as Request;
      const res = mockResponse() as Response;
      const error = new AppError(ErrorReason.SERVER_ERROR);
      mockCompanyService.getPaginatedCompanies = jest.fn().mockRejectedValue(error);
      await controller.getPaginatedCompanies(req, res, mockNext);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
  
  describe("getCompaniesWithTransactionFilter", () => {
    it("happy path: should return filtered companies", async () => {
      const req = mockRequestWithQuery({ page: 1, limit: 10}) as Request;
      const res = mockResponse() as Response;
      const filtered = { page: 1, limit: 10, total: 1, totalPages: 1, results: [companyMock] };
      mockCompanyService.getPaginatedCompaniesWithTransferFilter = jest.fn().mockResolvedValue(filtered);
      await controller.getCompaniesWithTransactionFilter(req, res, mockNext);
      expect(mockCompanyService.getPaginatedCompaniesWithTransferFilter).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(filtered);
    });
    it("happy path: should return filtered companies (date filter)", async () => {
      const req = mockRequestWithQuery({ page: 1, limit: 10, dateFrom: "2025-06-03T21:30:00.000Z"}) as Request;
      const res = mockResponse() as Response;
      const filtered = { page: 1, limit: 10, total: 1, totalPages: 1, results: [companyMock] };
      mockCompanyService.getPaginatedCompaniesWithTransferFilter = jest.fn().mockResolvedValue(filtered);
      await controller.getCompaniesWithTransactionFilter(req, res, mockNext);
      expect(mockCompanyService.getPaginatedCompaniesWithTransferFilter).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(filtered);
    });
    it("should call next on validation error (invalid page)", async () => {
      const req = mockRequestWithQuery({ page: -1, limit: 10 }) as Request;
      const res = mockResponse() as Response;
      await controller.getCompaniesWithTransactionFilter(req, res, mockNext);
      expect(mockCompanyService.getPaginatedCompaniesWithTransferFilter).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });
    it("should call next on validation error (invalid date filter)", async () => {
      const req = mockRequestWithQuery({ page: 1, limit: 10, dateFrom: "abc" }) as Request;
      const res = mockResponse() as Response;
      await controller.getCompaniesWithTransactionFilter(req, res, mockNext);
      expect(mockCompanyService.getPaginatedCompaniesWithTransferFilter).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });
    it("should call next on service failure", async () => {
      const req = mockRequestWithQuery({ page: 1, limit: 10 }) as Request;
      const res = mockResponse() as Response;
      const error = new AppError(ErrorReason.SERVER_ERROR);
      mockCompanyService.getPaginatedCompaniesWithTransferFilter = jest.fn().mockRejectedValue(error);
      await controller.getCompaniesWithTransactionFilter(req, res, mockNext);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
