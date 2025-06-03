import { Router } from "express"
import { CompanyController } from "../controllers/companyController"
import { TransferController } from '../controllers/transferController';

export const createTransferRoutes = (transferController: TransferController, companyController: CompanyController): Router => {
  const router = Router()
  router.post("/", transferController.createTransfer)
  router.get("/companies", companyController.getCompaniesWithTransactionFilter)
  return router
}