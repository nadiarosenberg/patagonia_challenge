import { Document, model, Model, Schema } from "mongoose";
import { AppError } from "../../../shared/appErrors";
import { IRepository } from '../../../core/ports/IRepository';
import { PaginatedResult, PaginationOptions } from "../../../shared/pagination";
import { paginate } from "./paginate";

export class MongoRepository<T extends Document> implements IRepository<T> {
  protected readonly model: Model<T>;
  private readonly modelName: string

  constructor(
    modelName: string,
    schema: Schema<T>
  ) {
    this.model = model<T>(modelName, schema);
    this.modelName = modelName
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

  async paginatedSearch(
    params: PaginationOptions,
    match: object
  ): Promise<PaginatedResult<T>> {
    try {
      return paginate<T>(
        this.model,
        params,
        match
      );
    } catch (error: any) {
      throw new AppError(
        "SERVER_ERROR",
        `Find ${this.modelName} error: ${error}`,
      );
    }
  }
}