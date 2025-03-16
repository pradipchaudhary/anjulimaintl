import mongoose, { Schema, Document } from "mongoose";

// Define JobApplicant interface
interface IJobApplicant extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  passportNumber: string;
  dateOfBirth: Date;
  gender: "Male" | "Female" | "Other";
  citizenshipNo: string;
  passportType: "Ordinary" | "Diplomatic" | "Official";
  dateOfIssue: Date;
  dateOfExpiry: Date;
  placeOfBirth: string;
  nationality: string;
  holderSignature?: string;
  contactNo: string;
  email: string;
  educationLevel: string;
  skills: string[];
  preferredCountry: string;
  preferredIndustry: string;
  workExperienceYears: number;
  passportScanLink?: string;
  resumeLink?: string;
  appliedDate?: Date;
}

const JobApplicantSchema = new Schema<IJobApplicant>(
  {
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, trim: true },
    lastName: { type: String, required: true, trim: true },
    passportNumber: { type: String, unique: true, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    citizenshipNo: { type: String, unique: true, required: true },
    passportType: { type: String, enum: ["Ordinary", "Diplomatic", "Official"], required: true },
    dateOfIssue: { type: Date, required: true },
    dateOfExpiry: { type: Date, required: true },
    placeOfBirth: { type: String, required: true },
    nationality: { type: String, required: true },
    holderSignature: { type: String }, // Save holder Signature png image 
    contactNo: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    educationLevel: { type: String, required: true },
    skills: { type: [String], required: true },
    preferredCountry: { type: String, required: true },
    preferredIndustry: { type: String, required: true },
    workExperienceYears: { type: Number, required: true },
    passportScanLink: { type: String }, // save passport scan image like .png, .pdf .jpg format
    resumeLink: { type: String }, // Save resume linke like .doc, .pdf .png links
    appliedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.JobApplicant || mongoose.model<IJobApplicant>("JobApplicant", JobApplicantSchema);
