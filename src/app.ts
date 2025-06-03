import express from "express"
import cors from "cors"
import helmet from "helmet"
import { CompanyService } from "./core/services/companyService"
import { CompanyController } from "./adapters/api/controllers/companyController"
import { createCompanyRoutes } from "./adapters/api/routes/companyRoutes"
import { openMongoConnection } from "./config/mongo"
import { manageError } from "./adapters/api/middlewares/errorHandler"
import { configVars } from './config';
import { TransferController } from "./adapters/api/controllers/transferController"
import { createTransferRoutes } from "./adapters/api/routes/transferRoutes"
import { TransferService } from "./core/services/transferService"
import { getRepositories } from "./adapters/db/repositories"

class App {
  private app: express.Application
  private port: number

  constructor() {
    this.app = express()
    this.port = configVars.http.port,
    this.setupMiddleware()
    this.setupRoutes()
  }

  private setupMiddleware(): void {
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  private async setupRoutes(): Promise<void> {
    const repositories = await getRepositories()

    const companyService = new CompanyService(repositories)
    const transferService = new TransferService(repositories)

    const companyController = new CompanyController(companyService)
    const transferController = new TransferController(transferService)

    // API routes
    this.app.use("/v1/companies", createCompanyRoutes(companyController))
    this.app.use("/v1/transfers", createTransferRoutes(transferController, companyController))
  }

  public async start(): Promise<void> {
    try {
      await openMongoConnection(configVars.mongo.uri)

      this.app.listen(this.port, () => {
        console.log(`Server running on port ${this.port}`)
        console.log(`Swagger documentation available at http://localhost:${this.port}/docs`)
      })
      this.app.use(manageError)
    } catch (error) {
      console.error("Failed to start server:", error)
      process.exit(1)
    }
  }
}

const app = new App()
app.start()
