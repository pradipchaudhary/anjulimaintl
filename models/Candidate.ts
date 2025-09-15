import { Schema, model, models } from "mongoose";

const CandidateSchema = new Schema(
    {
        // 🔹 Personal Information
        firstName: { type: String, required: true, trim: true },
        middleName: { type: String, trim: true },
        lastName: { type: String, required: true, trim: true },
        dateOfBirth: { type: Date, required: true },
        gender: { type: String, enum: ["male", "female", "other"], required: true },
        nationality: { type: String, default: "Nepali" },
        address: { type: String, required: true },
        contactNumber: { type: String, required: true },
        email: { type: String, lowercase: true, trim: true },

        // 🔹 Passport Information
        passportNumber: { type: String, required: true, unique: true },
        passportIssueDate: { type: Date },
        passportExpiryDate: { type: Date },
        passportIssuedFrom: { type: String },

        // 🔹 Job Information
        positionApplied: { type: String, required: true },
        company: { type: Schema.Types.ObjectId, ref: "Company" }, // link to employer
        demandLetterNo: { type: String },
        contractPeriod: { type: Number }, // in years

        // 🔹 Process Status Tracking
        status: {
            type: String,
            enum: ["registered", "medical", "visaProcessing", "training", "deployed", "finished"],
            default: "registered",
        },

        // 🔹 Medical Status
        medicalStatus: {
            type: String,
            enum: ["pending", "passed", "failed"],
            default: "pending",
        },
        medicalCenter: { type: String },
        medicalDate: { type: Date },

        // 🔹 Visa / Approval Information
        visaNumber: { type: String },
        visaStatus: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
        mofaNumber: { type: String }, // Ministry of Foreign Affairs No
        ticketNumber: { type: String },
        departureDate: { type: Date },

        // 🔹 Reference / Agent
        referenceName: { type: String },
        referenceContact: { type: String },

        // 🔹 Misc
        remark: { type: String },
    },
    { timestamps: true }
);

export default models.Candidate || model("Candidate", CandidateSchema);
