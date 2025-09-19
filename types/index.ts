// types.ts

export interface ICompany {
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
