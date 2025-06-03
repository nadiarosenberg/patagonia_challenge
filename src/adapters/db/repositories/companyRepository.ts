import { MongoRepository } from '../mongo/mongoRepository';
import { CompanyDocument, companySchema } from '../mongo/schemas/companySchema';

export class CompanyRepository extends MongoRepository<CompanyDocument> {
  constructor() {
    super("company", companySchema);
  }
}