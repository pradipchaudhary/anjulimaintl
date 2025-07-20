import bcrypt from "bcryptjs";
import mongoose, { Schema, Document, Model } from "mongoose";

// Define user roles as a TypeScript enum
export enum UserRole {
    Manager = "Manager",
    Operation = "Operation",
    Agent = "Agent",
    HR = "HR",
}

// Define User Interface
export interface IUser {
    _id?: mongoose.Types.ObjectId
    name: string
    email: string
    password: string
    role: UserRole
    createdAt?: Date
    updatedAt?: Date
}

// Define User Schema
const UserSchema: Schema<IUser> = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: Object.values(UserRole), // Restrict to defined roles
            default: UserRole.Agent, // Default role is "Agent"
        },
    },
    { timestamps: true }
);

// Pre-save hook for password hashing
UserSchema.pre<IUser>("save", async function (next) {
    const user = this as IUser; // Explicitly cast `this` as `IUser`
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

// Export User Model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
