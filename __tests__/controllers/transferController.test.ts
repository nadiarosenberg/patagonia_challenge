import { Request, Response, NextFunction } from 'express';
import { TransferService } from '../../src/core/services/transferService';
import { TransferController } from '../../src/adapters/api/controllers/transferController';
import { createTransferSchema } from '../../src/adapters/api/validators/transferValidators';
import { createTransferMock, transferMock } from '../mocks/transferMocks';
import { AppError, ErrorReason } from '../../src/shared/appErrors';

describe('transferController', () => {
  let transferServiceMock: Partial<TransferService>;
  let controller: TransferController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    transferServiceMock = {
      createTransfer: jest.fn(),
    };
    controller = new TransferController(transferServiceMock as TransferService);
    req = {
      body: createTransferMock
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });
  describe('createTransfer', () => {
    it('should create a transfer and return 201 with the transfer data', async () => {
      (transferServiceMock.createTransfer as jest.Mock).mockResolvedValue(transferMock);
      await controller.createTransfer(req as Request, res as Response, next as NextFunction);
      expect(transferServiceMock.createTransfer).toHaveBeenCalledWith(
        createTransferSchema.parse(req.body)
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(transferMock);
      expect(next).not.toHaveBeenCalled();
    });
    it('should call next with error when validation fails (invalid amount)', async () => {
      req.body = { ...createTransferMock, amount: -5};
      await controller.createTransfer(req as Request, res as Response, next as NextFunction);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
    it('should call next with error when validation fails (debitAccount = creditAccount)', async () => {
      req.body = { ...createTransferMock, debitAccount: "123", creditAccount: "123"};
      await controller.createTransfer(req as Request, res as Response, next as NextFunction);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
    it('should call next with error when service throws', async () => {
      const error = new AppError(ErrorReason.SERVER_ERROR);
      (transferServiceMock.createTransfer as jest.Mock).mockRejectedValue(error);
      await controller.createTransfer(req as Request, res as Response, next as NextFunction);
      expect(transferServiceMock.createTransfer).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  })
});