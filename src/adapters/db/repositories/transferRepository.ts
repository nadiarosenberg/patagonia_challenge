import { PipelineStage } from "mongoose";
import { Company } from "../../../core/domain/entities/companies";
import { ITransferRepository } from "../../../core/ports/ITransferRepository";
import { Filters } from "../../../shared/commonTypes";
import { PaginatedResult, PaginationOptions } from "../../../shared/pagination";
import { MongoRepository } from "../mongo/mongoRepository";
import { TransferDocument, transferSchema } from "../mongo/schemas/transferSchema";

export class TransferRepository extends MongoRepository<TransferDocument> implements ITransferRepository {
  constructor() {
    super("transfer", transferSchema);
  }

  async getPaginatedCompaniesWithTransferFilter(
    options: PaginationOptions,
    filters?: Filters
  ): Promise<PaginatedResult<Company>> {
    const { sort, page, limit } = options;
    const skip = (page - 1) * limit;
    const pipeline: PipelineStage[] = [
      {
        $match: {
          /*createdAt: {
            $gte: new Date(dateFrom),
            $lte: new Date(dateTo),
          },*/
        },
      },
      {
        $group: {
          _id: "$companyId",
        },
      },
      {
        $project: {
          companyId: "$_id",
          _id: 0,
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "companyId",
          foreignField: "_id", 
          as: "company",
        },
      },
      {
        $unwind: "$company",
      },
      {
        $sort: { "company.createdAt": -1 }
      },
      {
        $facet: {
          results: [
            { $skip: skip },
            { $limit: limit },
          ],
          totalResults: [{ $count: "total" }],
        },
      },
    ];
    const res = await this.model.aggregate(pipeline)
    const results = res.length > 0? res[0] : [{results: [], totalResults: []}]
    const total = results.totalResults.length > 0 ? results.totalResults[0].total : 0;
    const totalPages = total > 0 ? Math.ceil(total / limit) : 0;
    return {
      page,
      limit,
      totalPages,
      total: results.totalResults[0].total,
      results: results.results.map(function(r: any) {
        const { _id, ...restData } = r.company
        return {
          ...restData,
          id: _id.toString(), 
        };
      })
    };
  }
}
