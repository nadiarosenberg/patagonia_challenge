import { Repositories } from '../../src/adapters/db/repositories';
import { Transfer } from '../../src/core/domain/entities/transfers';
import { TransferService } from '../../src/core/services/transferService';
import { createTransferMock } from '../mocks/transferMocks';

const mockRepositories = {
  company: {
    findOne: jest.fn(),
  },
  transfer: {
    create: jest.fn(),
  },
} as unknown as Repositories;

const service = new TransferService(mockRepositories);

describe('transferService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTransfer', () => {
    it('should create a transfer with company denomination', async () => {
      const company = { id: createTransferMock.companyId, denomination: 'test' };
      const expectedTransfer = {
        id: 'transfer-id-001',
        ...createTransferMock,
        companyDenomination: 'test',
      } as Transfer;
      mockRepositories.company.findOne = jest.fn().mockResolvedValue(company);
      mockRepositories.transfer.create = jest.fn().mockResolvedValue(expectedTransfer);
      const result = await service.createTransfer(createTransferMock);
      expect(mockRepositories.company.findOne).toHaveBeenCalledWith({ id: createTransferMock.companyId });
      expect(mockRepositories.transfer.create).toHaveBeenCalledWith({
        ...createTransferMock,
        companyDenomination: 'test',
      });
      expect(result).toEqual(expectedTransfer);
    });
    it('should throw if company is not found', async () => {
      mockRepositories.company.findOne = jest.fn().mockResolvedValue(null);
      await expect(service.createTransfer(createTransferMock)).rejects.toThrow();
      expect(mockRepositories.transfer.create).not.toHaveBeenCalled();
    });
    it('should throw if transfer creation fails', async () => {
      const company = { id: 'company-id-123', denomination: 'Acme Inc.' };
      mockRepositories.company.findOne = jest.fn().mockResolvedValue(company);
      mockRepositories.transfer.create = jest.fn().mockRejectedValue(new Error('DB error'));
      await expect(service.createTransfer(createTransferMock)).rejects.toThrow('DB error');
    });
  });
});
