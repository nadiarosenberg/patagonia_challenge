import { Document, model, Schema } from "mongoose";
import { Transfer } from "../../../../core/domain/entities/transfers";

export interface TransferDocument extends Transfer, Document {
  id: string;
  companyId: any
}

export const transferSchema = new Schema<TransferDocument>(
  {
    amount: {
      type: Number,
      required: true,
    },
    companyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Company",
      index: true,
    },
    companyDenomination: {
      type: String,
      required: true,
    },
    debitAccount: {
      type: String,
      required: true,
    },
    creditAccount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, 
    versionKey: false, 
    toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id.toString()
      delete ret._id
      return ret
    },
  }},
);

export const TransferModel = model<TransferDocument>("transfer", transferSchema);
