import { MongoDBRepository } from '../mongo/mongoRepository';
import { CompanyDocument } from '../mongo/schemas/companySchema';

export class CompanyRepository extends MongoDBRepository<CompanyDocument> {}