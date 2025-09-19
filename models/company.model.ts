import mongoose, { Document, Schema } from "mongoose";

// 1️⃣ TypeScript Interface
export interface ICompany extends Document {
    ltNo?: string;                                   // Labor/License No
    companyName: string;                             // Company Name
    qty: number;                                     // Total quota
    visaStamped: number;                             // Used / stamped visas
    remaining: number;                               // Remaining visas (auto-calculated)
    visaNumber?: string;                             // Optional
    sponsorId?: string;                              // Optional
    status: "pending" | "active" | "finished";      // Status of demand
    remark?: string;                                 // Notes
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

        remark: { type: String, trim: true },
    },
    { timestamps: true }
);

// 3️⃣ Auto-calculate `remaining` and update status before save
CompanySchema.pre<ICompany>("save", function (next) {
    this.remaining = this.qty - this.visaStamped;

    // Auto-set status to 'finished' if all visas are stamped
    if (this.visaStamped >= this.qty) {
        this.status = "finished";
    }

    next();
});

// 4️⃣ Auto-calculate `remaining` and status before update (findOneAndUpdate, updateOne, etc.)
CompanySchema.pre("findOneAndUpdate", function (next) {
    const update: any = this.getUpdate();

    // Get current values
    const currentQty = this.get("qty");
    const currentVisaStamped = this.get("visaStamped");

    const newQty = update.qty !== undefined ? update.qty : currentQty;
    const newVisaStamped = update.visaStamped !== undefined ? update.visaStamped : currentVisaStamped;

    // Calculate remaining
    update.remaining = newQty - newVisaStamped;

    // Auto-set status to 'finished' if all visas are stamped
    if (newVisaStamped >= newQty) {
        update.status = "finished";
    }

    this.setUpdate(update);
    next();
});

// 5️⃣ Export Model
export const Company =
    mongoose.models.Company || mongoose.model<ICompany>("Company", CompanySchema);
