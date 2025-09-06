import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Medical from "@/models/Medical";

export async function GET() {
    try {
        await connectDB();
        const records = await Medical.find().sort({ sn: 1 });
        return NextResponse.json(records);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// export async function POST(req: NextRequest) {
//     try {
//         await connectDB();
//         console.log("database connection.....")
//         const body = await req.json();
//         console.log("object", body);

//         if (!body.name || !body.email || !body.address || !body.phone) {
//             return NextResponse.json({ error: "All fields are required" }, { status: 400 });
//         }

//         const newRecord = await Medical.create(body);
//         return NextResponse.json({ message: "Medical record created", record: newRecord }, { status: 201 });
//     } catch (error: unknown) {
//         const message = error instanceof Error ? error.message : "Something went wrong";
//         return NextResponse.json({ error: message }, { status: 500 });
//     }
// }

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { name, email, address, phone } = body;

        if (!name || !email || !address || !phone) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const newMedical = await Medical.create({ name, email, address, phone });

        return NextResponse.json(
            { message: "Medical record created", record: newMedical },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating medical:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}