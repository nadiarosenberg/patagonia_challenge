import { TransferService } from '../../src/core/services/transferService';
import { AppError, ErrorReason } from '../../src/shared/appErrors';
import { mockRepositories } from '../mocks/commonMocks';
import { companyMock } from '../mocks/companyMocks';
import { createTransferMock, transferMock } from '../mocks/transferMocks';

const service = new TransferService(mockRepositories);

describe('transferService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTransfer', () => {
    it('happy path: should create a transfer', async () => {
      mockRepositories.company.findOne = jest.fn().mockResolvedValue(companyMock);
      mockRepositories.transfer.create = jest.fn().mockResolvedValue({...transferMock, companyId: companyMock.id, companyDenomination: companyMock.denomination});
      const result = await service.createTransfer(createTransferMock);
      expect(mockRepositories.company.findOne).toHaveBeenCalledWith({ _id: companyMock.id });
      expect(mockRepositories.transfer.create).toHaveBeenCalledWith({
        ...createTransferMock,
        companyId: companyMock.id,
        companyDenomination: companyMock.denomination
      });
      expect(result).toEqual({...transferMock, companyId: companyMock.id, companyDenomination: companyMock.denomination});
    });
    it('should throw if company is not found', async () => {
      mockRepositories.company.findOne = jest.fn().mockResolvedValue(null);
      await expect(service.createTransfer(createTransferMock)).rejects.toThrow();
      expect(mockRepositories.transfer.create).not.toHaveBeenCalled();
    });
    it('should throw if transfer creation fails', async () => {
      mockRepositories.company.findOne = jest.fn().mockResolvedValue(companyMock);
      mockRepositories.transfer.create = jest.fn().mockRejectedValue(new AppError(ErrorReason.SERVER_ERROR));
      await expect(service.createTransfer(createTransferMock)).rejects.toThrow(AppError);
    });
  });
});
