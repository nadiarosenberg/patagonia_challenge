import { MongoDBRepository } from '../mongo/mongoRepository';
import { CompanyDocument } from '../mongo/schemas/companySchema';

export class DbCompanyRepository extends MongoDBRepository<CompanyDocument> {}