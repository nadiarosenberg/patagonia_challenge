import { MongoDBRepository } from "../mongo/mongoRepository";
import { TransferDocument } from "../mongo/schemas/transferSchema";

export class TransferRepository extends MongoDBRepository<TransferDocument> {}