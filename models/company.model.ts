import mongoose, { Document, Schema } from "mongoose";

// 1️⃣ TypeScript Interface
export interface ICompany extends Document {
    ltNo?: string;                                   // Labor/License No
    companyName: string;                            // Company Name
    qty: number;                                    // Total quota
    visaStamped: number;                            // Used / stamped visas
    remaining: number;                              // Remaining visas (auto-calculated)
    visaNumber?: string;                            // Optional
    sponsorId?: string;                             // Optional
    status: "pending" | "active" | "finished";      // Status of demand
    document: "curror" | "pending" | "received";    // Document status
    remark?: string;                                // Notes
    createdAt: Date;
    updatedAt: Date;
}

// 2️⃣ Mongoose Schema
const CompanySchema: Schema<ICompany> = new Schema(
    {
        ltNo: { type: String, required: true, trim: true },
        companyName: { type: String, required: true, trim: true },
        qty: { type: Number, required: true },
        visaStamped: { type: Number, required: true, default: 0 },
        remaining: { type: Number, required: true, default: 0 }, // auto-updated
        visaNumber: { type: String, trim: true },
        sponsorId: { type: String, trim: true },

        status: {
            type: String,
            enum: ["pending", "active", "finished"],
            default: "pending",
            required: true,
        },

        document: {
            type: String,
            enum: ["curror", "pending", "received"],
            default: "pending",
            required: true,
        },

        remark: { type: String, trim: true },
    },
    { timestamps: true }
);

// 3️⃣ Auto-calculate `remaining` before save
CompanySchema.pre<ICompany>("save", function (next) {
    this.remaining = this.qty - this.visaStamped;
    next();
});

// 4️⃣ Auto-calculate `remaining` before update (findOneAndUpdate, updateOne, etc.)
CompanySchema.pre("findOneAndUpdate", function (next) {
    const update: any = this.getUpdate();
    if (update.qty !== undefined || update.visaStamped !== undefined) {
        const qty = update.qty ?? this.get("qty");
        const visaStamped = update.visaStamped ?? this.get("visaStamped");
        update.remaining = qty - visaStamped;
        this.setUpdate(update);
    }
    next();
});

// 5️⃣ Export Model
export const Company =
    mongoose.models.Company || mongoose.model<ICompany>("Company", CompanySchema);
