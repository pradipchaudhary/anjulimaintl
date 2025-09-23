import mongoose, { Document, Schema } from "mongoose";

export interface IInterview extends Document {
    candidate: mongoose.Types.ObjectId;
    company: mongoose.Types.ObjectId;
    position: string;
    interviewDate: Date;
    mode: "online" | "offline";
    interviewer?: string;
    result: "pending" | "selected" | "rejected" | "on-hold";
    notes?: string;
}

const InterviewSchema: Schema = new Schema(
    {
        candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
        company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
        position: { type: String, required: true },
        interviewDate: { type: Date, required: true },
        mode: { type: String, enum: ["online", "offline"], required: true },
        interviewer: { type: String },
        result: {
            type: String,
            enum: ["pending", "selected", "rejected", "on-hold"],
            default: "pending",
        },
        notes: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.Interview ||
    mongoose.model<IInterview>("Interview", InterviewSchema);
