import { Document } from "mongoose";

export interface ICompany extends Document {
    _id: string;
    ltNo: string;
    companyName: string;
    qty: number;
    visaStamped: number;
    remaining: number;
    visaNumber?: string;
    sponsorId?: string;
    status: "pending" | "active" | "finished";
    remark?: string;
    createdAt: string;
    updatedAt: string;
}