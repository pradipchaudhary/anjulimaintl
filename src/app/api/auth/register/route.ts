import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
    try {
        await connectToDatabase();
        const users = await User.find({});
        return NextResponse.json({ success: true, data: users });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { name, email, password } = await req.json();
        const newUser = new User({ name, email, password });
        await newUser.save();
        return NextResponse.json({ success: true, data: newUser });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 });
    }
}
