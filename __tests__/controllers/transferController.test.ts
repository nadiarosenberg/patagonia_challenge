import { Request, Response, NextFunction } from 'express';
import { TransferService } from '../../src/core/services/transferService';
import { TransferController } from '../../src/adapters/api/controllers/transferController';
import { createTransferSchema } from '../../src/adapters/api/validators/transferValidators';
import { createTransferMock } from '../mocks/transferMocks';

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
      const fakeTransfer = { id: 'transferId1', ...createTransferMock };
      (transferServiceMock.createTransfer as jest.Mock).mockResolvedValue(fakeTransfer);
      await controller.createTransfer(req as Request, res as Response, next as NextFunction);
      expect(transferServiceMock.createTransfer).toHaveBeenCalledWith(
        createTransferSchema.parse(req.body)
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(fakeTransfer);
      expect(next).not.toHaveBeenCalled();
    });
    it('should call next with error when validation fails', async () => {
      req.body = { ...createTransferMock, amount: -5};
      await controller.createTransfer(req as Request, res as Response, next as NextFunction);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
    it('should call next with error when validation fails', async () => {
      req.body = { ...createTransferMock, debitAccount: "123", creditAccount: "123"};
      await controller.createTransfer(req as Request, res as Response, next as NextFunction);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
    it('should call next with error when service throws', async () => {
      const error = new Error('Service error');
      (transferServiceMock.createTransfer as jest.Mock).mockRejectedValue(error);
      await controller.createTransfer(req as Request, res as Response, next as NextFunction);
      expect(transferServiceMock.createTransfer).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  })
});