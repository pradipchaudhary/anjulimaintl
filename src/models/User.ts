import bcrypt from "bcryptjs"
import mongoose, { Schema, model, models, Document, Model } from "mongoose"

// Define user roles as a TypeScript enum
export enum UserRole {
    Manager = "Manager",
    Operation = "Operation",
    Agent = "Agent",
    HR = "HR",
}

// Extend Mongoose's Document to include Mongoose methods like isModified()
export interface IUser extends Document {
    name: string
    email: string
    password: string
    role: UserRole
    createdAt?: Date
    updatedAt?: Date
}

// Define the schema
const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.Agent,
        },
    },
    { timestamps: true }
)

// Hash password before saving
UserSchema.pre("save", async function (next) {
    const user = this as IUser

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10)
    }

    next()
})

// Export model
const User: Model<IUser> = models.User || model<IUser>("User", UserSchema)
export default User
