// backend/models/customer.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  loyaltyPoints: number;
  purchaseHistory: Array<{
    transaction: mongoose.Types.ObjectId;
    date: Date;
    amount: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema: Schema = new Schema<ICustomer>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
    phone: { type: String, unique: true, trim: true },
    address: { type: String, trim: true },
    loyaltyPoints: { type: Number, default: 0 },
    purchaseHistory: [
      {
        transaction: { type: Schema.Types.ObjectId, ref: 'Transaction' },
        date: { type: Date, default: Date.now },
        amount: { type: Number, required: true, min: 0 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
