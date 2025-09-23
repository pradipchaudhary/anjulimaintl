import mongoose, { Document, Schema } from "mongoose";

export interface IFlight extends Document {
    flightNumber: string;
    airline: string;
    departureDate: Date;
    arrivalDate?: Date;
    departureAirport: string;
    arrivalAirport: string;
    status: "scheduled" | "completed" | "cancelled";
    candidates: mongoose.Types.ObjectId[];
    notes?: string;
}

const FlightSchema: Schema = new Schema(
    {
        flightNumber: { type: String, required: true },
        airline: { type: String, required: true },
        departureDate: { type: Date, required: true },
        arrivalDate: { type: Date },
        departureAirport: { type: String, required: true },
        arrivalAirport: { type: String, required: true },
        status: {
            type: String,
            enum: ["scheduled", "completed", "cancelled"],
            default: "scheduled",
        },
        candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }],
        notes: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model<IFlight>("Flight", FlightSchema);
