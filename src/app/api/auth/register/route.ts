<<<<<<< HEAD

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";

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
=======
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
>>>>>>> 1c48f7d7bdeab813f2fe6fd664d70c479fdeb460
