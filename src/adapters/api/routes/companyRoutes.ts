import { Router } from "express"
import { CompanyController } from "../controllers/companyController"

export const createCompanyRoutes = (companyController: CompanyController): Router => {
  const router = Router()
/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Company management
 */

/**
 * @swagger
 * /v1/companies:
 *   post:
 *     summary: Create a new company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cuit
 *               - denomination
 *             properties:
 *               cuit:
 *                 type: string
 *                 description: Company CUIT
 *                 example: "27111111115"
 *               denomination:
 *                 type: string
 *                 description: Company denomination
 *                 example: "Test SA"
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
 *       409:
 *         description: Company with this CUIT already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 409
 *                 error:
 *                   type: object
 *                   properties:
 *                     reason:
 *                       type: string
 *                       example: "ALREADY_EXISTS"
 *                     msg:
 *                       type: string
 *                       example: "Company with this CUIT alredy exists"
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

  router.post("/", companyController.createCompany)
/**
 * @swagger
 * /v1/companies:
 *   get:
 *     summary: Get paginated companies
 *     description: Accepts dateTo and dateFrom params to filter based on createdAt property
 *     tags: [Companies]
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

  router.get("/", companyController.getPaginatedCompanies)
  return router
}