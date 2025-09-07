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
    status: "pending" | "active" | "finished";
    remark?: string;
    createdAt: Date;
    updatedAt: Date;
}

// 2️⃣ Mongoose Schema
const VisaSchema: Schema<IVisa> = new Schema(
    {
        ltNo: { type: String, required: true, trim: true, index: true },
        companyName: { type: String, required: true, trim: true },
        qty: { type: Number, required: true, min: 1 },
        visaStamped: { type: Number, default: 0, min: 0 },
        remaining: { type: Number, default: 0 }, // still auto-calculated in middleware if you want
        visaNumber: { type: String, trim: true },
        sponsorId: { type: String, trim: true },
        fileExpireDate: { type: Date },
        status: {
            type: String,
            enum: ["pending", "active", "finished"],
            default: "pending", // initial value, but no auto calculation
            // index: true,
        },
        remark: { type: String, trim: true, maxlength: 500 },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// 3️⃣ Optional middleware to auto-calculate remaining only
VisaSchema.pre<IVisa>("save", function (next) {
    // Ensure visaStamped does not exceed qty
    if (this.visaStamped > this.qty) this.visaStamped = this.qty;

    // Auto-calculate remaining
    this.remaining = this.qty - this.visaStamped;

    // ❌ Do NOT auto-set status here
    next();
});

// 4️⃣ Optional index for faster queries
// VisaSchema.index({ companyName: 1, status: 1 });

// 5️⃣ Export model
export default mongoose.models.Visa || mongoose.model<IVisa>("Visa", VisaSchema);
