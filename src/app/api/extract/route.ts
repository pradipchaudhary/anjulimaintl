import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import Tesseract from "tesseract.js";
import pdfParse from "pdf-parse";
import fs from "fs/promises";
import path from "path";

// Configure Multer for file uploads
const upload = multer({ dest: "/tmp/" });

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as Blob | null;

        if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = `/tmp/${file.name}`;
        await fs.writeFile(filePath, buffer);
        const fileExt = path.extname(filePath).toLowerCase();

        let extractedText = "";
        if (fileExt === ".pdf") {
            // Extract text from PDF
            const data = await pdfParse(buffer);
            extractedText = data.text;
        } else {
            // Extract text from image using OCR
            const { data } = await Tesseract.recognize(filePath, "eng");
            extractedText = data.text;
        }

        // Parse passport fields
        const passportData = parsePassportData(extractedText);
        await fs.unlink(filePath);

        return NextResponse.json({ success: true, data: passportData });
    } catch (error) {
        return NextResponse.json({ error: "Error processing file" }, { status: 500 });
    }
}

// Function to extract passport fields
const parsePassportData = (text: string) => {
    return {
        passportNumber: text.match(/Passport Number\s*([A-Z0-9]+)/i)?.[1] || "",
        surname: text.match(/Surname\s*([\w\s]+)/i)?.[1] || "",
        givenNames: text.match(/Given Names\s*([\w\s]+)/i)?.[1] || "",
        nationality: text.match(/Nationality\s*([\w\s]+)/i)?.[1] || "",
        dateOfBirth: text.match(/Date of Birth\s*(\d{2}[-/]\d{2}[-/]\d{4})/i)?.[1] || "",
        gender: text.match(/Gender\s*([MF])/i)?.[1] || "",
        dateOfIssue: text.match(/Date of Issue\s*(\d{2}[-/]\d{2}[-/]\d{4})/i)?.[1] || "",
        dateOfExpiry: text.match(/Date of Expiry\s*(\d{2}[-/]\d{2}[-/]\d{4})/i)?.[1] || "",
        citizenshipId: text.match(/National Identity Number\s*([\d\w]+)/i)?.[1] || "",
        placeOfBirth: text.match(/Place of Birth\s*([\w\s]+)/i)?.[1] || "",
        issuingAuthority: text.match(/Issuing Authority\s*([\w\s]+)/i)?.[1] || "",
    };
};
