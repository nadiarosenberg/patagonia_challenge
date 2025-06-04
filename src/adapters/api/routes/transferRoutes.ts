import { Router } from "express"
import { CompanyController } from "../controllers/companyController"
import { TransferController } from '../controllers/transferController';

export const createTransferRoutes = (transferController: TransferController, companyController: CompanyController): Router => {
  const router = Router()
/**
 * @swagger
 * tags:
 *   name: Transfers
 *   description: Transfer management
 */

/**
 * @swagger
 * /v1/transfers:
 *   post:
 *     summary: Create a new transfer
 *     description: Create a new transfer associated to a company 
 *     tags: [Transfers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - companyId
 *               - debitAccount
 *               - creditAccount
 *             properties:
 *               amount:
 *                 type: integer
 *                 description: transfer amount
 *                 example: 100
 *               companyId:
 *                 type: string
 *                 description: Company ID
 *                 example: "683f63e805625477838028b8"
 *               debitAccount:
 *                 type: string
 *                 description: Debit account address
 *                 example: "123"
 *               creditAccount:
 *                 type: string
 *                 description: Credit account address
 *                 example: "456"
 *     responses:
 *       201:
 *         description: Company created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 error:
 *                   type: object
 *                   properties:
 *                     reason:
 *                       type: string
 *                       example: "INPUT_ERROR"
 *                     msg:
 *                       type: string
 *                       example: "Invalid input data"
 *       404:
 *         description: Company not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 error:
 *                   type: object
 *                   properties:
 *                     reason:
 *                       type: string
 *                       example: "NOT_FOUND"
 *                     msg:
 *                       type: string
 *                       example: "Company not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 error:
 *                   type: object
 *                   properties:
 *                     reason:
 *                       type: string
 *                       example: "SERVER_ERROR"
 *                     msg:
 *                       type: string
 *                       example: "Internal server error"
 */

  router.post("/", transferController.createTransfer)
  /**
 * @swagger
 * /v1/transfers/companies:
 *   get:
 *     summary: Get paginated companies based on transfer filters
 *     description: Accepts dateTo and dateFrom params to filter based on createdAt property
 *     tags: [Transfers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1 
 *         description: Pagination page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10 
 *         description: Number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: '{"createdAt": -1}'
 *         description: JSON string for sort order
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2025-06-03T21:30:00.000Z"
 *         description: Filter from this date
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2025-08-03T21:30:00.000Z"
 *         description: Filter to this date
 *     responses:
 *       200:
 *         description: Paginated companies list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                  type: integer
 *                  example: 1
 *                 limit:
 *                  type: integer
 *                  example: 10
 *                 pages:
 *                  type: integer
 *                  example: 1
 *                 totalPages:
 *                  type: integer
 *                  example: 1
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Company'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 error:
 *                   type: object
 *                   properties:
 *                     reason:
 *                       type: string
 *                       example: "INPUT_ERROR"
 *                     msg:
 *                       type: string
 *                       example: "Invalid input data"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 error:
 *                   type: object
 *                   properties:
 *                     reason:
 *                       type: string
 *                       example: "SERVER_ERROR"
 *                     msg:
 *                       type: string
 *                       example: "Internal server error"
 */
  router.get("/companies", companyController.getCompaniesWithTransactionFilter)
  return router
}