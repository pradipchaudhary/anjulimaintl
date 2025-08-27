import mongoose, { Document, Schema } from "mongoose";

// TypeScript Interface
export interface ICandidate extends Document {
    serialNumber: number;
    name: string;
    passportNo: string;
    dateOfBirth: Date;
    age: number;
    address: string;
    position: string;
    reference: string;
    profile: string;
    medicalDate: Date;
    mofaNo: string;
    medicalStatus: string;
    medicalReport: string;
    policeReport: string;
    biometric: string;
    contactNo: string;
    remarks?: string;
    chhanotEndDate?: Date;
    departureDate?: Date;
}

// Mongoose Schema
const CandidateSchema: Schema = new Schema<ICandidate>(
    {
        serialNumber: { type: Number, required: true },
        name: { type: String, required: true, trim: true },
        passportNo: { type: String, required: true, unique: true },
        dateOfBirth: { type: Date, required: true },
        age: { type: Number, required: true },
        address: { type: String, required: true },
        position: { type: String, required: true },
        reference: { type: String, required: true },
        profile: { type: String, required: true },
        medicalDate: { type: Date, required: true },
        mofaNo: { type: String, required: true },
        medicalStatus: { type: String, required: true },
        medicalReport: { type: String, required: true },
        policeReport: { type: String, required: true },
        biometric: { type: String, required: true },
        contactNo: { type: String, required: true },
        remarks: { type: String },
        chhanotEndDate: { type: Date },
        departureDate: { type: Date },
    },
    {
        timestamps: true, // automatically add createdAt & updatedAt
    }
);

// Export Model
export default mongoose.models.Candidate || mongoose.model<ICandidate>("Candidate", CandidateSchema);
