import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Medical } from "@/models/medical.model";

export async function GET() {
  try {
    await connectDB();

    // Count total medical centers
    const total = await Medical.countDocuments();

    return NextResponse.json({ total });
  } catch (error) {
    console.error("Error fetching medical count:", error);
    return NextResponse.json(
      { error: "Failed to fetch medical center count" },
      { status: 500 }
    );
  }
}
