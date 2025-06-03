import { Document, model, Schema } from "mongoose";
import { Company } from "../../../../core/domain/entities/companies";

export interface CompanyDocument extends Document, Company {
  id: string
}

export const companySchema = new Schema<CompanyDocument>(
  {
    cuit: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    denomination: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  }
);

export const CompanyModel = model<CompanyDocument>("company", companySchema);