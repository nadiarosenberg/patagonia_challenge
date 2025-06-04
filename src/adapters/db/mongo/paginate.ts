import { Document, Model } from "mongoose";
import { PaginatedResult, PaginationOptions } from "../../../shared/pagination";

export async function paginate<T extends Document>(
  model: Model<T>,
  params: PaginationOptions,
  match: object = {}
): Promise<PaginatedResult<T>> {
  const { sort, page, limit } = params;
  const skip = (page - 1) * limit;
  const aggregationPipeline = [
    { $match: match },
    { $sort: sort || {"createdAt": -1} },
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
  const [aggregatedData] = await model.aggregate<{
    results: Array<T>;
    totalResults: Array<{ total: number }>;
  }>(aggregationPipeline).exec();

  const { results, totalResults } = aggregatedData || {
    results: [],
    totalResults: [],
  };
  const total = totalResults.length > 0 ? totalResults[0].total : 0;
  const totalPages = total > 0 ? Math.ceil(total / limit) : 0;

  return {
    page,
    totalPages,
    total,
    limit,
    results: results.map(function(r: any) {
      const { _id, ...restData } = r
      return {
        ...restData,
        id: _id.toString(), 
      };
    })
  };
}
