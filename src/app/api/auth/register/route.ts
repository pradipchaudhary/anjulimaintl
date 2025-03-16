
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
    try {
        const { name, email, password, role } = await request.json();
        if (!name || !email || !password || !role) {
            return NextResponse.json(
                { error: "Field are required." },
                { status: 400 }
            )
        }

        await connectToDatabase()
        console.log("after database connection...")
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return NextResponse.json(
                { error: "Email are already registered." },
                { status: 400 }
            )
        }
        await User.create({
            name,
            email,
            password,
            role
        })

        return NextResponse.json(
            { error: "User register successfully." },
            { status: 201 }
        )

    } catch (error) {
        return NextResponse.json(
            { error: "Faild to user register." },
            { status: 500 }
        )
    }
}