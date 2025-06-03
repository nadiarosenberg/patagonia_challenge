import type { Request, Response, NextFunction } from "express"
import { createTransferSchema } from '../validators/transferValidators';
import { TransferService } from "../../../core/services/transferService";

export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  createTransfer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedData = createTransferSchema.parse(req.body)
      const transfer = await this.transferService.createTransfer(validatedData)
      res.status(201).json(transfer);
    } catch (error) {
      next(error)
    }
  }
}