import express from "express"
import cors from "cors"
import helmet from "helmet"
import { companySchema } from "./adapters/db/mongo/schemas/companySchema"
import { transferSchema } from "./adapters/db/mongo/schemas/transferSchema"
import { CompanyService } from "./core/services/companyService"
import { CompanyController } from "./adapters/api/controllers/companyController"
import { createCompanyRoutes } from "./adapters/api/routes/companyRoutes"
import { openMongoConnection } from "./config/mongo"
import { CompanyRepository } from "./adapters/db/repositories/companyRepository"
import { TransferRepository } from "./adapters/db/repositories/transferRepository"
import { manageError } from "./adapters/api/middlewares/errorHandler"
import { configVars } from './config';

class App {
  private app: express.Application
  private port: number

  constructor() {
    this.app = express()
    this.port = configVars.http.port,
    this.setupMiddleware()
    this.setupRoutes()
    this.setupErrorHandling()
  }

  private setupMiddleware(): void {
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  private setupRoutes(): void {
    const companyRepository = new CompanyRepository()
    const transferRepository = new TransferRepository()

    const companyService = new CompanyService(companyRepository)

    const companyController = new CompanyController(companyService)
    //const transferController = new TransferController(transferService)

    // API routes
    this.app.use("/v1/companies", createCompanyRoutes(companyController))
    //this.app.use("/v1", createTransferRoutes(transferController, companyController))
  }

  private setupErrorHandling(): void {
    this.app.use(manageError);
  }

  public async start(): Promise<void> {
    try {
      await openMongoConnection(configVars.mongo.uri)

      this.app.listen(this.port, () => {
        console.log(`Server running on port ${this.port}`)
        console.log(`Swagger documentation available at http://localhost:${this.port}/docs`)
      })
    } catch (error) {
      console.error("Failed to start server:", error)
      process.exit(1)
    }
  }
}

const app = new App()
app.start()
