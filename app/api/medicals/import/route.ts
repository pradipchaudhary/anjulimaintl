import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
// import Medical from "@/models/medical.model";
import { connectDB } from "@/lib/db";
import { Medical } from "@/models/medical.model";

interface ExcelRow {
    name: string;
    email?: string;
    address?: string;
    phone?: string;
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        // Get formData
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            console.error("⚠️ No file found in FormData:", [...formData.entries()]);
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        console.log("✅ Received file:", file.name, file.size, file.type);

        // Convert File → Buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Parse Excel workbook
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert Excel → JSON
        const rowsRaw = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });

        // Map data to schema with proper type
        const medicalData: ExcelRow[] = rowsRaw.map((row) => ({
            name: String(row["name"] ?? row["Name"] ?? ""),
            email: String(row["email"] ?? row["Email"] ?? ""),
            address: String(row["address"] ?? row["Address"] ?? ""),
            phone: String(row["phone"] ?? row["Phone"] ?? ""),
        }));

        // Insert into DB
        if (medicalData.length > 0) {
            await Medical.insertMany(medicalData);
        }

        return NextResponse.json({
            success: true,
            count: medicalData.length,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
