import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { Company, CreateCompanyData } from "../../src/core/domain/entities/companies";
import { endOfMonth, startOfMonth } from "date-fns";
import { fixedDate, mockConfigVars } from "./commonMocks";

export const createCompanyMock: CreateCompanyData = { denomination: "Acme", cuit: "20123456789" }

export const companyMock = {...createCompanyMock, id: "123"} as Company

const zonedNow = toZonedTime(fixedDate, mockConfigVars.timezone);
const expectedFrom = fromZonedTime(startOfMonth(zonedNow), mockConfigVars.timezone);
const expectedTo = fromZonedTime(endOfMonth(zonedNow), mockConfigVars.timezone);

export const zonedFilterMock = {
  createdAt: {
    $gte: expectedFrom,
    $lte: expectedTo
  }
}