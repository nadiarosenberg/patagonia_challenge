import { Request, Response, NextFunction } from "express";
import { Repositories } from "../../src/adapters/db/repositories";

export const mockRequest = (body: any): Partial<Request> => ({ body });

export const mockRequestWithQuery = (body: any): Partial<Request> => ({ query: body });

export const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export const mockNext: NextFunction = jest.fn();

export const mockRepositories = {
  company: {
    searchOne: jest.fn(),
    create: jest.fn(),
    paginatedSearch: jest.fn(),
    findOne: jest.fn(),
  },
  transfer: {
    create: jest.fn(),
    getPaginatedCompaniesWithTransferFilter: jest.fn(),
  },
} as unknown as Repositories;

export const mockConfigVars = {
  timezone: "America/Argentina/Buenos_Aires"
}

export const fixedDate = new Date("2025-06-15T12:00:00Z");