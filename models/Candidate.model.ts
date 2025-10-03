import mongoose, { Document, Schema } from "mongoose";

export interface ICandidate extends Document {
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: Date;
    gender: "male" | "female" | "other";
    nationality?: string;
    address: string;
    contactNumber: string;
    email?: string;

    // Passport details
    passportNumber: string;
    passportIssueDate: Date;
    passportExpiryDate: Date;

    // Job info
    position: string;
    company: mongoose.Types.ObjectId;
    status: "pending" | "selected" | "deployed" | "rejected";
}

const CandidateSchema: Schema = new Schema(
    {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
        gender: { type: String, enum: ["male", "female", "other"], required: true },
        nationality: { type: String },
        address: { type: String, required: true },
        contactNumber: { type: String, required: true },
        email: { type: String },

        passportNumber: { type: String, required: true },
        passportIssueDate: { type: Date, required: true },
        passportExpiryDate: { type: Date, required: true },

        position: { type: String, required: true },
        company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
        status: {
            type: String,
            enum: ["pending", "selected", "deployed", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Candidate ||
    mongoose.model<ICandidate>("Candidate", CandidateSchema);
