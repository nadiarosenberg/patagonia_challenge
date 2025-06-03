import { Document, FilterQuery, model, Model, Schema } from "mongoose";
import { AppError } from "../../../shared/appErrors";

export interface IMongoRepository<T extends Document<any, any, any>> {
  create(payload: Partial<T>): Promise<T>;
  findOne(criteria: FilterQuery<T>): Promise<T>;
  searchOne(query: object): Promise<T | null>;
}

export class MongoDBRepository<T extends Document<any, any, any>>
  implements IMongoRepository<T>
{
  public readonly model: Model<T>;

  constructor(
    private modelName: string,
    schema: Schema<T>,
  ) {
    this.model = model<T>(modelName, schema);
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      return this.model.create(data);
    } catch (error) {
      throw new AppError(
        "NOT_CREATED",
        `${this.modelName} document not created, error: ${error}`,
      );
    }
  }

  async findOne(query: object): Promise<T> {
    try {
      const result = await this.model.findOne(query).exec();
      if (!result) {
        throw new AppError("NOT_FOUND", `${this.modelName} not found`);
      }
      return result;
    } catch (error) {
      throw new AppError(
        "NOT_FOUND",
        `${this.modelName} document not found, error: ${error}`,
      );
    }
  }

  async searchOne(query: object): Promise<T | null> {
    try {
      const result = await this.model.findOne(query).exec();
      return result;
    } catch (error) {
      throw new AppError(
        "NOT_FOUND",
        `${this.modelName} document not found, error: ${error}`,
      );
    }
  }
}