import { Router } from "express"
import { CompanyController } from "../controllers/companyController"

export const createCompanyRoutes = (companyController: CompanyController): Router => {
  const router = Router()
  router.post("/", companyController.createCompany)
  return router
}