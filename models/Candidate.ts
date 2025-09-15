import mongoose, { Document, Schema } from "mongoose";

// 1️⃣ TypeScript Interface for Candidate
export interface ICandidate extends Document {
    // Personal Info
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: Date;
    gender: "male" | "female" | "other";
    nationality?: string;
    address: string;
    contactNumber: string;
    email?: string;

    // Passport Info
    passportNumber: string;
    passportIssueDate?: Date;
    passportExpiryDate?: Date;
    passportIssuedFrom?: string;

    // Job Info
    positionApplied: string;
    company?: mongoose.Types.ObjectId; // ref => Company
    demandLetterNo?: string;
    contractPeriod?: number;

    // Process Tracking
    status:
    | "registered"
    | "medical"
    | "visaProcessing"
    | "training"
    | "deployed"
    | "finished";

    // Medical
    medicalStatus: "pending" | "passed" | "failed";
    medicalCenter?: string;
    medicalDate?: Date;

    // Visa Info
    visaNumber?: string;
    visaStatus: "pending" | "approved" | "rejected";
    mofaNumber?: string;
    ticketNumber?: string;
    departureDate?: Date;

    // Reference / Agent
    referenceName?: string;
    referenceContact?: string;

    // Misc
    remark?: string;

    // Auto
    createdAt: Date;
    updatedAt: Date;
}

// 2️⃣ Mongoose Schema
const CandidateSchema: Schema<ICandidate> = new Schema(
    {
        // Personal Info
        firstName: { type: String, required: true, trim: true },
        middleName: { type: String, trim: true },
        lastName: { type: String, required: true, trim: true },
        dateOfBirth: { type: Date, required: true },
        gender: { type: String, enum: ["male", "female", "other"], required: true },
        nationality: { type: String, default: "Nepali" },
        address: { type: String, required: true },
        contactNumber: { type: String, required: true },
        email: { type: String, lowercase: true, trim: true },

        // Passport Info
        passportNumber: { type: String, required: true, unique: true, trim: true },
        passportIssueDate: { type: Date },
        passportExpiryDate: { type: Date },
        passportIssuedFrom: { type: String },

        // Job Info
        positionApplied: { type: String, required: true },
        company: { type: Schema.Types.ObjectId, ref: "Company" },
        demandLetterNo: { type: String },
        contractPeriod: { type: Number },

        // Process Tracking
        status: {
            type: String,
            enum: [
                "registered",
                "medical",
                "visaProcessing",
                "training",
                "deployed",
                "finished",
            ],
            default: "registered",
        },

        // Medical
        medicalStatus: {
            type: String,
            enum: ["pending", "passed", "failed"],
            default: "pending",
        },
        medicalCenter: { type: String },
        medicalDate: { type: Date },

        // Visa Info
        visaNumber: { type: String },
        visaStatus: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        mofaNumber: { type: String },
        ticketNumber: { type: String },
        departureDate: { type: Date },

        // Reference
        referenceName: { type: String },
        referenceContact: { type: String },

        // Misc
        remark: { type: String, trim: true, maxlength: 500 },
    },
    {
        timestamps: true, // adds createdAt, updatedAt
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// 3️⃣ Export Candidate model
export default mongoose.models.Candidate ||
    mongoose.model<ICandidate>("Candidate", CandidateSchema);
