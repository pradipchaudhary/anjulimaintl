import { NextResponse } from "next/server";

export async function GET() {
    try {

        return NextResponse.json({
            success: true,
            message: "This is a test API route",
            data: {
                test: "This is a test response"
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch data" }, { status: 500 });

    }
}