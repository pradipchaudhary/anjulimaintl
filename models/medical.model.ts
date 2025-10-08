import mongoose, { Document, Schema } from "mongoose";

export interface IMedical extends Document {
    name: string;
    email: string;
    address: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}

const MedicalSchema: Schema = new Schema<IMedical>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
    },
    { timestamps: true }
);

export const Medical = mongoose.models.Medical ||
    mongoose.model<IMedical>("Medical", MedicalSchema);
