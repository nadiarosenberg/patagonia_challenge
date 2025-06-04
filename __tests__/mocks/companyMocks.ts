import { Company, CreateCompanyData } from "../../src/core/domain/entities/companies";

export const createCompanyMock: CreateCompanyData = { denomination: "Acme", cuit: "20123456789" }

export const companyMock = {...createCompanyMock, id: "123"} as Company