import mongoose, { Document, Schema } from "mongoose";

// 1️⃣ TypeScript Interface
export interface IVisa extends Document {
    ltNo: string;
    companyName: string;
    qty: number;
    visaStamped: number;
    remaining: number;
    visaNumber?: string;
    sponsorId?: string;
    fileExpireDate?: Date;
    excelFilePath?: string;

    isActive: boolean;

    createdAt: Date;
    updatedAt: Date;
}

// 2️⃣ Mongoose Schema
const VisaSchema: Schema = new Schema<IVisa>(
    {
        ltNo: { type: String, required: true, trim: true, index: true },
        companyName: { type: String, required: true, trim: true },
        qty: { type: Number, required: true, min: 1 },
        visaStamped: { type: Number, default: 0, min: 0 },
        remaining: {
            type: Number,
            default: function (this: IVisa) {
                return this.qty - this.visaStamped;
            },
        },
        visaNumber: { type: String, trim: true },
        sponsorId: { type: String, trim: true },
        fileExpireDate: { type: Date },
        excelFilePath: { type: String }, // uploaded Excel path or URL

        isActive: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

// 3️⃣ Export Model
export default mongoose.models.Visa || mongoose.model<IVisa>("Visa", VisaSchema);
