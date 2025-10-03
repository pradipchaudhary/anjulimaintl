

// Typescript Interface for Interview model
import mongoose, { Document, Schema } from "mongoose";

export interface IInterview extends Document {
    candidate: mongoose.Types.ObjectId;
    interviewer: mongoose.Types.ObjectId;
    scheduledDate: Date;
    status: "scheduled" | "completed" | "cancelled";
    feedback?: string;
    notes?: string;
}

const InterviewSchema: Schema = new Schema(
    {
        candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
        interviewer: { type: mongoose.Schema.Types.ObjectId, ref: "Interviewer", required: true },
        scheduledDate: { type: Date, required: true },
        status: {
            type: String,
            enum: ["scheduled", "completed", "cancelled"],
            default: "scheduled",
        },
        feedback: { type: String },
        notes: { type: String },
    },
    { timestamps: true }
);