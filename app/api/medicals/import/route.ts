import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import Medical from "@/models/medical.model";
import { connectDB } from "@/lib/db";

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
        const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        // Map data to schema
        const medicalData = rows.map((row, index) => ({
            name: row["Name"] || row["name"] || "",
            email: row["Email"] || row["email"] || "",
            address: row["Address"] || row["address"] || "",
            phone: row["Phone"] || row["phone"] || "",
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

