import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import Medical from "@/models/medical.model";
import { connectDB } from "@/lib/db";

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
        const file = formData.get("file") as File;


        if (!file) {
            console.error("⚠️ No file found in FormData:", [...formData.entries()]);
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        console.log("✅ Received file:", file.name, file.size, file.type);

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Convert File → Buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Parse Excel workbook
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert Excel → JSON
        const rows: ExcelRow[] = XLSX.utils.sheet_to_json<ExcelRow>(sheet, { defval: "" });
        // const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        // Map data to schema
        const medicalData = rows.map((row) => ({
            name: (row["name"] ?? row["name"] ?? "") as string,
            email: (row["email"] ?? row["email"] ?? "") as string,
            address: (row["address"] ?? row["address"] ?? "") as string,
            phone: (row["phone"] ?? row["phone"] ?? "") as string,
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
        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}

