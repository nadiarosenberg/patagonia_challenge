import swaggerJsdoc from "swagger-jsdoc"
import { configVars } from ".."

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Transfers API",
      version: "1.0.0",
      description: "RESTful API for managing companies and transfers",
    },
    servers: [
      {
        url: `http://localhost:${configVars.http}`,
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Company: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Company ID",
              example: "683f63e805625477838028b8"
            },
            cuit: {
              type: "string",
              description: "Company CUIT",
              example: "27111111115"
            },
            denomination: {
              type: "string",
              description: "Company name",
              example: "Test SA"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation date",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update date",
            },
          },
        },
        Transfer: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Transfer ID",
              example: "683f63e805625477838028b7"
            },
            amount: {
              type: "number",
              description: "Transfer amount",
              example: 100
            },
            companyId: {
              type: "string",
              description: "Company ID",
              example: "683f63e805625477838028b8"
            },
            companyDenomination: {
              type: "string",
              description: "Company denomination",
              example: "Test SA"
            },
            debitAccount: {
              type: "string",
              description: "Debit account address",
              example: "123"
            },
            creditAccount: {
              type: "string",
              description: "Credit account address",
              example: "456"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation date",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update date",
            },
          },
        },
      },
    },
  },
  apis: ["./src/adapters/api/routes/*.ts"],
}

export const swaggerSpec = swaggerJsdoc(options)