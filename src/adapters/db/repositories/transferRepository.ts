import { MongoRepository } from "../mongo/mongoRepository";
import { TransferDocument, transferSchema } from "../mongo/schemas/transferSchema";

export class TransferRepository extends MongoRepository<TransferDocument> {
    constructor() {
      super("transfer", transferSchema);
    }
}